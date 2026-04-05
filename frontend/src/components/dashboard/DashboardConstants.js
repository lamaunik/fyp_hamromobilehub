export const P = {
  navy:  "#18181b",
  royal: "#27272a",
  ocean: "#3f3f46",
  sky:   "#e4e4e7",
  mist:  "#f4f4f5",
  white: "#ffffff",
  muted: "#71717a",
  mistBg:"#fafafa",
  font:  "var(--font-body)",
  fontHeading: "var(--font-heading)",
  primary: "#18181b",
  accent: "#f43f5e"
};

// ─── Global CSS keyframes ─────────────────────────────────────────────────────
export const CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(24, 24, 27, .2)}50%{box-shadow:0 0 0 6px rgba(24, 24, 27, 0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .page{animation:fadeIn .3s ease both}
  .fadeUp{animation:fadeUp .4s ease both}
  .slideLeft{animation:slideLeft .3s ease both}
  .slideRight{animation:slideRight .3s ease both}
  .pulse{animation:pulse 2s infinite}
  .spin{animation:spin 1s linear infinite}
  .btn{transition:all .2s ease!important;cursor:pointer!important;border-radius:10px!important;}
  .btn:hover{transform:translateY(-2px)!important; box-shadow: 0 4px 12px rgba(0,0,0,0.05)!important;}
  .btn:active{transform:scale(0.98)!important;}
  .card{transition:all .2s ease!important; border-radius: 12px!important; box-shadow: 0 2px 8px rgba(0,0,0,0.02)!important; border: 1px solid #e4e4e7!important;}
  .card:hover{border-color: #d4d4d8!important; box-shadow: 0 4px 16px rgba(0,0,0,0.04)!important;}
  .nav-item{transition:all .2s ease!important; border-radius: 10px!important;}
  .nav-item:hover{background:#f4f4f5!important;color:#18181b!important;}
  .icon-btn{transition:background .2s ease, color .2s ease!important; border-radius: 10px!important; border: 1px solid #e4e4e7!important;}
  .icon-btn:hover{background:#f4f4f5!important;color:#18181b!important;}
  input:focus,textarea:focus,select:focus{outline:none!important;}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:var(--color-bg)}
  ::-webkit-scrollbar-thumb{background:#d4d4d8; border-radius:10px;}
  ::-webkit-scrollbar-thumb:hover{background:#a1a1aa}
`;

export const BADGE_COLORS = {
  Hot:  {bg:"#fff1f2",  border:"#fecdd3",  text:"#e11d48"},
  Sale: {bg:"#fafafa",  border:"#e4e4e7",  text:"#18181b"},
  New:  {bg:"#f0fdf4",  border:"#bbf7d0",  text:"#16a34a"},
  Deal: {bg:"#f4f4f5",  border:"#e4e4e7",  text:"#3f3f46"},
};

export const STATUS_COLORS = {
  Delivered: {bg:"#f0fdf4",  text:"#16a34a",  border:"#bbf7d0"},
  Shipped:   {bg:"#f4f4f5",  text:"#18181b",  border:"#e4e4e7"},
  Paid:      {bg:"#eff6ff",  text:"#2563eb",  border:"#bfdbfe"},
  Pending:   {bg:"#fffbeb",  text:"#d97706",  border:"#fde68a"},
  Processing:{bg:"#fffbeb",  text:"#d97706",  border:"#fde68a"},
  Cancelled: {bg:"#fff1f2",  text:"#ef4444",  border:"#fecdd3"},
  Failed:    {bg:"#fef2f2",  text:"#dc2626",  border:"#fecaca"},
};

export const pct = (p, o) => Math.round((1 - p / o) * 100);