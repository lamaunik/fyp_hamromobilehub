import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { CSS, P } from "../components/dashboard/DashboardConstants";
import DashboardSidebar       from "../components/dashboard/DashboardSidebar";
import DashboardTopbar        from "../components/dashboard/DashboardTopbar";
import DashboardHome          from "../components/dashboard/DashboardHome";
import DashboardProducts      from "../components/dashboard/DashboardProducts";
import DashboardProductDetail from "../components/dashboard/DashboardProductDetail";
import DashboardCart          from "../components/dashboard/DashboardCart";
import DashboardOrders        from "../components/dashboard/DashboardOrders";
import DashboardWishlist      from "../components/dashboard/DashboardWishlist";
import DashboardProfile       from "../components/dashboard/DashboardProfile";
import MarketplacePage        from "../components/dashboard/MarketplacePage";
import SellProductPage        from "../components/dashboard/SellProductPage";
import { socket }             from "../utils/socket";

// Read/write localStorage safely
const readLS  = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const writeLS = (key, value)    => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab,             setTab]            = useState("home");
  const [sidebarOpen,     setSidebarOpen]    = useState(true);
  const [selectedProduct, setSelectedProduct]= useState(null);
  const [products,        setProducts]       = useState([]);
  const [loadingProducts, setLoadingProducts]= useState(false);

  // ── Orders — persist count in sync ───────────────────────────────────────
  const [orders, setOrders] = useState([]);

  // ── Wishlist & Cart persisted in localStorage ─────────────────────────────
  const [wishlist, setWishlist] = useState(() => readLS("hmh_wishlist", []));
  const [cart,     setCart]     = useState(() => readLS("hmh_cart",     []));

  const [pageKey, setPageKey] = useState(0);
  const [notifs,  setNotifs]  = useState([
    { title: "Welcome to HamroMobileHub!", time: "Just now" },
    { title: "Flash Sale: 20% off Samsung devices", time: "2 hours ago" },
  ]);
  const [unreadChat, setUnreadChat] = useState(false);

  // Global Socket connection for chat notifications
  useEffect(() => {
    if (user) {
      socket.io.opts.query = { userId: user._id || user.id };
      socket.connect();
      
      const handleRecv = (msg) => {
        if (!window.location.pathname.includes("/messages") && msg.sender !== user._id && msg.sender !== user.id) {
          setUnreadChat(true);
          setNotifs(prev => [{ title: "New Chat Message", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }, ...prev]);
        }
      };
      
      socket.on("receive_message", handleRecv);
      return () => {
        socket.off("receive_message", handleRecv);
        socket.disconnect();
      };
    }
  }, [user]);

  // Persist wishlist & cart to localStorage on every change
  useEffect(() => { writeLS("hmh_wishlist", wishlist); }, [wishlist]);
  useEffect(() => { writeLS("hmh_cart",     cart);     }, [cart]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await api.get("/products");
      if (res.success && res.data) setProducts(res.data);
    } catch (err) { console.error(err); }
    finally { setLoadingProducts(false); }
  }, []);

  // Fetch orders from backend — used on mount and when switching to orders tab
  const fetchOrders = useCallback(async () => {
    try {
      const res = await api.get("/orders/myorders");
      if (res.success && res.data) setOrders(res.data);
    } catch (err) { console.error(err); }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Re-fetch when switching to relevant tabs
  useEffect(() => {
    if (tab === "products" || tab === "home") fetchProducts();
    if (tab === "orders") fetchOrders();
  }, [tab]);

  // Sync Wishlist from DB on mount
  useEffect(() => {
    const syncFromDB = async () => {
      try {
        if (!user) return;
        const res = await api.get("/users/profile");
        if (res.success && res.data?.wishlist) {
          // Merge or overwrite local with DB
          setWishlist(res.data.wishlist);
        }
      } catch (err) {
        console.error("Failed to sync wishlist from DB", err);
      }
    };
    syncFromDB();
  }, [user]);

  const switchTab   = (t) => { 
    if (!user && ["orders", "profile", "cart", "wishlist", "sell"].includes(t)) {
      alert("Please sign in or create an account to access this feature.");
      navigate("/signup");
      return;
    }
    setTab(t); setSelectedProduct(null); setPageKey(k => k + 1); 
  };
  const viewProduct = (p) => { setSelectedProduct(p); setTab("detail"); setPageKey(k => k + 1); };

  // Cart helpers
  const addToCart = (p) => {
    if (!user) {
      alert("Please sign up first to add items to your cart.");
      navigate("/signup");
      return;
    }
    setCart(prev => {
      const pId = p._id || p.id;
      const ex  = prev.find(x => (x._id || x.id) === pId);
      if (ex) return prev.map(x => (x._id || x.id) === pId ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
  };
  const removeFromCart = (id)       => setCart(prev => prev.filter(p => (p._id || p.id) !== id));
  const updateQty      = (id, qty)  => { if (qty < 1) return removeFromCart(id); setCart(prev => prev.map(p => (p._id || p.id) === id ? { ...p, qty } : p)); };
  const clearCart      = ()         => { setCart([]); writeLS("hmh_cart", []); };

  // Order helpers — these keep sidebar count in sync immediately
  const addOrder    = (newOrder) => setOrders(prev => [newOrder, ...prev]);
  const removeOrder = (orderId)  => setOrders(prev => prev.filter(o => o._id !== orderId));
  const updateOrder = (orderId, patch) => setOrders(prev => prev.map(o => o._id === orderId ? { ...o, ...patch } : o));

  const toggleWish = async (id) => {
    if (!user) {
      alert("Please sign up first to add items to your wishlist.");
      navigate("/signup");
      return;
    }
    const newList = wishlist.includes(id) 
      ? wishlist.filter(x => x !== id) 
      : [...wishlist, id];
    
    setWishlist(newList);
    
    // Sync to DB immediately
    try {
      await api.put("/users/wishlist", { wishlist: newList });
    } catch (err) {
      console.error("Failed to sync wishlist to DB", err);
    }
  };
  const addNotif   = (n)  => setNotifs(prev => [n, ...prev]);

  const cartCount  = cart.reduce((s, p) => s + p.qty, 0);
  // Only count non-cancelled, non-failed orders in sidebar badge
  const orderCount = orders.filter(o => o.paymentStatus !== "Cancelled" && o.paymentStatus !== "Failed").length;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: P.mistBg, display: "flex", fontFamily: P.font }}>
        <DashboardSidebar
          tab={tab} setTab={switchTab} open={sidebarOpen}
          cartCount={cartCount}
          wishCount={wishlist.length}
          orderCount={orderCount}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <DashboardTopbar open={sidebarOpen} setOpen={setSidebarOpen} setTab={switchTab} notifs={notifs} setNotifs={setNotifs} products={products} viewProduct={viewProduct} unreadChat={unreadChat} />
          <main style={{ flex: 1, overflowY: "auto" }}>
            <div key={pageKey} className="page">
              {tab === "home"        && <DashboardHome        setTab={switchTab} viewProduct={viewProduct} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} products={products} />}
              {tab === "products"    && <DashboardProducts    viewProduct={viewProduct} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} products={products} loading={loadingProducts} onRefresh={fetchProducts} />}
              {tab === "detail"      && selectedProduct && <DashboardProductDetail product={selectedProduct} addToCart={addToCart} viewProduct={viewProduct} setTab={switchTab} wishlist={wishlist} toggleWish={toggleWish} products={products} />}
              {tab === "cart"        && <DashboardCart        cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} setTab={switchTab} addNotif={addNotif} clearCart={clearCart} addOrder={addOrder} wishlist={wishlist} removeFromWishlist={(id) => setWishlist(prev => prev.filter(x => x !== id))} />}
              {tab === "orders"      && <DashboardOrders      setTab={switchTab} viewProduct={viewProduct} orders={orders} onDelete={removeOrder} onCancel={updateOrder} />}
              {tab === "wishlist"    && <DashboardWishlist    wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} viewProduct={viewProduct} setTab={switchTab} products={products} />}
              {tab === "profile"     && <DashboardProfile     addNotif={addNotif} />}
              {tab === "marketplace" && <MarketplacePage      setTab={switchTab} />}
              {tab === "sell"        && <SellProductPage      setTab={switchTab} />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}