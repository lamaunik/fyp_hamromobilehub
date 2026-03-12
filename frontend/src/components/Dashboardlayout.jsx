// src/components/DashboardLayout.jsx
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
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