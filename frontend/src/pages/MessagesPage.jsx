import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { socket } from "../utils/socket";

const P = {
  navy:  "#282B4A",
  royal: "#282B4A",
  ocean: "#282B4A",
  sky:   "#D4D2C3",
  mist:  "#E5E3D5",
  white: "#FFFFFF",
  muted: "#7A7C8E",
  mistBg:"#EEEBDA",
  font:  "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
  purple:"#282B4A",
  purpleLight:"#E5E3D5"
};

export default function MessagesPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    fetchConversations();
    
    socket.io.opts.query = { userId: user._id };
    socket.connect();
    
    socket.on("receive_message", (message) => {
      setMessages((prev) => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
      setConversations((prev) => {
        const updated = [...prev];
        const idx = updated.findIndex(c => c._id === message.conversationId);
        if (idx !== -1) {
          updated[idx].lastMessage = message.text;
          updated[idx].updatedAt = new Date().toISOString();
        }
        return updated.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    // If navigated from Contact Seller with a sellerId
    if (location.state?.sellerId && user && conversations.length > 0) {
      startChat(location.state.sellerId);
      // Clear location state to prevent loop on refresh
      window.history.replaceState({}, document.title);
    } else if (location.state?.sellerId && user && conversations.length === 0) {
      // Need to handle case where conversation list is not loaded yet but we have sellerId. 
      // Handled simply below by retrying startChat when conversations changes if activeChat is not set.
    }
  }, [location.state, user]);

  useEffect(() => {
     if (location.state?.sellerId && user && !activeChat && conversations) {
        startChat(location.state.sellerId);
     }
  }, [conversations]);

  useEffect(() => {
    if (activeChat && !activeChat.isNew) {
      fetchMessages(activeChat._id);
      socket.emit("join_chat", activeChat._id);
    }
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/messages");
      if (res.success) {
        setConversations(res.data);
        res.data.forEach(c => socket.emit("join_chat", c._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await api.get(`/messages/${conversationId}`);
      if (res.success) setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startChat = (sellerId) => {
    const existing = conversations.find(c => c.participants.some(p => p._id === sellerId));
    if (existing) {
      setActiveChat(existing);
    } else {
      setActiveChat({ isNew: true, receiverId: sellerId, participants: [{ _id: sellerId, name: "Seller" }] });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const payload = {
        text: newMessage,
        conversationId: activeChat.isNew ? undefined : activeChat._id,
        receiverId: activeChat.isNew ? activeChat.receiverId : undefined,
      };

      const res = await api.post("/messages", payload);
      
      if (res.success) {
        const msg = { ...res.data, receiverId: payload.receiverId };
        // We do not eagerly setMessages here to avoid duplication.
        // We let the socket event do it so the behavior is identical everywhere.
        socket.emit("send_message", msg);
        
        if (activeChat.isNew) {
           fetchConversations();
           setActiveChat({ _id: res.conversationId, participants: activeChat.participants });
        }
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const getOtherParticipant = (chat) => {
    if (!chat || !user) return null;
    return chat.participants.find(p => p._id !== user._id) || chat.participants[0];
  };

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:P.font, background:P.mistBg }}>
      {/* Sidebar */}
      <div style={{ width: 320, background:P.white, borderRight:`1px solid ${P.mist}`, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px", borderBottom:`1px solid ${P.mist}`, display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={() => navigate(-1)} style={{ background:"none", border:"none", cursor:"pointer", color:P.navy }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </button>
          <h2 style={{ margin:0, color:P.navy, fontSize:20, fontWeight:800 }}>Messages</h2>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {conversations.length === 0 ? (
             <div style={{ padding:20, textAlign:"center", color:P.muted, fontSize:14 }}>No conversations yet.</div>
          ) : (
             conversations.map(c => {
               const other = getOtherParticipant(c);
               const isActive = activeChat?._id === c._id;
               return (
                 <div key={c._id} onClick={() => setActiveChat(c)}
                   style={{ padding:"16px 20px", borderBottom:`1px solid ${P.mist}`, cursor:"pointer", background: isActive ? P.mistBg : P.white, transition:"background 0.2s" }}
                   onMouseEnter={e => { if(!isActive) e.currentTarget.style.background = "#fafafa"; }}
                   onMouseLeave={e => { if(!isActive) e.currentTarget.style.background = P.white; }}>
                   <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                     <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg, ${P.royal}, ${P.ocean})`, color:P.white, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:16, boxShadow:"0 2px 8px rgba(40, 43, 74, 0.3)", flexShrink:0, overflow:"hidden" }}>
                       {other?.profilePicture ? (
                         <img src={other.profilePicture.startsWith("http") ? other.profilePicture : `http://localhost:5000${other.profilePicture}`} alt={other.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                       ) : (
                         other?.name?.charAt(0).toUpperCase() || "U"
                       )}
                     </div>
                     <div style={{ flex:1, overflow:"hidden" }}>
                       <div style={{ fontWeight:700, color:P.navy, fontSize:15, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                         {other?.name || "Unknown User"}
                       </div>
                       <div style={{ color:P.muted, fontSize:13, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                         {c.lastMessage || "Started a conversation"}
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#f8fafc" }}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div style={{ padding:"16px 24px", background:P.white, borderBottom:`1px solid ${P.mist}`, display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 10px rgba(40, 43, 74, 0.04)", zIndex:10 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg, ${P.royal}, ${P.ocean})`, color:P.white, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:16, boxShadow:"0 2px 8px rgba(40, 43, 74, 0.3)", overflow:"hidden" }}>
                 {getOtherParticipant(activeChat)?.profilePicture ? (
                   <img src={getOtherParticipant(activeChat).profilePicture.startsWith("http") ? getOtherParticipant(activeChat).profilePicture : `http://localhost:5000${getOtherParticipant(activeChat).profilePicture}`} alt="Avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                 ) : (
                   getOtherParticipant(activeChat)?.name?.charAt(0).toUpperCase() || "U"
                 )}
              </div>
              <h3 style={{ margin:0, color:P.navy, fontSize:17, fontWeight:800 }}>
                 {getOtherParticipant(activeChat)?.name || "Unknown User"}
              </h3>
            </div>

            {/* Messages List */}
            <div style={{ flex:1, padding:"24px", overflowY:"auto", display:"flex", flexDirection:"column", gap:16, background:"#f4f7f9" }}>
              {messages.map((m, i) => {
                const isMine = m.sender === user?._id || m.sender === user?.id;
                return (
                  <div key={m._id || i} style={{ alignSelf: isMine ? "flex-end" : "flex-start", maxWidth:"75%", display:"flex", flexDirection:"column", alignItems: isMine ? "flex-end" : "flex-start" }}>
                    <div style={{ 
                       background: isMine ? `linear-gradient(135deg, ${P.ocean}, ${P.royal})` : P.white, 
                       color: isMine ? P.white : P.navy, 
                       padding:"12px 18px", 
                       borderRadius:"18px", 
                       borderBottomRightRadius: isMine ? 4 : 18, 
                       borderBottomLeftRadius: !isMine ? 4 : 18, 
                       boxShadow: isMine ? "0 4px 14px rgba(40, 43, 74, 0.25)" : "0 2px 10px rgba(40, 43, 74, 0.06)", 
                       fontSize:14, 
                       lineHeight:1.5, 
                       border: isMine ? "none" : `1.5px solid ${P.mist}` 
                    }}>
                      {m.text}
                    </div>
                    <span style={{ fontSize: 10, color: P.muted, marginTop: 4, padding: "0 4px", fontWeight: 600 }}>
                       {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "Just now"}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{ padding:"20px 24px", background:P.white, borderTop:`1px solid ${P.mist}` }}>
              <form onSubmit={handleSendMessage} style={{ display:"flex", gap:12 }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  style={{ flex:1, padding:"14px 18px", borderRadius:999, border:`1.5px solid ${P.mist}`, outline:"none", fontSize:14, background:P.mistBg, color:P.navy, fontFamily:P.font }}
                  onFocus={e => e.target.style.borderColor = "#a78bfa"}
                  onBlur={e => e.target.style.borderColor = P.mist}
                />
                <button type="submit" disabled={!newMessage.trim()}
                  style={{ width:50, height:50, borderRadius:"50%", background:newMessage.trim() ? `linear-gradient(135deg,${P.ocean},${P.royal})` : P.mist, border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:P.white, cursor: newMessage.trim() ? "pointer" : "default", opacity: newMessage.trim() ? 1 : 0.7, transition:"all 0.2s", boxShadow: newMessage.trim() ? "0 4px 12px rgba(40, 43, 74, 0.3)" : "none" }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ transform:"translateX(-1px) translateY(1px)" }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:P.muted }}>
             <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ marginBottom:16, opacity:0.5 }}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
             <h3 style={{ fontSize:20, fontWeight:700, margin:0, color:P.navy }}>Your Messages</h3>
             <p style={{ fontSize:14, marginTop:8 }}>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
