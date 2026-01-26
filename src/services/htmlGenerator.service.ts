/**
 * Serviço para gerar HTML completo do relatório - Premium Design Lovable
 * Este serviço envolve o conteúdo gerado pela IA com o CSS Premium
 */

// Premium CSS - Candy Design System matching Lovable
const PREMIUM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --lilas: 260 70% 72%;
  --lilas-dark: 260 65% 55%;
  --rosa: 340 80% 70%;
  --rosa-dark: 340 75% 55%;
  --pessego: 15 90% 78%;
  --mint: 158 70% 65%;
  --dourado: 42 85% 60%;
  --manteiga: 45 90% 80%;
  --azulbebe: 200 85% 75%;
  --coral: 15 85% 68%;
  --roxo: 280 65% 55%;
  --background: 30 25% 98%;
  --background-gradient: linear-gradient(180deg, hsl(30 25% 98%) 0%, hsl(260 30% 97%) 30%, hsl(15 35% 97%) 60%, hsl(260 25% 98%) 100%);
  --foreground: 260 15% 20%;
  --card: 0 0% 100%;
  --card-hover: 260 30% 99%;
  --muted: 260 10% 50%;
  --muted-light: 260 20% 75%;
  --border: 260 20% 90%;
  --border-light: 260 30% 94%;
  --radius: 1.5rem;
  --radius-sm: 1rem;
  --radius-lg: 2rem;
  --shadow-soft: 0 4px 24px hsla(260, 60%, 60%, 0.12);
  --shadow-medium: 0 8px 32px hsla(260, 60%, 55%, 0.18);
  --shadow-glow: 0 0 50px hsla(260, 70%, 65%, 0.25);
  --shadow-candy: 0 10px 40px hsla(340, 70%, 65%, 0.2), 0 4px 16px hsla(260, 70%, 65%, 0.15);
  --gradient-candy: linear-gradient(135deg, hsl(var(--lilas)), hsl(var(--rosa)), hsl(var(--pessego)));
  --gradient-warm: linear-gradient(135deg, hsl(var(--pessego)), hsl(var(--dourado)));
  --gradient-cool: linear-gradient(135deg, hsl(var(--azulbebe)), hsl(var(--mint)));
  --gradient-royal: linear-gradient(135deg, hsl(var(--lilas)), hsl(var(--roxo)));
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 17px;
  line-height: 1.8;
  color: hsl(var(--foreground));
  background: var(--background-gradient);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
@keyframes twinkle { 0%, 100% { opacity: 0.4; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes pulse-glow { 0%, 100% { opacity: 1; box-shadow: 0 0 20px currentColor; } 50% { opacity: 0.7; box-shadow: 0 0 40px currentColor; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes cardFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(2deg); } }

h1, h2, h3, h4, h5 { font-family: 'Space Grotesk', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.03em; line-height: 1.2; }
h1 { font-size: clamp(2.25rem, 6vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 4.5vw, 2.5rem); margin: 0 0 1.5rem; background: var(--gradient-candy); background-size: 200% 200%; animation: gradientShift 6s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; }
h3 { font-size: clamp(1.25rem, 3vw, 1.6rem); margin: 2rem 0 1rem; color: hsl(var(--foreground)); }
h4 { font-size: 1.15rem; margin: 1.5rem 0 0.75rem; font-weight: 600; }
p { margin-bottom: 1.25rem; }
a { color: hsl(var(--lilas-dark)); text-decoration: none; transition: color 0.2s; }
a:hover { color: hsl(var(--rosa-dark)); }
ul, ol { padding-left: 1.75rem; margin-bottom: 1.25rem; }
li { margin: 0.6rem 0; }
strong { color: hsl(var(--lilas-dark)); font-weight: 600; }
em { color: hsl(var(--rosa-dark)); }

.jm-report { max-width: 960px; margin: 0 auto; padding: 1rem; padding-top: 0; }
@media (min-width: 640px) { .jm-report { padding: 2rem; padding-top: 0; } }
@media (min-width: 1024px) { .jm-report { padding: 3rem; padding-top: 0; } }

.jm-cover { position: relative; min-height: 95vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 4rem 2rem; margin: 0 -1rem 3rem; background: linear-gradient(180deg, hsl(260 45% 15%) 0%, hsl(280 40% 22%) 20%, hsl(260 55% 38%) 40%, hsl(340 65% 55%) 60%, hsl(15 85% 68%) 80%, hsl(45 95% 75%) 100%); border-radius: 0 0 var(--radius-lg) var(--radius-lg); overflow: hidden; box-shadow: 0 20px 60px hsla(260, 60%, 30%, 0.4); }
.jm-cover::before { content: ''; position: absolute; top: 10%; left: -20%; width: 70%; height: 70%; background: radial-gradient(circle, hsla(260, 80%, 75%, 0.4) 0%, transparent 60%); filter: blur(80px); animation: float 12s ease-in-out infinite; }
.jm-cover::after { content: ''; position: absolute; bottom: 0%; right: -25%; width: 80%; height: 80%; background: radial-gradient(circle, hsla(45, 95%, 75%, 0.35) 0%, transparent 55%); filter: blur(100px); animation: float 15s ease-in-out infinite reverse; }
.jm-cover .star { position: absolute; font-size: 1.25rem; animation: twinkle 4s ease-in-out infinite; pointer-events: none; z-index: 1; }
.jm-cover .star:nth-child(1) { top: 6%; left: 8%; animation-delay: 0s; font-size: 1.75rem; }
.jm-cover .star:nth-child(2) { top: 10%; right: 10%; animation-delay: 0.8s; font-size: 1.4rem; }
.jm-cover .star:nth-child(3) { top: 18%; left: 22%; animation-delay: 1.5s; font-size: 1rem; }
.jm-cover .star:nth-child(4) { top: 5%; left: 42%; animation-delay: 2s; font-size: 1.5rem; }
.jm-cover .star:nth-child(5) { top: 22%; right: 6%; animation-delay: 2.5s; font-size: 1.1rem; }
.jm-cover .star:nth-child(6) { top: 3%; right: 28%; animation-delay: 0.5s; font-size: 1.3rem; }
.jm-cover .star:nth-child(7) { top: 15%; left: 4%; animation-delay: 1.8s; font-size: 0.9rem; }
.jm-cover .star:nth-child(8) { top: 28%; left: 35%; animation-delay: 1.2s; font-size: 1.1rem; }
.jm-cover .star:nth-child(9) { top: 8%; left: 60%; animation-delay: 3s; font-size: 0.8rem; }
.jm-cover .star:nth-child(10) { top: 25%; right: 18%; animation-delay: 0.3s; font-size: 1rem; }
.jm-cover h1 { position: relative; z-index: 2; color: white; font-size: clamp(3rem, 10vw, 6rem); margin-bottom: 0.75rem; text-shadow: 0 6px 50px hsla(260, 70%, 25%, 0.7); animation: fadeInUp 1.2s ease-out; }
.jm-cover .subtitle { position: relative; z-index: 2; font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: hsla(0, 0%, 100%, 0.95); margin-bottom: 2.5rem; font-weight: 400; max-width: 500px; animation: fadeInUp 1.2s ease-out 0.2s both; }
.jm-cover .badge { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 1rem; background: hsla(0, 0%, 100%, 0.2); backdrop-filter: blur(16px); border: 1px solid hsla(0, 0%, 100%, 0.4); border-radius: 999px; padding: 1.25rem 2.5rem; font-weight: 600; font-size: 1.15rem; color: white; box-shadow: 0 8px 32px hsla(260, 70%, 30%, 0.3); animation: fadeInScale 1s ease-out 0.5s both; }
.jm-cover .tagline { position: relative; z-index: 2; margin-top: 3rem; font-style: italic; color: hsla(45, 100%, 95%, 1); font-size: 1.35rem; max-width: 600px; text-shadow: 0 2px 20px hsla(0, 0%, 0%, 0.3); animation: fadeInUp 1.2s ease-out 0.8s both; }

.jm-divider { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin: 4rem 0; color: hsl(var(--lilas)); }
.jm-divider::before, .jm-divider::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, transparent, hsl(var(--border)), hsla(260, 70%, 70%, 0.3), hsl(var(--border)), transparent); }
.jm-divider span { font-size: 2rem; animation: bounce 3s ease-in-out infinite; }

.jm-toc { background: linear-gradient(160deg, hsl(var(--card)), hsl(260 35% 99%), hsl(45 50% 99%)); border: 2px solid hsl(var(--border)); border-radius: var(--radius-lg); padding: 3rem; margin-bottom: 3.5rem; box-shadow: var(--shadow-medium); animation: fadeInScale 0.8s ease-out forwards; position: relative; overflow: hidden; }
.jm-toc::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--gradient-candy); }
.jm-toc h2 { margin-top: 0; margin-bottom: 2rem; }
.jm-toc ol { columns: 2; column-gap: 3.5rem; padding-left: 1.5rem; }
@media (max-width: 650px) { .jm-toc ol { columns: 1; } }
.jm-toc li { break-inside: avoid; margin: 0.75rem 0; }
.jm-toc a { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; color: hsl(var(--foreground)); border-radius: var(--radius-sm); border: 1px solid transparent; transition: all 0.3s ease; }
.jm-toc a:hover { color: hsl(var(--lilas-dark)); background: linear-gradient(135deg, hsla(260, 70%, 70%, 0.1), hsla(340, 70%, 70%, 0.05)); border-color: hsla(260, 70%, 70%, 0.2); transform: translateX(10px); }

.jm-section { background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 2.5rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-soft); position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; animation: fadeInUp 0.7s ease-out forwards; }
.jm-section:hover { transform: translateY(-4px); box-shadow: var(--shadow-medium); }
.jm-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--gradient-candy); background-size: 200% 200%; animation: gradientShift 8s ease infinite; }
.jm-section::after { content: '✦'; position: absolute; top: 1.5rem; right: 1.5rem; font-size: 1.75rem; opacity: 0.1; animation: twinkle 5s ease-in-out infinite; }
.jm-section h2:first-child { margin-top: 0; padding-bottom: 1.25rem; border-bottom: 2px solid hsla(260, 70%, 70%, 0.15); }

.jm-section.accent-lilas::before { background: linear-gradient(90deg, hsl(260 70% 70%), hsl(280 65% 75%), hsl(260 70% 70%)); }
.jm-section.accent-lilas { border-left: 6px solid hsl(var(--lilas)); }
.jm-section.accent-lilas::after { content: '🔮'; }
.jm-section.accent-mint::before { background: linear-gradient(90deg, hsl(200 85% 75%), hsl(158 70% 65%), hsl(200 85% 75%)); }
.jm-section.accent-mint { border-left: 6px solid hsl(var(--mint)); }
.jm-section.accent-mint::after { content: '🌿'; }
.jm-section.accent-gold::before { background: linear-gradient(90deg, hsl(42 85% 60%), hsl(45 90% 75%), hsl(42 85% 60%)); }
.jm-section.accent-gold { border-left: 6px solid hsl(var(--dourado)); }
.jm-section.accent-gold::after { content: '✨'; }
.jm-section.accent-rose::before { background: linear-gradient(90deg, hsl(340 80% 70%), hsl(15 90% 78%), hsl(340 80% 70%)); }
.jm-section.accent-rose { border-left: 6px solid hsl(var(--rosa)); }
.jm-section.accent-rose::after { content: '💖'; }
.jm-section.accent-blue::before { background: linear-gradient(90deg, hsl(200 85% 75%), hsl(220 75% 70%), hsl(200 85% 75%)); }
.jm-section.accent-blue { border-left: 6px solid hsl(var(--azulbebe)); }
.jm-section.accent-blue::after { content: '🌊'; }
.jm-section.accent-coral::before { background: linear-gradient(90deg, hsl(15 85% 68%), hsl(35 85% 70%), hsl(15 85% 68%)); }
.jm-section.accent-coral { border-left: 6px solid hsl(var(--coral)); }
.jm-section.accent-coral::after { content: '🔥'; }

.jm-tarot-card { background: linear-gradient(160deg, hsl(var(--card)), hsl(260 35% 98%)); border: 2px solid hsla(260, 70%, 70%, 0.25); border-radius: var(--radius); padding: 1.75rem; text-align: center; transition: all 0.4s ease; position: relative; overflow: hidden; }
.jm-tarot-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--gradient-candy); }
.jm-tarot-card:hover { transform: translateY(-8px) rotate(1deg); box-shadow: var(--shadow-candy); border-color: hsl(var(--lilas)); }
.jm-tarot-card img { width: 140px; max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 8px 24px hsla(260, 50%, 30%, 0.25); transition: transform 0.4s ease; animation: cardFloat 6s ease-in-out infinite; }
.jm-tarot-card:hover img { transform: scale(1.08) rotate(-2deg); }
.jm-tarot-card h4 { margin: 0.75rem 0; font-size: 1.15rem; color: hsl(var(--foreground)); }
.jm-tarot-card .numero { font-size: 0.85rem; color: hsl(var(--muted)); margin-bottom: 0.5rem; font-weight: 500; }
.jm-tarot-card .energia { display: inline-block; padding: 0.45rem 1rem; background: var(--gradient-candy); color: white; border-radius: 999px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 12px hsla(260, 70%, 50%, 0.3); }
.jm-tarot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.75rem; margin: 2.5rem 0; }
@media (max-width: 500px) { .jm-tarot-grid { grid-template-columns: 1fr; } }

.jm-month-card { background: linear-gradient(160deg, hsl(var(--card)), hsl(260 30% 99%), hsl(var(--card))); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 2rem; margin-bottom: 2rem; position: relative; transition: all 0.35s ease; animation: fadeInScale 0.6s ease-out forwards; }
.jm-month-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: var(--shadow-candy); border-color: hsl(var(--lilas)); }
.jm-month-card.is-portal { border: 3px solid hsl(var(--lilas)); box-shadow: 0 0 50px hsla(260, 70%, 65%, 0.25), var(--shadow-soft); background: linear-gradient(160deg, hsla(260, 70%, 70%, 0.08), hsl(var(--card)), hsla(340, 70%, 70%, 0.05)); }
.jm-month-card.is-portal::before { content: '🌟 MÊS PORTAL'; position: absolute; top: -1rem; left: 1.5rem; background: var(--gradient-candy); color: white; font-size: 0.75rem; font-weight: 700; padding: 0.5rem 1.25rem; border-radius: 999px; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: 0 6px 20px hsla(260, 70%, 50%, 0.35); animation: bounce 2s ease-in-out infinite; }
.jm-month-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap; }
.jm-month-header h3 { margin: 0; font-size: 1.6rem; }
.jm-month-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, hsla(260, 70%, 70%, 0.15), hsla(340, 70%, 70%, 0.1)); border: 1px solid hsla(260, 70%, 70%, 0.3); border-radius: 999px; padding: 0.5rem 1.25rem; font-size: 0.9rem; font-weight: 600; color: hsl(var(--lilas-dark)); }

.jm-callout { background: linear-gradient(135deg, hsla(260, 70%, 70%, 0.1), hsla(280, 60%, 70%, 0.06)); border-left: 5px solid hsl(var(--lilas)); border-radius: 0 var(--radius) var(--radius) 0; padding: 1.75rem 2rem; margin: 2rem 0; position: relative; animation: slideInLeft 0.5s ease-out forwards; }
.jm-callout::before { content: '💡'; position: absolute; top: -0.75rem; left: 1rem; font-size: 1.5rem; background: hsl(var(--card)); padding: 0.25rem 0.5rem; border-radius: 8px; }
.jm-callout.mint { background: linear-gradient(135deg, hsla(158, 70%, 65%, 0.12), hsla(158, 70%, 65%, 0.05)); border-left-color: hsl(var(--mint)); }
.jm-callout.mint::before { content: '🌿'; }
.jm-callout.gold { background: linear-gradient(135deg, hsla(42, 85%, 60%, 0.12), hsla(42, 85%, 60%, 0.05)); border-left-color: hsl(var(--dourado)); }
.jm-callout.gold::before { content: '✨'; }
.jm-callout.rose { background: linear-gradient(135deg, hsla(340, 80%, 70%, 0.12), hsla(340, 80%, 70%, 0.05)); border-left-color: hsl(var(--rosa)); }
.jm-callout.rose::before { content: '💖'; }

.jm-checklist { list-style: none; padding: 0; }
.jm-checklist li { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem 1rem; margin: 0.5rem 0; border-radius: var(--radius-sm); border: 1px solid transparent; transition: all 0.25s ease; background: transparent; }
.jm-checklist li:hover { background: linear-gradient(135deg, hsla(260, 70%, 70%, 0.06), hsla(158, 70%, 65%, 0.04)); border-color: hsla(260, 70%, 70%, 0.2); transform: translateX(8px); }
.jm-checklist li::before { content: '☐'; flex-shrink: 0; font-size: 1.4rem; color: hsl(var(--lilas)); transition: transform 0.2s; }
.jm-checklist li:hover::before { transform: scale(1.2); }

.jm-script-box { background: linear-gradient(145deg, hsl(260 25% 18%), hsl(280 28% 22%), hsl(260 22% 20%)); color: hsl(45 95% 92%); border-radius: var(--radius); padding: 2.5rem; margin: 1.75rem 0; font-style: italic; line-height: 2; font-size: 1.15rem; position: relative; overflow: hidden; box-shadow: 0 8px 32px hsla(260, 50%, 15%, 0.4); }
.jm-script-box::before { content: '"'; position: absolute; top: 0.5rem; left: 1.5rem; font-size: 5rem; color: hsla(260, 70%, 75%, 0.15); font-family: Georgia, serif; line-height: 1; }
.jm-script-box::after { content: ''; position: absolute; bottom: -50%; right: -25%; width: 50%; height: 100%; background: radial-gradient(circle, hsla(45, 90%, 70%, 0.1) 0%, transparent 60%); filter: blur(40px); }

.jm-matrix { display: flex; flex-direction: column; align-items: center; gap: 3rem; padding: 3rem; background: linear-gradient(160deg, hsl(260 35% 98%), hsl(var(--card)), hsl(340 30% 99%)); border-radius: var(--radius-lg); border: 1px solid hsl(var(--border)); }
.jm-matrix-diamond { position: relative; width: 340px; height: 340px; }
.jm-matrix-node { position: absolute; width: 60px; height: 60px; border-radius: 50%; background: var(--gradient-candy); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.3rem; box-shadow: 0 8px 24px hsla(260, 70%, 50%, 0.35); transition: all 0.35s ease; cursor: default; }
.jm-matrix-node:hover { transform: scale(1.2); box-shadow: 0 12px 36px hsla(260, 70%, 50%, 0.5); z-index: 10; }
.jm-matrix-node.center { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90px; height: 90px; font-size: 2rem; background: linear-gradient(135deg, hsl(var(--dourado)), hsl(var(--rosa)), hsl(var(--lilas))); background-size: 200% 200%; animation: gradientShift 4s ease infinite; z-index: 5; }
.jm-matrix-node.center:hover { transform: translate(-50%, -50%) scale(1.15); }
.jm-matrix-node.top { top: 0; left: 50%; transform: translateX(-50%); }
.jm-matrix-node.bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
.jm-matrix-node.left { top: 50%; left: 0; transform: translateY(-50%); }
.jm-matrix-node.right { top: 50%; right: 0; transform: translateY(-50%); }
.jm-matrix-node.top-right { top: 12%; right: 12%; }
.jm-matrix-node.top-left { top: 12%; left: 12%; }
.jm-matrix-node.bottom-right { bottom: 12%; right: 12%; }
.jm-matrix-node.bottom-left { bottom: 12%; left: 12%; }

.jm-special-lines { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.5rem; margin: 2.5rem 0; }
.jm-special-line { text-align: center; padding: 2rem 1.5rem; border-radius: var(--radius); background: linear-gradient(160deg, hsl(var(--card)), hsl(260 35% 99%)); border: 1px solid hsl(var(--border)); transition: all 0.35s ease; }
.jm-special-line:hover { transform: scale(1.05); box-shadow: var(--shadow-soft); border-color: hsl(var(--lilas)); }
.jm-special-line .numero { font-size: 3.5rem; font-weight: 700; background: var(--gradient-candy); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
.jm-special-line .titulo { font-size: 0.8rem; color: hsl(var(--muted)); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 0.75rem; }
.jm-special-line .arcano { font-weight: 600; margin-top: 0.5rem; font-size: 0.95rem; }

.jm-chakra-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin: 2.5rem 0; }
.jm-chakra-card { padding: 1.75rem; border-radius: var(--radius); border: 1px solid hsl(var(--border)); background: hsl(var(--card)); transition: all 0.35s ease; position: relative; overflow: hidden; }
.jm-chakra-card::before { content: ''; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--chakra-color, hsl(var(--lilas))); }
.jm-chakra-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-medium); }
.jm-chakra-indicator { width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 0.85rem; box-shadow: 0 0 12px currentColor; animation: pulse-glow 3s ease-in-out infinite; }
.jm-chakra-card h4 { margin: 0.5rem 0; display: flex; align-items: center; font-size: 1.1rem; }
.jm-chakra-valores { display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap; }
.jm-chakra-valor { padding: 0.5rem 1rem; background: linear-gradient(135deg, hsla(260, 70%, 70%, 0.1), hsla(260, 70%, 70%, 0.05)); border-radius: 999px; font-size: 0.85rem; font-weight: 500; }

.jm-vedic-card { background: linear-gradient(160deg, hsl(45 50% 98%), hsl(var(--card)), hsl(42 60% 98%)); border: 2px solid hsla(42, 85%, 60%, 0.35); border-radius: var(--radius-lg); padding: 2.5rem; margin: 2rem 0; text-align: center; position: relative; overflow: hidden; }
.jm-vedic-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--gradient-warm); }
.jm-vedic-simbolo { font-size: 4rem; margin-bottom: 1rem; }
.jm-vedic-nome { font-size: 1.75rem; font-weight: 700; background: var(--gradient-warm); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.jm-vedic-regente { color: hsl(var(--muted)); margin: 0.75rem 0 1.5rem; font-size: 1.1rem; }

.jm-revolucao { background: linear-gradient(160deg, hsl(200 50% 98%), hsl(var(--card)), hsl(200 45% 98%)); border: 2px solid hsla(200, 85%, 75%, 0.35); padding: 2.75rem; border-radius: var(--radius-lg); margin: 2.5rem 0; position: relative; overflow: hidden; }
.jm-revolucao::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--gradient-cool); }
.jm-revolucao h3 { color: hsl(200 55% 45%); margin-top: 0; }
.jm-casa-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1.25rem; margin: 2rem 0; }
.jm-casa-item { text-align: center; padding: 1.5rem 1rem; background: hsl(var(--card)); border-radius: var(--radius-sm); border: 1px solid hsl(var(--border)); transition: all 0.3s ease; }
.jm-casa-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-soft); border-color: hsl(var(--azulbebe)); }
.jm-casa-numero { font-size: 2rem; font-weight: 700; color: hsl(200 60% 50%); }
.jm-casa-nome { font-size: 0.85rem; color: hsl(var(--muted)); margin-top: 0.5rem; }

.jm-area-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem; margin: 2.5rem 0; }
.jm-area-card { background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 2.25rem; transition: all 0.35s ease; position: relative; overflow: hidden; text-align: center; }
.jm-area-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: var(--gradient-candy); }
.jm-area-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-candy); }
.jm-area-card h4 { margin: 1rem 0 0.75rem; font-size: 1.2rem; }
.jm-area-icon { font-size: 3rem; margin-bottom: 0.5rem; animation: bounce 3s ease-in-out infinite; }

.jm-ritual { background: linear-gradient(160deg, hsl(260 40% 98%), hsl(var(--card)), hsl(280 35% 99%)); border: 1px solid hsla(260, 70%, 70%, 0.25); border-radius: var(--radius); padding: 2.25rem; margin: 2rem 0; position: relative; }
.jm-ritual::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: var(--gradient-royal); }
.jm-ritual::after { content: '✨'; position: absolute; top: 1.25rem; right: 1.25rem; font-size: 1.75rem; opacity: 0.4; animation: twinkle 4s ease-in-out infinite; }
.jm-ritual h4 { margin-top: 0; display: flex; align-items: center; gap: 0.85rem; font-size: 1.25rem; }
.jm-ritual-steps { counter-reset: step; list-style: none; padding: 0; margin-top: 1.5rem; }
.jm-ritual-steps li { counter-increment: step; display: flex; gap: 1.25rem; padding: 1.25rem 0; border-bottom: 1px solid hsla(260, 70%, 70%, 0.1); }
.jm-ritual-steps li:last-child { border-bottom: none; }
.jm-ritual-steps li::before { content: counter(step); width: 38px; height: 38px; min-width: 38px; background: var(--gradient-candy); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 12px hsla(260, 70%, 50%, 0.3); }

.jm-footer { text-align: center; padding: 4rem 2rem; margin-top: 3rem; background: linear-gradient(180deg, transparent, hsla(260, 30%, 95%, 0.5)); }
.jm-footer p { color: hsl(var(--muted)); font-size: 0.9rem; }
.jm-footer .brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.25rem; background: var(--gradient-candy); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.5rem; }

@media print {
  body { background: white; }
  .jm-cover { min-height: auto; break-after: page; page-break-after: always; }
  .jm-section { break-inside: avoid; box-shadow: none; border: 1px solid #ddd; }
  .jm-month-card { break-inside: avoid; }
  .jm-tarot-card { break-inside: avoid; }
  * { animation: none !important; }
}
`;

/**
 * Envolve o HTML gerado pela IA com o documento completo
 */
export function wrapWithFullDocument(htmlContent: string, nome: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapa do Glow Up 2026 - ${nome}</title>
  <style>${PREMIUM_CSS}</style>
</head>
<body>
  ${htmlContent}

  <footer class="jm-footer">
    <p class="brand">Jovemística</p>
    <p>Este relatório foi gerado exclusivamente para <strong>${nome}</strong></p>
    <p>Mapa do Glow Up 2026 © Todos os direitos reservados</p>
  </footer>
</body>
</html>`;
}

/**
 * Exporta o CSS Premium para uso em outros contextos
 */
export function getPremiumCSS(): string {
  return PREMIUM_CSS;
}

/**
 * Função legada para compatibilidade - gera HTML básico
 */
export function generateCompleteReportHTML(data: {
  primeiro_nome: string;
  sobrenome?: string;
  signo: string;
  idade: number;
  ano_pessoal: number;
  arcano_pessoal_nome: string;
  arcano_2026_nome: string;
  portal_mes: string;
  aiContent?: any;
}): string {
  // Esta função é mantida para compatibilidade com o sistema antigo
  // O novo sistema usa wrapWithFullDocument com HTML gerado pela IA
  const nome = data.sobrenome ? `${data.primeiro_nome} ${data.sobrenome}` : data.primeiro_nome;

  return wrapWithFullDocument(`
<div class="jm-report">
  <section class="jm-cover">
    <span class="star">✨</span><span class="star">⭐</span><span class="star">💫</span>
    <span class="star">✨</span><span class="star">🌟</span><span class="star">⭐</span>
    <span class="star">💫</span><span class="star">✨</span><span class="star">✦</span><span class="star">☆</span>
    <h1>✨ ${nome} ✨</h1>
    <p class="subtitle">O Mapa Completo do Seu Glow Up em 2026</p>
    <div class="badge">☀️ ${data.signo} • ${data.idade} anos • Ano ${data.ano_pessoal}</div>
    <p class="tagline">"Seu guia completo para um ano de transformação"</p>
  </section>

  <div class="jm-divider"><span>✨</span></div>

  <section class="jm-section accent-lilas">
    <h2>✨ Seu Ano Pessoal ${data.ano_pessoal}</h2>
    <p>Em 2026, ${data.primeiro_nome}, você está vivendo um <strong>Ano Pessoal ${data.ano_pessoal}</strong>.</p>
    ${data.aiContent?.anoPessoal?.textos?.map((t: string) => `<p>${t}</p>`).join('') || ''}
  </section>

  <div class="jm-divider"><span>🔮</span></div>

  <section class="jm-section accent-rose">
    <h2>🔮 Seus Arcanos de 2026</h2>
    <div class="jm-tarot-grid">
      <div class="jm-tarot-card">
        <div class="numero">Arcano Pessoal</div>
        <h4>${data.arcano_pessoal_nome}</h4>
        <div class="energia">Essência</div>
      </div>
      <div class="jm-tarot-card">
        <div class="numero">Arcano 2026</div>
        <h4>${data.arcano_2026_nome}</h4>
        <div class="energia">Ano</div>
      </div>
    </div>
  </section>

  <div class="jm-divider"><span>🌟</span></div>

  <section class="jm-section accent-gold">
    <h2>🌟 Seu Mês Portal: ${data.portal_mes}</h2>
    <p>${data.portal_mes} será um mês especialmente poderoso para você em 2026!</p>
    ${data.aiContent?.mesPortal?.textos?.map((t: string) => `<p>${t}</p>`).join('') || ''}
  </section>
</div>
  `, nome);
}
