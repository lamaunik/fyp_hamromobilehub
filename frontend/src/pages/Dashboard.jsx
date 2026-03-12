import { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import DashboardHome from "../components/DashboardHome";
import DashboardProducts from "../components/DashboardProducts";
import DashboardProductDetail from "../components/DashboardProductDetail";
import DashboardCart from "../components/DashboardCart";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty } : p));
  };

  const viewProduct = (product) => { setSelectedProduct(product); setActiveTab("detail"); };

  return (
    <div style={{ minHeight:"100vh", background:P.mistBg, display:"flex", fontFamily:P.font }}>
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setSelectedProduct(null); }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        cartCount={cart.reduce((sum, p) => sum + p.qty, 0)}
      />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <DashboardTopbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          cartCount={cart.reduce((sum, p) => sum + p.qty, 0)}
          setActiveTab={setActiveTab}
        />
        <main style={{ flex:1, overflowY:"auto" }}>
          {activeTab === "home"     && <DashboardHome setActiveTab={setActiveTab} viewProduct={viewProduct} addToCart={addToCart} />}
          {activeTab === "products" && <DashboardProducts viewProduct={viewProduct} addToCart={addToCart} />}
          {activeTab === "detail"   && selectedProduct && <DashboardProductDetail product={selectedProduct} addToCart={addToCart} viewProduct={viewProduct} />}
          {activeTab === "cart"     && <DashboardCart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} />}
        </main>
      </div>
    </div>
  );
}