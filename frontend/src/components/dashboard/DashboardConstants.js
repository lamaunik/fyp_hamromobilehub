// ─── Palette ────────────────────────────────────────────────────────────────
export const P = {
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

// ─── Global CSS keyframes ─────────────────────────────────────────────────────
export const CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(40, 43, 74, .5)}50%{box-shadow:0 0 0 8px rgba(40, 43, 74, 0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .page{animation:scaleIn .28s cubic-bezier(.4,0,.2,1) both}
  .fadeUp{animation:fadeUp .4s cubic-bezier(.4,0,.2,1) both}
  .slideLeft{animation:slideLeft .4s cubic-bezier(.4,0,.2,1) both}
  .slideRight{animation:slideRight .4s cubic-bezier(.4,0,.2,1) both}
  .float{animation:float 4s ease-in-out infinite}
  .pulse{animation:pulse 2s infinite}
  .spin{animation:spin 1s linear infinite}
  .btn{transition:all .18s cubic-bezier(.4,0,.2,1)!important;cursor:pointer!important}
  .btn:hover{transform:translateY(-2px)!important;box-shadow:0 8px 24px rgba(40, 43, 74, .25)!important}
  .btn:active{transform:translateY(0)!important}
  .card{transition:all .2s cubic-bezier(.4,0,.2,1)!important}
  .card:hover{transform:translateY(-4px)!important;box-shadow:0 12px 32px rgba(40, 43, 74, .15)!important;border-color:#D4D2C3!important}
  .nav-item{transition:all .15s!important}
  .nav-item:hover{background:#EEEBDA!important;color:#282B4A!important;transform:translateX(3px)!important}
  .icon-btn{transition:all .17s!important}
  .icon-btn:hover{background:#E5E3D5!important;border-color:#D4D2C3!important;transform:scale(1.07)!important}
  .icon-btn:active{transform:scale(.93)!important}
  input:focus,textarea:focus,select:focus{outline:none!important}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:#EEEBDA}
  ::-webkit-scrollbar-thumb{background:#D4D2C3;border-radius:99px}
  ::-webkit-scrollbar-thumb:hover{background:#282B4A}
`;



export const BADGE_COLORS = {
  Hot:  {bg:"rgba(220,38,38,.1)",  border:"rgba(220,38,38,.25)",  text:"#ef4444"},
  Sale: {bg:"rgba(234,88,12,.1)",  border:"rgba(234,88,12,.25)",  text:"#f97316"},
  New:  {bg:"rgba(34,197,94,.1)",  border:"rgba(34,197,94,.25)",  text:"#22c55e"},
  Deal: {bg:"rgba(40, 43, 74, .1)",  border:"rgba(40, 43, 74, .25)",  text:"#282B4A"},
};

export const STATUS_COLORS = {
  Delivered: {bg:"rgba(34,197,94,.1)",  text:"#16a34a",  border:"rgba(34,197,94,.3)"},
  Shipped:   {bg:"rgba(40, 43, 74, .1)",  text:"#282B4A",  border:"rgba(40, 43, 74, .3)"},
  Processing:{bg:"rgba(245,158,11,.1)", text:"#d97706",  border:"rgba(245,158,11,.3)"},
  Cancelled: {bg:"rgba(239,68,68,.1)",  text:"#ef4444",  border:"rgba(239,68,68,.3)"},
};

export const pct = (p, o) => Math.round((1 - p / o) * 100);