// src/components/DashboardLayout.jsx
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

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

export default function DashboardLayout({ children, title }) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: P.mistBg,
      fontFamily: P.font,
    }}>
      <DashboardSidebar />

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <DashboardTopbar title={title} />

        <main style={{
          flex: 1,
          padding: "28px",
          overflowY: "auto",
          background: P.mistBg,
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}