You are working as a design prototyping assistant inside Paper (paper.design).

The code below contains a reference design in HTML/CSS. Your task is to recreate this design as an editable prototype in Paper using the Paper MCP connection.

IMPORTANT RULES:
1. ONLY operate through the Paper MCP server. Do NOT create any local files, folders, or projects.
2. Do NOT scaffold a Vite/React/Next.js project. This is a DESIGN task, not a coding task.
3. Preserve the visual characteristics with high fidelity: layout structure, color tokens, spacing, border-radius, shadows, typography hierarchy.
4. Make the design editable — UI designers will manually refine it in Paper afterward.

CONTEXT — This is a prototype for "中心 Agent 引擎" (Center Agent Engine), an internal marketing automation platform:
- Left panel: Chat interface where users talk to an AI Agent to create marketing campaigns (e.g., coupon creation)
- Center: Navigation sidebar with module categories (Chat, Control, Agent, Settings)
- Right panel: Console/workspace showing campaign details, rule cards, and real-time activity log
- Floating overlay (bottom-right): Execution progress stats (batch progress, API rate, estimated time)

The Chinese labels in the sidebar navigation should be preserved as-is. The chat content and console content can remain in English as placeholder.

DESIGN TOKENS TO PRESERVE (from CSS custom properties):
- Background: #f2f3f5 (app), #ffffff (surface)
- Text: #1d2129 (primary), #86909c (secondary), #c9cdd4 (tertiary)
- Accent: #1664ff (status/active), #3a4a2e (sidebar bg), #7aaa4a (sidebar accent)
- Radius: 24px (panel), 16px (card), 12px (button), 9999px (pill)
- Font: Inter / system sans-serif, monospace for terminal output

Reference HTML/CSS follows:

```html
<html lang="en" vid="0"><head vid="1">
 <meta charset="UTF-8" vid="2">
 <meta name="viewport" content="width=device-width, initial-scale=1.0" vid="3">
 <title vid="4">Marketing AI Agent - Coupon Console</title>
 <style vid="5">
 :root {
 
 --bg-app: #f2f3f5;
 --bg-surface: #ffffff;
 --bg-surface-elevated: #ffffff;
 --bg-element: #f2f3f5;
 --bg-element-hover: #e5e6eb;
 --bg-terminal: #f7f8fa;
 
 --text-primary: #1d2129;
 --text-secondary: #86909c;
 --text-tertiary: #c9cdd4;
 
 --border-light: #f2f3f5;
 --border-medium: #e5e6eb;
 
 
 --status-green-bg: #e8f3ff;
 --status-green-dot: #1664ff;
 --status-green-text: #1664ff;

 --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
 --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
 
 --radius-panel: 24px;
 --radius-card: 16px;
 --radius-btn: 12px;
 --radius-pill: 9999px;
 
 --shadow-panel: 0 4px 20px rgba(0, 0, 0, 0.02);
 --shadow-popover: 0 10px 24px rgba(0, 0, 0, 0.08);
 }

 * {
 box-sizing: border-box;
 margin: 0;
 padding: 0;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 }

 body {
 font-family: var(--font-sans);
 background-color: var(--bg-app);
 color: var(--text-primary);
 height: 100vh;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 font-size: 14px;
 }

 svg {
 stroke: currentColor;
 stroke-width: 1.5;
 fill: none;
 stroke-linecap: round;
 stroke-linejoin: round;
 }

 header {
 display: none;
 }

 .logo-area {
 display: flex;
 align-items: center;
 gap: 12px;
 font-weight: 700;
 font-size: 16px;
 color: var(--text-primary);
 }
 
 .logo-area svg { 
 width: 24px;
 height: 24px;
 color: var(--text-primary);
 }

 .search-bar {
 background-color: var(--bg-surface);
 border-radius: var(--radius-pill);
 display: flex;
 align-items: center;
 padding: 10px 20px;
 width: 440px;
 box-shadow: 0 2px 8px rgba(0,0,0,0.02);
 gap: 10px;
 color: var(--text-secondary);
 border: 1px solid transparent;
 transition: all 0.2s;
 }
 
 .search-bar:focus-within {
 border-color: var(--border-medium);
 box-shadow: 0 4px 12px rgba(0,0,0,0.04);
 }

 .search-bar input {
 border: none;
 background: none;
 outline: none;
 width: 100%;
 font-size: 14px;
 font-family: inherit;
 color: var(--text-primary);
 }
 
 .search-shortcut {
 font-size: 12px;
 font-weight: 600;
 color: var(--text-tertiary);
 display: flex;
 align-items: center;
 gap: 4px;
 background: var(--bg-element);
 padding: 4px 8px;
 border-radius: 6px;
 }

 .user-profile {
 display: flex;
 align-items: center;
 gap: 12px;
 cursor: pointer;
 }

 .avatar {
 width: 36px;
 height: 36px;
 border-radius: 50%;
 background-color: var(--bg-element);
 overflow: hidden;
 display: flex;
 align-items: center;
 justify-content: center;
 }

 .layout-container {
 display: flex;
 flex: 1;
 padding: 0 20px 20px 20px;
 gap: 0;
 min-height: 0;
 }

 .panel {
 background-color: var(--bg-surface);
 border-radius: var(--radius-panel);
 box-shadow: var(--shadow-panel);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 }

 .sidebar-nav {
 width: 200px;
 flex-shrink: 0;
 background-color: #3a4a2e;
 border-radius: 16px;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 margin-left: 12px;
 margin-right: 12px;
 padding: 16px 12px;
 gap: 2px;
 }

 .sidebar-logo {
 display: flex;
 align-items: center;
 gap: 10px;
 padding: 8px 10px 16px;
 font-weight: 700;
 font-size: 15px;
 color: #ffffff;
 border-bottom: 1px solid rgba(255,255,255,0.1);
 margin-bottom: 8px;
 }

 .sidebar-logo-dot {
 width: 28px;
 height: 28px;
 background-color: #7aaa4a;
 border-radius: 8px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 13px;
 font-weight: 800;
 color: white;
 }

 .nav-section-label {
 font-size: 10px;
 font-weight: 700;
 color: rgba(255,255,255,0.35);
 letter-spacing: 0.1em;
 padding: 10px 10px 4px;
 text-transform: uppercase;
 }

 .nav-item {
 display: flex;
 align-items: center;
 gap: 10px;
 padding: 9px 10px;
 border-radius: 10px;
 font-size: 13.5px;
 font-weight: 500;
 color: rgba(255,255,255,0.6);
 cursor: pointer;
 transition: background-color 0.15s, color 0.15s;
 text-decoration: none;
 }

 .nav-item svg {
 width: 16px;
 height: 16px;
 flex-shrink: 0;
 opacity: 0.7;
 }

 .nav-item:hover {
 background-color: rgba(255,255,255,0.08);
 color: rgba(255,255,255,0.9);
 }

 .nav-item.active {
 background-color: rgba(122,170,74,0.25);
 color: #c8e6a0;
 }

 .nav-item.active svg {
 opacity: 1;
 color: #c8e6a0;
 }

 .nav-spacer {
 flex: 1;
 }

 .nav-bottom-item {
 display: flex;
 align-items: center;
 gap: 10px;
 padding: 10px;
 border-radius: 10px;
 font-size: 13px;
 color: rgba(255,255,255,0.45);
 cursor: pointer;
 border-top: 1px solid rgba(255,255,255,0.08);
 margin-top: 4px;
 padding-top: 14px;
 }

 .nav-bottom-dot {
 width: 24px;
 height: 24px;
 border-radius: 50%;
 background-color: rgba(255,255,255,0.15);
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 10px;
 color: rgba(255,255,255,0.6);
 font-weight: 700;
 }

 .chat-panel {
 width: 300px;
 flex-shrink: 0;
 border: 1px solid rgba(0,0,0,0.02);
 }

 .chat-header {
 padding: 24px 24px 16px;
 border-bottom: 1px solid var(--border-light);
 font-weight: 700;
 font-size: 16px;
 display: flex;
 align-items: center;
 gap: 10px;
 color: var(--text-primary);
 }

 .chat-messages {
 flex: 1;
 overflow-y: auto;
 padding: 24px;
 display: flex;
 flex-direction: column;
 gap: 28px;
 }

 .message {
 display: flex;
 flex-direction: column;
 gap: 8px;
 max-width: 88%;
 }

 .message.ai {
 align-self: flex-start;
 }

 .message.user {
 align-self: flex-end;
 align-items: flex-end;
 }

 .msg-bubble {
 padding: 14px 18px;
 font-size: 14px;
 line-height: 1.6;
 }

 .message.ai .msg-bubble {
 background-color: var(--bg-surface);
 border: 1px solid var(--border-light);
 color: var(--text-primary);
 border-radius: 20px 20px 20px 4px;
 box-shadow: 0 2px 12px rgba(0,0,0,0.02);
 }

 
 .message.user .msg-bubble {
 background-color: #1d2129;
 color: #ffffff;
 border-radius: 20px 20px 4px 20px;
 }
 
 .msg-meta {
 font-size: 12px;
 color: var(--text-secondary);
 font-weight: 500;
 padding: 0 4px;
 }

 .chat-input-area {
 padding: 16px 24px 24px;
 }

 .chat-input-box {
 background-color: var(--bg-element);
 border-radius: var(--radius-pill);
 display: flex;
 align-items: center;
 padding: 8px 12px 8px 20px;
 gap: 12px;
 }

 .chat-input-box input {
 border: none;
 background: none;
 outline: none;
 flex: 1;
 font-size: 14px;
 font-family: inherit;
 color: var(--text-primary);
 }
 
 .chat-input-box input::placeholder {
 color: var(--text-secondary);
 }

 .send-btn {
 background-color: var(--bg-surface);
 border: none;
 border-radius: 50%;
 width: 36px;
 height: 36px;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 color: var(--text-primary);
 box-shadow: 0 2px 8px rgba(0,0,0,0.05);
 transition: transform 0.1s;
 }
 
 .send-btn:active {
 transform: scale(0.95);
 }

 .console-panel {
 flex: 1;
 padding: 32px 36px;
 overflow-y: auto;
 border: 1px solid rgba(0,0,0,0.02);
 background-color: #f7f8fa;
 }

 .console-header-section {
 display: flex;
 align-items: flex-start;
 justify-content: space-between;
 margin-bottom: 24px;
 background: #ffffff;
 border-radius: 16px;
 padding: 20px 24px;
 border: 1px solid var(--border-light);
 box-shadow: 0 1px 4px rgba(0,0,0,0.03);
 }

 .campaign-identity {
 display: flex;
 gap: 24px;
 align-items: center;
 }

 .campaign-icon {
 width: 56px;
 height: 56px;
 color: var(--text-tertiary);
 background: var(--bg-element);
 border-radius: 16px;
 padding: 12px;
 }

 .campaign-title-area {
 display: flex;
 flex-direction: column;
 gap: 8px;
 }

 .title-row {
 display: flex;
 align-items: center;
 gap: 16px;
 }

 .campaign-title {
 font-size: 20px;
 font-weight: 700;
 color: var(--text-primary);
 letter-spacing: -0.3px;
 }

 .status-pill {
 background-color: var(--status-green-bg);
 color: var(--status-green-text);
 padding: 6px 14px;
 border-radius: var(--radius-pill);
 font-size: 13px;
 font-weight: 600;
 display: flex;
 align-items: center;
 gap: 6px;
 }

 .status-dot {
 width: 6px;
 height: 6px;
 background-color: currentColor;
 border-radius: 50%;
 }

 .campaign-meta {
 font-size: 15px;
 color: var(--text-secondary);
 }

 .campaign-meta strong {
 color: var(--text-primary);
 font-weight: 600;
 }

 .action-group {
 display: flex;
 gap: 12px;
 }

 .icon-btn {
 width: 44px;
 height: 44px;
 border-radius: var(--radius-btn);
 background-color: var(--bg-element);
 border: none;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 color: var(--text-primary);
 transition: background-color 0.2s;
 }

 .icon-btn:hover {
 background-color: var(--bg-element-hover);
 }

 .icon-btn svg {
 width: 20px;
 height: 20px;
 }

 .controls-row {
 display: flex;
 gap: 12px;
 margin-bottom: 20px;
 }

 .config-card {
 background-color: var(--bg-surface);
 border: 1px solid var(--border-light);
 border-radius: var(--radius-card);
 padding: 16px 18px;
 flex: 1;
 display: flex;
 flex-direction: column;
 gap: 6px;
 position: relative;
 box-shadow: 0 1px 4px rgba(0,0,0,0.03);
 transition: border-color 0.2s;
 }
 
 .config-card:hover {
 border-color: var(--border-medium);
 }

 .config-card.add-new {
 align-items: center;
 justify-content: center;
 font-weight: 600;
 color: var(--text-primary);
 background-color: var(--bg-element);
 border: 1px dashed var(--border-medium);
 cursor: pointer;
 box-shadow: none;
 }

 .card-header {
 display: flex;
 align-items: center;
 gap: 10px;
 font-weight: 600;
 font-size: 15px;
 color: var(--text-primary);
 }

 .card-meta {
 font-size: 13px;
 color: var(--text-secondary);
 display: flex;
 align-items: center;
 gap: 8px;
 }

 .card-actions {
 position: absolute;
 right: 16px;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 gap: 12px;
 }

 .card-actions svg {
 width: 18px;
 height: 18px;
 color: var(--text-tertiary);
 cursor: pointer;
 transition: color 0.2s;
 }
 
 .card-actions svg:hover {
 color: var(--text-primary);
 }

 .section-label {
 font-size: 12px;
 font-weight: 700;
 color: var(--text-secondary);
 letter-spacing: 0.08em;
 margin-bottom: 14px;
 display: flex;
 align-items: center;
 gap: 8px;
 }
 
 .section-label::before {
 content: '';
 width: 3px;
 height: 14px;
 background-color: #1664ff;
 border-radius: 2px;
 }

 .log-list {
 display: flex;
 flex-direction: column;
 gap: 0;
 background: #ffffff;
 border-radius: 16px;
 border: 1px solid var(--border-light);
 overflow: hidden;
 box-shadow: 0 1px 4px rgba(0,0,0,0.03);
 }

 .log-item {
 display: flex;
 flex-direction: column;
 gap: 0;
 border-bottom: 1px solid var(--border-light);
 }
 .log-item:last-child {
 border-bottom: none;
 }

 .log-header {
 display: flex;
 align-items: center;
 gap: 14px;
 padding: 16px 20px;
 }

 .log-icon {
 width: 14px;
 height: 14px;
 color: #21a14f;
 background-color: #e8f7f0;
 padding: 6px;
 border-radius: 50%;
 box-sizing: content-box;
 flex-shrink: 0;
 stroke-width: 2.5;
 }

 .log-content {
 flex: 1;
 display: flex;
 justify-content: space-between;
 align-items: center;
 }

 .log-title {
 font-weight: 500;
 font-size: 14px;
 color: var(--text-primary);
 }

 .log-time {
 font-size: 13px;
 color: var(--text-secondary);
 }

 .log-details {
 background-color: #f7f8fa;
 border-top: 1px solid var(--border-light);
 padding: 16px 20px 16px 58px;
 font-family: var(--font-sans);
 font-size: 13.5px;
 color: var(--text-primary);
 line-height: 1.65;
 position: relative;
 }

 .log-details::before {
 display: none;
 }
 
 .copy-icon-abs {
 position: absolute;
 top: 20px;
 right: 20px;
 width: 18px;
 height: 18px;
 color: var(--text-tertiary);
 cursor: pointer;
 }
 
 .copy-icon-abs:hover {
 color: var(--text-primary);
 }

 .show-more-btn {
 background-color: var(--bg-surface);
 border: 1px solid var(--border-medium);
 border-radius: var(--radius-pill);
 padding: 6px 14px;
 font-size: 12px;
 font-weight: 600;
 color: var(--text-secondary);
 cursor: pointer;
 align-self: flex-start;
 margin-top: 10px;
 display: flex;
 align-items: center;
 gap: 6px;
 transition: background-color 0.2s;
 }
 
 .show-more-btn:hover {
 background-color: var(--bg-element);
 }

 
 .side-stats {
 position: fixed;
 bottom: 40px;
 right: 48px;
 display: flex;
 flex-direction: column;
 gap: 16px;
 font-family: var(--font-sans);
 font-size: 13px;
 color: #86909c;
 background-color: #1d2129;
 padding: 24px;
 border-radius: 20px;
 box-shadow: 0 16px 40px rgba(0,0,0,0.15);
 min-width: 200px;
 }

 .stat-row {
 display: flex;
 align-items: center;
 gap: 12px;
 }
 
 .stat-row svg {
 width: 16px;
 height: 16px;
 color: #86909c;
 }

 .stat-val {
 color: #ffffff;
 font-weight: 700;
 font-size: 15px;
 }

 .app-badge-group {
 display: none;
 }

 .app-badge {
 width: 48px;
 height: 48px;
 border-radius: 14px;
 background-color: #1d2129; 
 color: white;
 display: flex;
 align-items: center;
 justify-content: center;
 font-weight: 700;
 font-size: 18px;
 position: relative;
 box-shadow: 0 4px 12px rgba(0,0,0,0.08);
 }
 
 .app-badge.blue {
 background-color: #1664ff;
 }
 
 .app-badge::after {
 content: '';
 position: absolute;
 bottom: -4px;
 right: -4px;
 width: 14px;
 height: 14px;
 background-color: #00e5ff; 
 border: 3px solid var(--bg-surface);
 border-radius: 50%;
 }
 
 .app-badge.blue::after {
 background-color: #21a14f; 
 }

 </style>
</head>
<body vid="6">

 <header vid="7">
 <div class="logo-area" vid="8">
 <svg viewBox="0 0 24 24" vid="9"><line x1="3" y1="12" x2="21" y2="12" vid="10"></line><line x1="3" y1="6" x2="21" y2="6" vid="11"></line></svg>
 Marketing OS
 </div>
 
 <div class="search-bar" vid="12">
 <svg viewBox="0 0 24 24" style="width: 18px; height: 18px;" vid="13"><circle cx="11" cy="11" r="8" vid="14"></circle><line x1="21" y1="21" x2="16.65" y2="16.65" vid="15"></line></svg>
 <span vid="16">To search</span>
 <span style="flex:1" vid="17"></span>
 <div class="search-shortcut" vid="18">⌘ + K</div>
 </div>

 <div class="user-profile" vid="19">
 <div class="avatar" vid="20">
 <svg viewBox="0 0 32 32" style="width:20px; height:20px; fill: var(--text-secondary); stroke:none;" vid="21"><circle cx="16" cy="12" r="5" vid="22"></circle><path d="M16 19c-5 0-9 4-9 8h18c0-4-4-8-9-8z" vid="23"></path></svg>
 </div>
 <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; color: var(--text-secondary);" vid="24"><polyline points="6 9 12 15 18 9" vid="25"></polyline></svg>
 </div>
 </header>

 <div class="layout-container" vid="26">

 <!-- 1. Chat Panel -->
 <div class="panel chat-panel" vid="27">
 <div class="chat-header" vid="28">
 <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;" vid="29"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" vid="30"></path></svg>
 Campaign Agent
 </div>
 <div class="chat-messages" vid="31">
 <div class="message user" vid="32">
 <span class="msg-meta" vid="33">You</span>
 <div class="msg-bubble" vid="34">I need to set up a new campaign for Black Friday. Let's create a batch of 10,000 unique codes giving 25% off storewide.</div>
 </div>
 <div class="message ai" vid="35">
 <span class="msg-meta" vid="36">Agent</span>
 <div class="msg-bubble" vid="37">I can help with that. I'll configure a new campaign named "Black Friday 2024". <br vid="38">Should these codes have an expiration date, or any specific prefix like "BF24-"?</div>
 </div>
 <div class="message user" vid="39">
 <span class="msg-meta" vid="40">You</span>
 <div class="msg-bubble" vid="41">Yes, use prefix "BF24-" and set them to expire on Cyber Monday at midnight PST.</div>
 </div>
 <div class="message ai" vid="42">
 <span class="msg-meta" vid="43">Agent</span>
 <div class="msg-bubble" vid="44">Configuration generated. I am deploying the coupon generation job to Shopify now. You can monitor the progress in the console.</div>
 </div>
 </div>
 <div class="chat-input-area" vid="45">
 <div class="chat-input-box" vid="46">
 <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; color: var(--text-secondary);" vid="47"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" vid="48"></path></svg>
 <input type="text" placeholder="Message agent..." vid="49">
 <button class="send-btn" vid="50">
 <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;" vid="51"><line x1="22" y1="2" x2="11" y2="13" vid="52"></line><polygon points="22 2 15 22 11 13 2 9 22 2" vid="53"></polygon></svg>
 </button>
 </div>
 </div>
 </div>

 <!-- 2. Sidebar Nav Menu -->
 <nav class="sidebar-nav" vid="54">
 <div class="sidebar-logo" vid="55">
 <div class="sidebar-logo-dot" vid="56">M</div>
 Marketing OS
 </div>

 <div class="nav-section-label" vid="57">聊天</div>
 <a class="nav-item" vid="58">
 <svg viewBox="0 0 24 24" vid="59"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" vid="60"></path></svg>
 聊天
 </a>

 <div class="nav-section-label" vid="61">控制</div>
 <a class="nav-item" vid="62">
 <svg viewBox="0 0 24 24" vid="63"><rect x="3" y="3" width="7" height="7" vid="64"></rect><rect x="14" y="3" width="7" height="7" vid="65"></rect><rect x="14" y="14" width="7" height="7" vid="66"></rect><rect x="3" y="14" width="7" height="7" vid="67"></rect></svg>
 概览
 </a>
 <a class="nav-item" vid="68">
 <svg viewBox="0 0 24 24" vid="69"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" vid="70"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" vid="71"></path></svg>
 频道
 </a>
 <a class="nav-item active" vid="72">
 <svg viewBox="0 0 24 24" vid="73"><circle cx="12" cy="12" r="3" vid="74"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14" vid="75"></path><path d="M4.93 4.93a10 10 0 0 0 0 14.14" vid="76"></path></svg>
 实例
 </a>
 <a class="nav-item" vid="77">
 <svg viewBox="0 0 24 24" vid="78"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" vid="79"></path></svg>
 会话
 </a>
 <a class="nav-item" vid="80">
 <svg viewBox="0 0 24 24" vid="81"><line x1="18" y1="20" x2="18" y2="10" vid="82"></line><line x1="12" y1="20" x2="12" y2="4" vid="83"></line><line x1="6" y1="20" x2="6" y2="14" vid="84"></line></svg>
 使用情况
 </a>
 <a class="nav-item" vid="85">
 <svg viewBox="0 0 24 24" vid="86"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" vid="87"></rect><line x1="16" y1="2" x2="16" y2="6" vid="88"></line><line x1="8" y1="2" x2="8" y2="6" vid="89"></line><line x1="3" y1="10" x2="21" y2="10" vid="90"></line></svg>
 定时任务
 </a>

 <div class="nav-section-label" vid="91">代理</div>
 <a class="nav-item" vid="92">
 <svg viewBox="0 0 24 24" vid="93"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" vid="94"></path><circle cx="12" cy="7" r="4" vid="95"></circle></svg>
 代理
 </a>
 <a class="nav-item" vid="96">
 <svg viewBox="0 0 24 24" vid="97"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" vid="98"></polygon></svg>
 技能
 </a>
 <a class="nav-item" vid="99">
 <svg viewBox="0 0 24 24" vid="100"><circle cx="5" cy="12" r="2" vid="101"></circle><circle cx="19" cy="5" r="2" vid="102"></circle><circle cx="19" cy="19" r="2" vid="103"></circle><line x1="7" y1="12" x2="17" y2="6" vid="104"></line><line x1="7" y1="12" x2="17" y2="18" vid="105"></line></svg>
 节点
 </a>

 <div class="nav-section-label" vid="106">设置</div>
 <a class="nav-item" vid="107">
 <svg viewBox="0 0 24 24" vid="108"><circle cx="12" cy="12" r="3" vid="109"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" vid="110"></path></svg>
 配置
 </a>
 <a class="nav-item" vid="111">
 <svg viewBox="0 0 24 24" vid="112"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" vid="113"></path><path d="M9 9l6 6M15 9l-6 6" vid="114"></path></svg>
 调试
 </a>
 <a class="nav-item" vid="115">
 <svg viewBox="0 0 24 24" vid="116"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" vid="117"></path><polyline points="14 2 14 8 20 8" vid="118"></polyline><line x1="16" y1="13" x2="8" y2="13" vid="119"></line><line x1="16" y1="17" x2="8" y2="17" vid="120"></line><polyline points="10 9 9 9 8 9" vid="121"></polyline></svg>
 日志
 </a>

 <div class="nav-spacer" vid="122"></div>

 <div class="nav-bottom-item" vid="123">
 <div class="nav-bottom-dot" vid="124">A</div>
 Admin Workspace
 </div>
 </nav>

 <!-- 3. Console Panel -->
 <div class="panel console-panel" vid="125">
 
 <div class="console-header-section" vid="126">
 <div class="campaign-identity" vid="127">
 <svg class="campaign-icon" viewBox="0 0 48 48" style="fill: currentColor; stroke: none; opacity: 0.3;" vid="128">
 <path d="M24 0 L48 48 L0 48 Z M24 16 L38 42 L10 42 Z" vid="129"></path>
 </svg>
 
 <div class="campaign-title-area" vid="130">
 <div class="title-row" vid="131">
 <span class="campaign-title" vid="132">black-friday-2024</span>
 <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; color: var(--text-tertiary);" vid="133"><polyline points="6 9 12 15 18 9" vid="134"></polyline></svg>
 <div class="status-pill" vid="135">
 <div class="status-dot" vid="136"></div>
 Running
 </div>
 </div>
 <div class="campaign-meta" vid="137">
 Target: <strong vid="138">Shopify Production</strong>
 </div>
 </div>
 </div>

 <div class="action-group" vid="139">
 <button class="icon-btn" vid="140"><svg viewBox="0 0 24 24" vid="141"><path d="M12 20h9" vid="142"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" vid="143"></path></svg></button>
 <button class="icon-btn" vid="144"><svg viewBox="0 0 24 24" vid="145"><path d="M21 2v6h-6" vid="146"></path><path d="M3 12a9 9 0 1 0 2.63-6.37L2 12" vid="147"></path></svg></button>
 <button class="icon-btn" vid="148"><svg viewBox="0 0 24 24" vid="149"><path d="M18.36 6.64a9 9 0 1 1-12.73 0" vid="150"></path><line x1="12" y1="2" x2="12" y2="12" vid="151"></line></svg></button>
 <button class="icon-btn" vid="152"><svg viewBox="0 0 24 24" vid="153"><polyline points="3 6 5 6 21 6" vid="154"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" vid="155"></path></svg></button>
 </div>
 </div>

 <div class="app-badge-group" vid="156">
 <div class="app-badge" vid="157">SH</div>
 <div class="app-badge blue" vid="158">KL</div>
 </div>

 <div class="controls-row" vid="159">
 <div class="config-card add-new" vid="160">
 + Add Rule
 </div>
 
 <div class="config-card" vid="161">
 <div class="card-header" vid="162">
 <div style="width:10px; height:10px; border-radius:50%; background:var(--status-green-dot);" vid="163"></div>
 Storewide 25%
 <svg viewBox="0 0 24 24" style="width:14px; height:14px; color:var(--text-tertiary)" vid="164"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" vid="165"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" vid="166"></path></svg>
 </div>
 <div class="card-meta" vid="167">
 Prefix: BF24- <span style="color:var(--border-medium)" vid="168">•</span> 10,000 codes
 </div>
 <div class="card-actions" vid="169">
 <svg viewBox="0 0 24 24" vid="170"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" vid="171"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" vid="172"></path></svg>
 <svg viewBox="0 0 24 24" vid="173"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" vid="174"></path><polyline points="15 3 21 3 21 9" vid="175"></polyline><line x1="10" y1="14" x2="21" y2="3" vid="176"></line></svg>
 </div>
 </div>

 <div class="config-card" vid="177">
 <div class="card-header" vid="178">
 <div style="width:10px; height:10px; border-radius:50%; background:var(--text-tertiary);" vid="179"></div>
 VIP List 30%
 </div>
 <div class="card-meta" vid="180">
 Prefix: BFVIP- <span style="color:var(--border-medium)" vid="181">•</span> Pending
 </div>
 <div class="card-actions" style="right: 12px;" vid="182">
 <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;" vid="183"><polyline points="9 18 15 12 9 6" vid="184"></polyline></svg>
 </div>
 </div>
 </div>

 <div class="section-label" vid="185">ACTIVITY LOG</div>
 
 <div class="log-list" vid="186">
 
 <div class="log-item" vid="187">
 <div class="log-header" vid="188">
 <svg class="log-icon" viewBox="0 0 24 24" vid="189"><polyline points="20 6 9 17 4 12" vid="190"></polyline></svg>
 <div class="log-content" vid="191">
 <span class="log-title" vid="192">Authorizing Shopify Admin API inside environment</span>
 </div>
 </div>
 </div>

 <div class="log-item" vid="193">
 <div class="log-header" vid="194">
 <svg class="log-icon" viewBox="0 0 24 24" vid="195"><polyline points="20 6 9 17 4 12" vid="196"></polyline></svg>
 <div class="log-content" vid="197">
 <span class="log-title" vid="198">Configuring Batch Request</span>
 <span class="log-time" vid="199">1.1s</span>
 </div>
 </div>
 <div class="log-details" vid="200">
 <svg class="copy-icon-abs" viewBox="0 0 24 24" vid="201"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" vid="202"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" vid="203"></path></svg>
 <span style="color:#ff7d00; margin-right:8px;" vid="204">🔔</span> Codes will be generated with following payload constraints:<br vid="205"><br vid="206">
 Discount: 25.0%<br vid="207">
 Applies to: All Products<br vid="208">
 Ends: 2024-12-02T23:59:59Z<br vid="209"><br vid="210">
 <span style="color:var(--text-secondary)" vid="211">You may modify these parameters by asking the agent to update the ruleset prior to final generation.</span>
 <button class="show-more-btn" vid="212">
 <svg viewBox="0 0 24 24" style="width:16px; height:16px;" vid="213"><polyline points="9 18 15 12 9 6" vid="214"></polyline></svg> Show more
 </button>
 </div>
 </div>

 <div class="log-item" vid="215">
 <div class="log-header" vid="216">
 <svg class="log-icon" viewBox="0 0 24 24" vid="217"><polyline points="20 6 9 17 4 12" vid="218"></polyline></svg>
 <div class="log-content" vid="219">
 <span class="log-title" vid="220">Running ~/generate_codes --batch=10000</span>
 <span class="log-time" vid="221">4.2s</span>
 </div>
 </div>
 <div class="log-details" vid="222">
 <svg class="copy-icon-abs" viewBox="0 0 24 24" vid="223"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" vid="224"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" vid="225"></path></svg>
 Batch generation initiated.<br vid="226"><br vid="227">
 <span style="font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary);" vid="228">
 [1000/10000] codes pushed to Shopify DB...<br vid="229">
 [2000/10000] codes pushed to Shopify DB...<br vid="230">
 </span>
 <br vid="231">
 <span style="color:var(--text-secondary)" vid="232">Process continuing in background. Network latency may cause slight delays in sync rate.</span>
 <button class="show-more-btn" vid="233">
 <svg viewBox="0 0 24 24" style="width:16px; height:16px;" vid="234"><polyline points="9 18 15 12 9 6" vid="235"></polyline></svg> Show more
 </button>
 </div>
 </div>

 </div>
 </div>
 </div>

 <div class="side-stats" vid="236">
 <div class="stat-row" vid="237">
 <svg viewBox="0 0 24 24" vid="238"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" vid="239"></rect><path d="M6 8h.01" vid="240"></path><path d="M10 8h.01" vid="241"></path><path d="M14 8h.01" vid="242"></path><path d="M6 12h12" vid="243"></path></svg>
 <span vid="244">BATCH:</span> <span class="stat-val" vid="245">2.1</span>/10.0 K
 </div>
 <div class="stat-row" vid="246">
 <svg viewBox="0 0 24 24" vid="247"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" vid="248"></rect><rect x="9" y="9" width="6" height="6" vid="249"></rect><line x1="9" y1="1" x2="9" y2="4" vid="250"></line><line x1="15" y1="1" x2="15" y2="4" vid="251"></line><line x1="9" y1="20" x2="9" y2="23" vid="252"></line><line x1="15" y1="20" x2="15" y2="23" vid="253"></line><line x1="20" y1="9" x2="23" y2="9" vid="254"></line><line x1="20" y1="14" x2="23" y2="14" vid="255"></line><line x1="1" y1="9" x2="4" y2="9" vid="256"></line><line x1="1" y1="14" x2="4" y2="14" vid="257"></line></svg>
 <span vid="258">API RATE:</span> <span class="stat-val" vid="259">45</span>/sec
 </div>
 <div class="stat-row" vid="260">
 <svg viewBox="0 0 24 24" vid="261"><circle cx="12" cy="12" r="10" vid="262"></circle><polyline points="12 6 12 12 16 14" vid="263"></polyline></svg>
 <span vid="264">EST. TIME:</span> <span class="stat-val" vid="265">03:12</span>
 </div>
 </div>

</body></html>
```
