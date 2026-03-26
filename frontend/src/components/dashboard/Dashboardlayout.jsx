// src/components/DashboardLayout.jsx
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import { P } from "./DashboardConstants";

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