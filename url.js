export default {
  async fetch(request, env, ctx) {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>hxorz URL 转换器 - hxorz.cn</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: #020617;
      color: #f9fafb;
      overflow-x: hidden;
    }

    /* 粒子动画背景 */
    #particles-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 16px 24px;
    }
    .main {
      width: 100%;
      max-width: 1200px;
    }

    .header {
      margin-bottom: 10px;
      text-align: center;
    }
    .header-title {
      font-size: 28px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .header-badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid rgba(56, 189, 248, 0.7);
      color: #7dd3fc;
      background: rgba(15, 23, 42, 0.9);
    }
    .header-sub {
      margin-top: 6px;
      font-size: 13px;
      color: #9ca3af;
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
    }

    /* 打字机效果区域 */
    .typewriter-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
      padding: 15px 20px;
    }

    .typewriter-container {
      max-width: 900px;
      text-align: center;
    }

    .typewriter-wrapper {
      display: inline-block;
      text-align: left;
    }

    .typewriter-text {
      font-size: 16px;
      color: #22c55e;
      line-height: 1.5;
      font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
      text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
    }

    .typewriter-cursor {
      display: inline-block;
      width: 3px;
      height: 1.1em;
      background: #22c55e;
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: blink 1s infinite;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    @media (max-width: 640px) {
      .typewriter-text {
        font-size: 13px;
      }
      .typewriter-section {
        min-height: 80px;
      }
    }

    /* URL 转换卡片 */
    .card {
      width: 100%;
      background: rgba(15, 23, 42, 0.96);
      border-radius: 20px;
      padding: 20px 20px 18px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.9), 0 0 30px rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      backdrop-filter: blur(14px);
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #22c55e, #06b6d4, transparent);
      animation: cardGlow 3s ease-in-out infinite;
    }
    @keyframes cardGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .field {
      margin-bottom: 14px;
    }
    .field label {
      display: block;
      font-size: 13px;
      color: #e5e7eb;
      margin-bottom: 6px;
    }
    .field small {
      display: block;
      font-size: 11px;
      color: #9ca3af;
      margin-top: 2px;
    }
    input, textarea {
      width: 100%;
      border-radius: 10px;
      border: 1px solid rgba(56, 189, 248, 0.5);
      background: rgba(15, 23, 42, 0.9);
      color: #e5e7eb;
      padding: 9px 11px;
      font-size: 13px;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.2), inset 0 0 10px rgba(56, 189, 248, 0.05);
      position: relative;
    }
    input:focus, textarea:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.35), 0 0 40px rgba(34, 197, 94, 0.15), inset 0 0 12px rgba(56, 189, 248, 0.08);
      background: rgba(15, 23, 42, 0.95);
      animation: inputGlow 3s ease-in-out infinite;
    }
    @keyframes inputGlow {
      0%, 100% {
        border-color: #38bdf8;
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.35), 0 0 40px rgba(34, 197, 94, 0.15), inset 0 0 12px rgba(56, 189, 248, 0.08);
      }
      50% {
        border-color: #22c55e;
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.35), 0 0 40px rgba(56, 189, 248, 0.15), inset 0 0 12px rgba(34, 197, 94, 0.08);
      }
    }
    textarea {
      min-height: 64px;
      resize: vertical;
    }
    textarea#commandText {
      min-height: 80px;
      resize: none;
      overflow: hidden;
    }


    .output-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .output-row textarea {
      flex: 1;
    }

    .btn {
      border-radius: 10px;
      padding: 0 16px;
      font-size: 13px;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: linear-gradient(135deg, #22c55e, #06b6d4);
      color: #f9fafb;
      font-weight: 600;
      transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(6, 182, 212, 0.2);
    }
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: btnShine 2s infinite;
    }
    @keyframes btnShine {
      0% { left: -100%; }
      50%, 100% { left: 100%; }
    }
    .btn:hover {
      filter: brightness(1.1);
      box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(6, 182, 212, 0.4), 0 10px 25px rgba(34, 197, 94, 0.5);
      transform: translateY(-2px);
    }
    .btn:active {
      box-shadow: 0 0 15px rgba(34, 197, 94, 0.5), 0 5px 15px rgba(34, 197, 94, 0.4);
      transform: translateY(0);
    }

    .status {
      margin-top: 6px;
      font-size: 12px;
      min-height: 16px;
    }
    .status.ok {
      color: #4ade80;
    }
    .status.err {
      color: #f97373;
    }

    .footer {
      margin-top: 16px;
      font-size: 11px;
      color: #9ca3af;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 4px;
    }
    .footer a {
      color: #7dd3fc;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .pill {
      border-radius: 999px;
      padding: 2px 8px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.4);
    }
    .pill strong {
      color: #e5e7eb;
    }
    .pill span {
      color: #9ca3af;
      margin-left: 4px;
    }

    /* Docker 换源说明卡片 */
    .docker-card {
      width: 100%;
      background: rgba(15, 23, 42, 0.96);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.9), 0 0 30px rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      backdrop-filter: blur(14px);
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
    }
    .docker-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #06b6d4, #22c55e, transparent);
      animation: cardGlow 3s ease-in-out infinite reverse;
    }

    .docker-card h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      color: #e5e7eb;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .docker-card h3 .badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 999px;
      background: linear-gradient(135deg, #22c55e, #06b6d4);
      color: #fff;
    }

    .docker-card p {
      margin: 0 0 12px 0;
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.6;
    }

    .docker-card a {
      color: #7dd3fc;
      text-decoration: none;
    }
    .docker-card a:hover {
      text-decoration: underline;
    }

    .code-block {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      padding: 12px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      color: #e5e7eb;
      overflow-x: auto;
      margin: 10px 0;
      border: 1px solid rgba(148, 163, 184, 0.3);
    }

    .code-block pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .distro-section {
      margin-top: 16px;
    }

    .distro-section h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #e5e7eb;
    }

    .distro-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 10px;
    }

    .distro-tab {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.9);
      color: #9ca3af;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
    }

    .distro-tab:hover {
      border-color: #38bdf8;
      color: #e5e7eb;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
      transform: translateY(-1px);
    }

    .distro-tab.active {
      background: linear-gradient(135deg, #22c55e, #06b6d4);
      color: #fff;
      border-color: transparent;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
    }

    .distro-content {
      display: none;
    }

    .distro-content.active {
      display: block;
    }

    /* 悬浮访问信息窗 */
    .info-panel {
      position: fixed;
      right: 18px;
      bottom: 20px;
      width: 260px;
      max-width: calc(100% - 32px);
      background: rgba(31, 41, 55, 0.96);
      border-radius: 16px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.96);
      padding: 10px 12px;
      font-size: 11px;
      color: #e5e7eb;
      z-index: 40;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .info-panel.hidden {
      opacity: 0;
      transform: translateY(18px);
      pointer-events: none;
    }
    .info-title {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .info-title span {
      opacity: 0.8;
    }
    .info-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .info-list li {
      margin: 2px 0;
      line-height: 1.4;
    }
    .info-key {
      opacity: 0.75;
      margin-right: 4px;
    }
    .info-toggle {
      position: fixed;
      right: 18px;
      bottom: 18px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      background: rgba(15, 23, 42, 0.95);
      color: #e5e7eb;
      font-size: 11px;
      padding: 6px 12px;
      cursor: pointer;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.85);
      z-index: 30;
      display: none;
    }
    .info-toggle.visible {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    @media (max-width: 640px) {
      .card, .docker-card {
        padding: 16px 14px 14px;
      }
      .compass-clock {
        width: 95vw;
        height: 95vw;
      }
      .clock-item {
        font-size: 10px;
      }
      .clock-center-text {
        font-size: 12px;
      }
      .output-row {
        flex-direction: column;
      }
      .btn {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <canvas id="particles-canvas"></canvas>

  <div class="page">
    <main class="main">
      <header class="header">
        <div class="header-title">
          Xget URL 转换器
          <span class="header-badge">hxorz.cn 实例</span>
        </div>
        <div class="header-sub">
          将 GitHub / GitLab / Hugging Face / npm / PyPI 等平台的原始链接，一键转换为通过
          <code>hxorz.cn</code> 的 Xget 加速链接。
        </div>
      </header>

      <!-- 打字机效果 -->
      <section class="typewriter-section">
        <div class="typewriter-container">
          <div class="typewriter-wrapper">
            <span class="typewriter-text" id="typewriterText"></span><span class="typewriter-cursor" id="typewriterCursor"></span>
          </div>
        </div>
      </section>

      <!-- URL 转换主体卡片 -->
      <section class="card">
        <div class="field">
          <label for="instanceUrl">Xget 实例地址</label>
          <input id="instanceUrl" type="text" value="https://hxorz.cn" />
          <small>例如：<code>https://hxorz.cn</code>，可替换为你自己的 Xget Worker 域名（Docker 链接会自动切换到 hub.hxorz.cn）。</small>
        </div>

        <div class="field">
          <label for="originalUrl">原始 URL</label>
          <textarea id="originalUrl" placeholder="粘贴 GitHub / Docker Hub / GHCR / Hugging Face / npm / PyPI 等原始链接"></textarea>
          <small>平台将自动识别并生成加速 URL。</small>
        </div>

        <div class="field">
          <label for="convertedUrl">转换后的 Xget URL</label>
          <div class="output-row">
            <textarea id="convertedUrl" readonly placeholder="转换结果会显示在这里"></textarea>
            <button id="copyBtn" class="btn" type="button">
              复制链接
            </button>
          </div>
          <div id="status" class="status"></div>
        </div>

        <div class="field">
          <label for="commandText">推荐命令</label>
          <div class="output-row">
            <textarea id="commandText" readonly placeholder="识别平台后将在此生成推荐命令，可一键复制"></textarea>
            <button id="copyCmdBtn" class="btn" type="button">
              复制命令
            </button>
          </div>
          <small id="commandHint"></small>
        </div>

        <div class="footer">
          <span class="pill">
            <strong>支持平台</strong>
            <span>GitHub / GitLab / Gitea / Codeberg / Docker Hub / GHCR / Hugging Face / npm / PyPI / conda / Maven / Debian / Ubuntu 等</span>
          </span>
          <span>
            基于 <a href="https://github.com/xixu-me/Xget" target="_blank" rel="noreferrer">Xget</a> URL 规则 · by <a href="https://hxorz.cn" target="_blank" rel="noopener">hxorz</a>
          </span>
        </div>
      </section>

      <!-- Docker 换源说明 -->
      <section class="docker-card">
        <h3>
          Docker 镜像加速配置
          <span class="badge">推荐</span>
        </h3>
        <p>
          将您的 Docker 源改为以下配置，即可使用 hxorz.cn 提供的 Docker 镜像加速服务。修改后需要重启 Docker 服务才能生效。
        </p>
        <p>
          项目地址：<a href="https://github.com/inwpu/dockerproxy" target="_blank" rel="noreferrer">https://github.com/inwpu/dockerproxy</a>
        </p>

        <div class="code-block">
          <pre>{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}</pre>
        </div>

        <div class="distro-section">
          <h4>常见 Linux 发行版配置方法</h4>
          <div class="distro-tabs">
            <button class="distro-tab active" data-distro="ubuntu">Ubuntu/Debian</button>
            <button class="distro-tab" data-distro="centos">CentOS/RHEL</button>
            <button class="distro-tab" data-distro="arch">Arch Linux</button>
            <button class="distro-tab" data-distro="fedora">Fedora</button>
            <button class="distro-tab" data-distro="opensuse">openSUSE</button>
          </div>

          <div class="distro-content active" data-distro="ubuntu">
            <div class="code-block">
              <pre># 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"</pre>
            </div>
          </div>

          <div class="distro-content" data-distro="centos">
            <div class="code-block">
              <pre># 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"</pre>
            </div>
          </div>

          <div class="distro-content" data-distro="arch">
            <div class="code-block">
              <pre># 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"</pre>
            </div>
          </div>

          <div class="distro-content" data-distro="fedora">
            <div class="code-block">
              <pre># 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"</pre>
            </div>
          </div>

          <div class="distro-content" data-distro="opensuse">
            <div class="code-block">
              <pre># 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info | grep -A 5 "Registry Mirrors"</pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- 悬浮访问信息窗 -->
  <div class="info-panel" id="infoPanel">
    <div class="info-title">
      <span>访问信息</span>
      <span id="statVisitTime"></span>
    </div>
    <ul class="info-list">
      <li><span class="info-key">当前 IP：</span><span id="statIP">检测中...</span></li>
      <li><span class="info-key">浏览器指纹：</span><span id="statUA">-</span></li>
      <li><span class="info-key">分辨率：</span><span id="statScreen">-</span></li>
      <li><span class="info-key">时区：</span><span id="statTimezone">-</span></li>
      <li id="busuanzi_container_site_pv"><span class="info-key">本站总访问量：</span><span id="busuanzi_value_site_pv">加载中...</span></li>
      <li id="busuanzi_container_site_uv"><span class="info-key">本站访客数：</span><span id="busuanzi_value_site_uv">加载中...</span></li>
      <li id="busuanzi_container_page_pv"><span class="info-key">本页访问量：</span><span id="busuanzi_value_page_pv">加载中...</span></li>
    </ul>
  </div>
  <button class="info-toggle" id="infoToggle">访问信息</button>

  <script>
    // === 粒子动画背景（支持鼠标交互） ===
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouse = { x: null, y: null, radius: 200 };

    canvas.style.pointerEvents = 'auto';

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // 鼠标事件监听
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.hue = Math.random() * 60 + 120; // 绿色到青色
        this.density = (Math.random() * 40) + 5;
      }

      update() {
        // 鼠标交互
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 20;
            }
          }
        }

        // 基础移动
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;

        // 缓慢回归
        if (mouse.x == null) {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${this.hue}, 70%, 60%, \${this.opacity})\`;
        ctx.fill();

        // 添加发光效果
        ctx.shadowBlur = 15;
        ctx.shadowColor = \`hsla(\${this.hue}, 70%, 60%, 0.5)\`;
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = \`rgba(34, 197, 94, \${opacity})\`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // 鼠标与粒子连线
        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const opacity = (1 - dist / mouse.radius) * 0.8;
            ctx.beginPath();
            ctx.strokeStyle = \`rgba(56, 189, 248, \${opacity})\`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      connectParticles();
      animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // === 平台规则 ===
    const PLATFORMS = [
      { id: "docker",  name: "Docker 镜像",      prefix: "",       match: ["docker.io", "registry-1.docker.io", "ghcr.io", "quay.io"] },
      { id: "github",  name: "GitHub",          prefix: "gh",     match: ["github.com"] },
      { id: "gist",    name: "GitHub Gist",     prefix: "gist",   match: ["gist.github.com"] },
      { id: "gitlab",  name: "GitLab",          prefix: "gl",     match: ["gitlab.com"] },
      { id: "gitea",   name: "Gitea",           prefix: "gitea",  match: ["gitea.com"] },
      { id: "codeberg",name: "Codeberg",        prefix: "codeberg",match:["codeberg.org"] },
      { id: "sf",      name: "SourceForge",     prefix: "sf",     match: ["sourceforge.net"] },
      { id: "aosp",    name: "AOSP",            prefix: "aosp",   match: ["android.googlesource.com"] },
      { id: "hf",      name: "Hugging Face",    prefix: "hf",     match: ["huggingface.co"] },
      { id: "civitai", name: "Civitai",         prefix: "civitai",match: ["civitai.com"] },
      { id: "npm",     name: "npm",             prefix: "npm",    match: ["registry.npmjs.org"] },
      { id: "pypi",    name: "PyPI",            prefix: "pypi",   match: ["pypi.org"] },
      { id: "conda",   name: "conda",           prefix: "conda",  match: ["repo.anaconda.com", "conda.anaconda.org"] },
      { id: "maven",   name: "Maven",           prefix: "maven",  match: ["repo1.maven.org"] },
      { id: "apache",  name: "Apache",          prefix: "apache", match: ["downloads.apache.org"] },
      { id: "gradle",  name: "Gradle",          prefix: "gradle", match: ["plugins.gradle.org"] },
      { id: "homebrew",name: "Homebrew",        prefix: "homebrew",match:["github.com/Homebrew"] },
      { id: "rubygems",name: "RubyGems",        prefix: "rubygems",match:["rubygems.org"] },
      { id: "cran",    name: "CRAN",            prefix: "cran",   match: ["cran.r-project.org"] },
      { id: "cpan",    name: "CPAN",            prefix: "cpan",   match: ["www.cpan.org"] },
      { id: "ctan",    name: "CTAN",            prefix: "ctan",   match: ["tug.ctan.org"] },
      { id: "golang",  name: "Go 模块",         prefix: "golang", match: ["proxy.golang.org"] },
      { id: "nuget",   name: "NuGet",           prefix: "nuget",  match: ["api.nuget.org"] },
      { id: "crates",  name: "Rust Crates",     prefix: "crates", match: ["crates.io"] },
      { id: "packagist",name:"Packagist",       prefix: "packagist",match:["repo.packagist.org"] },
      { id: "debian",  name: "Debian",          prefix: "debian", match: ["deb.debian.org"] },
      { id: "ubuntu",  name: "Ubuntu",          prefix: "ubuntu", match: ["archive.ubuntu.com"] },
      { id: "fedora",  name: "Fedora",          prefix: "fedora", match: ["dl.fedoraproject.org"] },
      { id: "rocky",   name: "Rocky Linux",     prefix: "rocky",  match: ["download.rockylinux.org"] },
      { id: "opensuse",name:"openSUSE",         prefix: "opensuse",match:["download.opensuse.org"] },
      { id: "arch",    name: "Arch Linux",      prefix: "arch",   match: ["geo.mirror.pkgbuild.com"] },
      { id: "arxiv",   name: "arXiv",           prefix: "arxiv",  match: ["arxiv.org"] },
      { id: "fdroid",  name: "F-Droid",         prefix: "fdroid", match: ["f-droid.org"] },
      { id: "jenkins", name: "Jenkins 插件",    prefix: "jenkins",match: ["updates.jenkins.io"] }
    ];

    const instanceInput = document.getElementById("instanceUrl");
    const originalInput = document.getElementById("originalUrl");
    const convertedInput = document.getElementById("convertedUrl");
    const copyBtn = document.getElementById("copyBtn");
    const statusEl = document.getElementById("status");
    const cmdOutput = document.getElementById("commandText");
    const cmdCopyBtn = document.getElementById("copyCmdBtn");
    const cmdHint = document.getElementById("commandHint");

    function normalizeInstanceUrl(url) {
      if (!url) return "";
      url = url.trim();
      if (!/^https?:\\/\\//i.test(url)) {
        url = "https://" + url;
      }
      return url.replace(/\\/+/g, "/").replace(/\\/+$/, "");
    }

    function detectPlatform(u, raw) {
      const host = u.host.toLowerCase();
      const href = u.href.toLowerCase();
      for (const p of PLATFORMS) {
        if (p.match.some(m => host.includes(m) || href.includes(m.toLowerCase()))) {
          return p;
        }
      }
      const rawLower = (raw || "").toLowerCase();
      if (rawLower.includes("docker")) {
        return { id: "docker", name: "Docker 镜像", prefix: "", match: [] };
      }
      return null;
    }

    function buildCommands(platform, url) {
      if (!platform || !url) return "";
      const cmds = [];
      if (platform.id === "docker") {
        const noScheme = url.replace(/^https?:\\/\\//i, "");
        cmds.push("# Docker 拉取镜像");
        cmds.push("docker pull " + noScheme);
        cmds.push("");
        cmds.push("# 查看镜像信息");
        cmds.push("docker images " + noScheme.split('/').pop().split(':')[0]);
        cmds.push("");
        cmds.push("# 运行容器（交互式）");
        cmds.push("docker run -it --rm " + noScheme);
        cmds.push("");
        cmds.push("# 运行容器（后台模式）");
        cmds.push("docker run -d --name mycontainer " + noScheme);
        cmds.push("");
        cmds.push("# 使用 docker-compose（需自行创建 docker-compose.yml）");
        cmds.push("docker-compose pull && docker-compose up -d");
      } else if (["github","gist","gitlab","gitea","codeberg","sf","aosp","homebrew"].includes(platform.id)) {
        cmds.push("# Git 克隆仓库");
        cmds.push("git clone " + url);
        cmds.push("");
        cmds.push("# Git 克隆仓库（浅克隆，速度更快）");
        cmds.push("git clone --depth 1 " + url);
        cmds.push("");
        cmds.push("# Git 克隆仓库（包含子模块）");
        cmds.push("git clone --recursive " + url);
        cmds.push("");
        cmds.push("# 下载为 ZIP 压缩包");
        cmds.push("curl -L '" + url + "/archive/refs/heads/main.zip' -o repo.zip");
        cmds.push("");
        cmds.push("# 下载特定分支");
        cmds.push("git clone -b <branch_name> " + url);
      } else if (platform.id === "npm") {
        cmds.push("# npm 安装包");
        cmds.push("npm install <package_name>");
        cmds.push("");
        cmds.push("# 设置 npm 镜像源（临时）");
        cmds.push("npm install <package_name> --registry=" + url);
        cmds.push("");
        cmds.push("# 设置 npm 镜像源（全局）");
        cmds.push("npm config set registry " + url);
        cmds.push("");
        cmds.push("# 查看当前镜像源");
        cmds.push("npm config get registry");
        cmds.push("");
        cmds.push("# 使用 yarn");
        cmds.push("yarn add <package_name>");
        cmds.push("");
        cmds.push("# 使用 pnpm");
        cmds.push("pnpm add <package_name>");
      } else if (platform.id === "pypi") {
        cmds.push("# pip 安装包");
        cmds.push("pip install <package_name> -i " + url + "/simple");
        cmds.push("");
        cmds.push("# pip 安装包（信任主机）");
        cmds.push("pip install <package_name> -i " + url + "/simple --trusted-host " + new URL(url).host);
        cmds.push("");
        cmds.push("# 设置全局镜像源");
        cmds.push("pip config set global.index-url " + url + "/simple");
        cmds.push("");
        cmds.push("# 安装 requirements.txt");
        cmds.push("pip install -r requirements.txt -i " + url + "/simple");
        cmds.push("");
        cmds.push("# 使用 pip3");
        cmds.push("pip3 install <package_name> -i " + url + "/simple");
      } else if (platform.id === "hf") {
        cmds.push("# 下载文件");
        cmds.push("curl -L '" + url + "' -o model.bin");
        cmds.push("");
        cmds.push("# 使用 wget 下载");
        cmds.push("wget '" + url + "'");
        cmds.push("");
        cmds.push("# 使用 huggingface-cli 下载（需安装 huggingface_hub）");
        cmds.push("huggingface-cli download <repo_id> --local-dir ./models");
        cmds.push("");
        cmds.push("# Git LFS 克隆模型仓库");
        cmds.push("git lfs install && git clone " + url);
        cmds.push("");
        cmds.push("# 设置 HF 镜像端点");
        cmds.push("export HF_ENDPOINT=" + url.replace(/\\/[^/]*$/, ''));
      } else if (platform.id === "golang") {
        cmds.push("# Go 获取模块");
        cmds.push("go get <module_path>");
        cmds.push("");
        cmds.push("# 设置 GOPROXY");
        cmds.push("go env -w GOPROXY=" + url + ",direct");
        cmds.push("");
        cmds.push("# 查看当前 GOPROXY");
        cmds.push("go env GOPROXY");
        cmds.push("");
        cmds.push("# 清理模块缓存");
        cmds.push("go clean -modcache");
      } else if (platform.id === "maven") {
        cmds.push("# Maven 构建（需配置 settings.xml）");
        cmds.push("mvn clean install");
        cmds.push("");
        cmds.push("# 下载依赖");
        cmds.push("mvn dependency:resolve");
        cmds.push("");
        cmds.push("# settings.xml 镜像配置示例");
        cmds.push("# <mirror>");
        cmds.push("#   <id>hxorz</id>");
        cmds.push("#   <mirrorOf>central</mirrorOf>");
        cmds.push("#   <url>" + url + "</url>");
        cmds.push("# </mirror>");
      } else if (platform.id === "conda") {
        cmds.push("# Conda 安装包");
        cmds.push("conda install <package_name>");
        cmds.push("");
        cmds.push("# 添加镜像源");
        cmds.push("conda config --add channels " + url);
        cmds.push("");
        cmds.push("# 查看当前源");
        cmds.push("conda config --show channels");
        cmds.push("");
        cmds.push("# 创建新环境");
        cmds.push("conda create -n myenv python=3.10");
      } else if (platform.id === "crates") {
        cmds.push("# Cargo 安装");
        cmds.push("cargo install <crate_name>");
        cmds.push("");
        cmds.push("# 配置镜像源（编辑 ~/.cargo/config）");
        cmds.push("[source.crates-io]");
        cmds.push("replace-with = 'mirror'");
        cmds.push("[source.mirror]");
        cmds.push("registry = '" + url + "'");
      } else {
        cmds.push("# 下载文件");
        cmds.push("curl -L '" + url + "' -o filename");
        cmds.push("");
        cmds.push("# 使用 wget 下载");
        cmds.push("wget '" + url + "'");
        cmds.push("");
        cmds.push("# 下载并解压");
        cmds.push("curl -L '" + url + "' | tar -xz");
        cmds.push("");
        cmds.push("# 断点续传");
        cmds.push("wget -c '" + url + "'");
        cmds.push("");
        cmds.push("# 使用 aria2 多线程下载");
        cmds.push("aria2c -x 16 '" + url + "'");
      }
      return cmds.join("\\n");
    }

    function convert() {
      const rawInstance = instanceInput.value;
      const rawUrl = originalInput.value.trim();

      statusEl.textContent = "";
      statusEl.className = "status";
      cmdOutput.value = "";
      cmdHint.textContent = "";

      if (!rawUrl) {
        convertedInput.value = "";
        return;
      }

      let u;
      try {
        u = new URL(rawUrl);
      } catch (e) {
        statusEl.textContent = "原始 URL 无法解析，请检查是否粘贴完整。";
        statusEl.classList.add("err");
        convertedInput.value = "";
        return;
      }

      let platform = detectPlatform(u, rawUrl);
      if (!platform) {
        statusEl.textContent = "暂未识别到支持的平台（GitHub / Docker Hub / Hugging Face / npm / PyPI 等）。";
        statusEl.classList.add("err");
        convertedInput.value = "";
        return;
      }

      let effectiveInstance = normalizeInstanceUrl(rawInstance);
      let result = "";
      const path = u.pathname || "/";
      const query = u.search || "";
      const hash = u.hash || "";

      if (platform.id === "docker") {
        effectiveInstance = "https://hub.hxorz.cn";
        result = effectiveInstance + path + query + hash;
        statusEl.textContent = "已识别平台：Docker 镜像，已自动切换加速域名为 hub.hxorz.cn ✅";
      } else {
        if (!effectiveInstance) {
          statusEl.textContent = "请先填写 Xget 实例地址，例如：https://hxorz.cn";
          statusEl.classList.add("err");
          convertedInput.value = "";
          return;
        }
        result = effectiveInstance + "/" + platform.prefix + path + query + hash;
        statusEl.textContent = "已识别平台：" + platform.name + "，转换成功 ✅";
      }

      convertedInput.value = result;
      statusEl.classList.add("ok");

      const cmdText = buildCommands(platform, result);
      cmdOutput.value = cmdText;
      if (cmdText) {
        cmdHint.textContent = "已为 " + platform.name + " 生成推荐命令，可直接复制到终端执行（按需修改）。";
        // 自动调整文本框高度
        cmdOutput.style.height = 'auto';
        cmdOutput.style.height = cmdOutput.scrollHeight + 'px';
      } else {
        cmdOutput.style.height = '80px';
      }
    }

    originalInput.addEventListener("input", () => {
      clearTimeout(window.__xgetTimer);
      window.__xgetTimer = setTimeout(convert, 120);
    });

    instanceInput.addEventListener("input", () => {
      clearTimeout(window.__xgetTimer);
      window.__xgetTimer = setTimeout(convert, 120);
    });

    copyBtn.addEventListener("click", async () => {
      const text = convertedInput.value.trim();
      if (!text) {
        statusEl.textContent = "暂无转换结果可复制。";
        statusEl.className = "status err";
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        statusEl.textContent = "已复制加速链接。";
        statusEl.className = "status ok";
      } catch (e) {
        convertedInput.select();
        document.execCommand("copy");
        statusEl.textContent = "已尝试复制，请手动确认。";
        statusEl.className = "status ok";
      }
    });

    cmdCopyBtn.addEventListener("click", async () => {
      const text = cmdOutput.value.trim();
      if (!text) {
        statusEl.textContent = "暂无推荐命令可复制。";
        statusEl.className = "status err";
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        statusEl.textContent = "已复制推荐命令。";
        statusEl.className = "status ok";
      } catch (e) {
        cmdOutput.select();
        document.execCommand("copy");
        statusEl.textContent = "已尝试复制命令，请手动确认。";
        statusEl.className = "status ok";
      }
    });

    // === 打字机效果 ===
    const typewriterText = document.getElementById('typewriterText');

    const securityKnowledge = [
  "在现代网络空间安全体系中，密码算法不仅要求数学安全性，还必须确保实现过程无显著侧信道泄漏，因为即便 AES 或 RSA 本身安全，若密钥调度、S盒查找或模幂操作在缓存访问上产生规律，也可能被攻击者通过时间测量或功耗分析恢复密钥。",
  
  "芯片安全的硅前验证侧重在 RTL 与门级设计阶段，通过形式化验证、符号执行、等价性检查和信息流追踪及时发现硬件设计中可能引入的权限绕过路径、后门触发条件与敏感信号泄露，而这些问题若进入硅后阶段将难以修补。",
  
  "在硅后安全验证阶段，工程师会结合功耗分析、时钟毛刺、电压注入、EM 旁道与激光故障注入等物理攻击手段，对实际芯片进行安全评估；只有在真实物理条件下才能检验芯片是否能抵抗高阶侧信道攻击与故障诱导。",
  
  "硬件安全仿真常使用 Verilator 或商业 EDA 工具将 RTL 转换为高性能 C++ 仿真器，通过插桩技术监控信号传递路径与内部寄存器状态，从而帮助研究人员评估硬件木马触发条件、秘密寄存器泄露点以及敏感数据在多周期操作中的传播行为。",
  
  "密码学中常见的同态加密、零知识证明与多方安全计算虽然具有极强的隐私保护能力，但在硬件上实现这些算法时需要特别注意控制流一致性与内存访问模式，以避免因实现漏洞导致计算泄露隐私数据或被推测中间值。",
  
  "可信执行环境（如 ARM TrustZone、Intel SGX）提供了隔离的敏感代码运行区，但如果 SoC 总线缺乏完整的访问权限检查，恶意外设仍可能通过 DMA 从受保护内存窃取数据，因此总线仲裁器与内存控制器的权限验证逻辑至关重要。",
  
  "在大规模 SoC 中，AXI、APB、AHB 等总线协议的安全性直接影响整个系统的隔离能力；攻击者若能伪造总线事务、提升事务优先级或构造非法突发访问模式，就可能绕过访问控制逻辑，因此需要在 RTL 层加入事务级安全断言。",
  
  "PUF（物理不可克隆函数）可为芯片提供唯一且不可复制的密钥，但在实际部署中需要进行稳定性增强处理，例如使用模糊提取器、纠错码和稳定挑战集，否则环境变化可能导致密钥重构失败，使安全启动过程不可靠。",
  
  "硬件木马检测不仅需要静态结构分析，还需要基于仿真的动态行为分析；例如对比正常路径与可疑触发路径的状态覆盖率，结合符号执行探索低概率触发条件，以捕获那些隐藏在深层逻辑中的后门激活信号。",
  
  "在加密 IP 核的硅前验证中，常通过信息流静态分析（GLIFT/RTLIFT）追踪密钥位如何在组合与时序逻辑中传播，以确保不会经由调试接口、测试模式、冗余寄存器或日志模块意外泄露，加密 IP 供应链也必须具有可验证性。",
  
  "芯片设计中的 DFT（可测试性设计）结构如 Scan Chain 若未进行加密或锁定，攻击者可以通过扫描链读出寄存器值，甚至提取 AES 轮密钥；因此安全设计中必须加入 Scan Chain 保护，例如锁住扫描链或进行安全扫描模式切换。",
  
  "在网络安全体系中，侧信道攻击常被误解为仅与硬件有关，但实际上 TLS、VPN、密码库等软件若在执行序列、缓存访问或内存分配上表现出数据相关性，也同样会遭受缓存侧信道攻击，因此现代密码库必须采用常数时间实现。",
  
  "在 FPGA 上实现加密算法时，由于可重构逻辑的物理布局可被推测，因此功耗轨迹往往更加一致，容易遭受差分功耗分析；为了提高安全性，需要采用随机掩码、随机时钟、平衡电路或双轨对称逻辑降低可观察度。",
  
  "硅前形式化验证不仅用于验证功能正确性，也可用于验证安全属性，例如证明“密钥不会从非可信端口泄露”、“调试接口在量产模式下始终关闭”与“权限位被篡改后不会提升访问能力”，这些验证依赖 SAT/SMT 求解器和时序属性模型。",
  
  "TrustZone 的安全依赖于 Monitor 模式切换与内存访问权限的严格配置，但若 Bootloader 未正确锁定 TZASC（TrustZone Address Space Controller），攻击者可以在早期引导阶段劫持控制权并访问安全世界内存，从而破坏整个根信任链。",
  
  "芯片安全仿真中常用并行化符号执行技术探索大规模 RTL 状态空间，通过将输入信号符号化，可以自动生成触发边界条件、稀有状态和异常访问模式的激励信号，从而发现普通测试激励难以触达的深层安全漏洞。",
  
  "在 SoC 设计中，片上网络（NoC）成为新的攻击面；如果路由器缺乏安全路由策略，恶意 IP 可以注入伪造数据包、劫持流量路径或造成拒绝服务，因此必须在 NoC 层加入身份认证、带宽隔离和流量监测机制。",
  
  "硅前安全验证常通过 Assertion-Based Verification（ABV）定义关键安全属性，如“密钥寄存器在状态切换后必须被清零”、“非法事务不得更新配置寄存器”、“调试模式仅在加密认证后允许开启”，这些属性依赖 PSL/SVA 等时序语言表达。",
  
  "故障注入仿真可以在 RTL 级别模拟比特翻转、时序错误、寄存器软错误等情况，用于验证加密模块是否能正确检测和修复错误；如果 AES、RSA 或 ECC 实现缺乏故障检测，攻击者可利用故障注入恢复密钥或生成伪造签名。",
  
  "在密码 IP 的供应链安全中，非法修改第三方加密 IP 是重大风险；通过 RTL 指纹、结构化哈希、等价性检查和行为熵分析可以验证接收到的 IP 是否被篡改，避免木马通过供应链渗入安全关键芯片中。",
  
  "在硅后侧信道分析中，攻击者会捕获芯片在执行加密操作时的功耗波形或电磁辐射特征，利用相关性功耗分析（CPA）或模板攻击等方法推断密钥，因此安全芯片需采用掩码、抖动、功耗平衡等手段降低泄漏强度。",
  
  "片上调试接口如 JTAG、SWD 若在量产模式下仍可访问，会为攻击者提供读取内部 RAM、寄存器或固件的能力，因此安全设计中必须添加 JTAG 锁、密码挑战或调试熔断机制，以确保调试功能不会成为绕过 Secure Boot 的入口。",
  
  "在硬件木马防御中，稀有事件激励（Rare Trigger Activation）是关键技术，通过符号执行、稀有节点枚举以及仿真覆盖率引导，能够主动寻找那些“只有特定输入序列才能触发”的隐藏逻辑，从而更有效地定位深藏木马。",
  
  "信息流安全验证（Information Flow Tracking）能够分析密钥、随机数、访问控制信号等敏感数据是否在逻辑电路中以非预期方式传播；如果密钥位以组合电路泄露到未授权端口，将被视为严重安全缺陷，必须在 RTL 级别修复。",
  
  "硬件安全不仅关注算法，也关注物理实现，例如 AES 的查表实现（T-table）容易暴露密钥相关的缓存访问模式，而基于位切片（bit-slicing）或常数时间 S盒的实现方式则显著降低缓存式侧信道风险，是现代密码实现的最佳实践。",
  
  // ===== 机器学习 / 深度学习 / 强化学习 结合安全与芯片验证 =====
  
  "在网络空间安全领域，机器学习最常见的应用之一是入侵检测与流量分类，利用监督学习模型从海量网络流量中自动学习恶意模式，但如果训练数据分布与真实环境差异过大，模型容易出现高误报或被对抗样本绕过，因此需要持续更新与在线学习机制。",
  
  "深度学习在侧信道分析中被证明具有强大能力，攻击者可以将芯片功耗或电磁波形视为时间序列或二维“图像”，训练卷积神经网络（CNN）或循环神经网络（RNN）直接从原始轨迹中恢复密钥，大幅减少对手工特征工程的依赖，也迫使防御方重新审视随机掩码的有效性。",
  
  "在硬件木马检测中，研究人员常利用机器学习对电路结构图进行建模，例如将门级网表转换为图结构，使用图神经网络（GNN）自动学习“正常电路”和“可疑逻辑”的差异；配合 TrustHub 等公开数据集，可以训练出对未知木马具有一定泛化能力的检测器。",
  
  "针对 SoC 设计的硅前验证，强化学习可以用来引导测试激励和符号执行的路径选择策略：将每次探索新的可疑状态或触发潜在安全断言视为正奖励，模型通过不断交互学习出更高效的搜索策略，缓解传统 DFS/BFS 在巨大状态空间中路径爆炸的问题。",
  
  "在模糊测试（Fuzzing）与符号执行结合的混合验证框架中，强化学习可以根据覆盖率增量、断言触发情况和路径新颖度动态调整输入变异策略与种子队列调度策略，从而在有限时间内优先探索更可能触发安全漏洞的路径，提升验证效率。",
  
  "面向片上网络（NoC）的安全监测中，可通过深度学习对网络流量进行时间序列建模：例如使用 LSTM、Transformer 或变分自编码器（VAE）学习正常通信的时序模式，一旦检测到明显偏离（如异常突发流量、持续探测行为或恶意拥塞），即可触发告警并进行流量隔离。",
  
  "在加密算法硬件实现的侧信道防护评估中，研究者可以利用生成对抗网络（GAN）模拟攻击者视角，生成更复杂、更难防御的功耗或电磁攻击样本，并反过来用这些样本来训练和加固防护机制，从而形成类似“攻防对抗训练”的闭环优化。",
  
  "深度学习在恶意软件分类和流量识别中广泛使用，但模型本身也面临对抗样本威胁：攻击者通过对输入添加精心构造的微小扰动，使得模型将恶意行为误判为正常；因此在安全域部署 ML 模型时必须考虑鲁棒性验证和对抗训练，而不仅仅追求精度指标。",
  
  "随着 AI 加速器与神经网络处理单元（NPU）在数据中心和终端设备中普及，这些专用芯片本身也成为安全研究对象；其微架构优化（如稀疏计算、片上缓存、权重量化）可能暴露新的侧信道载体，需要在设计阶段评估是否会泄露模型参数或用户输入。",
  
  "在智能网联设备与边缘计算场景中，联邦学习被用来在不集中数据的前提下训练全局模型，但如果参与方恶意上传带偏见的梯度更新，就可能发起模型投毒攻击；为此需要在联邦学习框架中引入鲁棒聚合、异常检测和参与方信誉评估机制。",
  
  "在芯片安全验证的流程管理中，机器学习还可以辅助分析大规模仿真和验证日志，例如自动聚类失败用例、从失败轨迹中提取共性模式、预测哪些模块更可能存在安全缺陷，从而帮助验证工程师更有针对性地分配计算资源和人工审查精力。",
  
  "针对硬件实现的密码算法，研究者可以利用强化学习来自动搜索最“危险”的故障注入时刻与位置，将注入成效（如是否破坏校验、是否泄露中间值）作为奖励信号，逐步学习出比人工经验更高效的故障攻击策略，反过来帮助设计更稳健的防护机制。",
  
  "在静态代码与 RTL 安全审计中，传统基于规则的检测方法往往难以覆盖复杂语境，因而越来越多研究尝试将源代码、HDL 或中间表示转换为图结构或序列表示，结合 Transformer、GNN 等深度模型自动学习漏洞模式，为大规模安全审计和补丁推荐提供辅助。",
  
  "当机器学习被用于密钥管理、访问控制和异常检测等安全关键决策时，需要引入“可解释性安全”的概念：不仅要知道模型给出“允许/拒绝/告警”的结果，还要能够追踪其依据的特征与路径，以便在面对攻击或误判时进行审计和可信追责。"
];


    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function typeWriter() {
      const currentText = securityKnowledge[currentIndex];

      if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // 完成后暂停
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % securityKnowledge.length;
        typingSpeed = 500; // 切换前暂停
      }

      setTimeout(typeWriter, typingSpeed);
    }

    // 启动打字机效果
    typeWriter();

    // === Docker 发行版切换 ===
    const distroTabs = document.querySelectorAll('.distro-tab');
    const distroContents = document.querySelectorAll('.distro-content');

    distroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const distro = tab.dataset.distro;

        distroTabs.forEach(t => t.classList.remove('active'));
        distroContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.querySelector(\`.distro-content[data-distro="\${distro}"]\`).classList.add('active');
      });
    });

    // === 悬浮访问信息窗 ===
    const infoPanel = document.getElementById("infoPanel");
    const infoToggle = document.getElementById("infoToggle");

    function pad(n) {
      return n.toString().padStart(2, "0");
    }

    function initVisitorInfo() {
      const now = new Date();
      const visitTimeStr =
        now.getFullYear() + "/" +
        pad(now.getMonth() + 1) + "/" +
        pad(now.getDate()) + " " +
        pad(now.getHours()) + ":" +
        pad(now.getMinutes()) + ":" +
        pad(now.getSeconds());
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "-");
      const screenInfo = window.screen
        ? window.screen.width + " × " + window.screen.height
        : "-";

      document.getElementById("statVisitTime").textContent = visitTimeStr;
      document.getElementById("statTimezone").textContent = tz;
      document.getElementById("statScreen").textContent = screenInfo;
      document.getElementById("statUA").textContent =
        navigator.userAgent || "Unknown";

      fetch("https://api.ipify.org?format=json")
        .then(r => r.json())
        .then(data => {
          document.getElementById("statIP").textContent = data.ip || "-";
        })
        .catch(() => {
          document.getElementById("statIP").textContent = "获取失败";
        });

      setTimeout(() => {
        if (infoPanel) infoPanel.classList.add("hidden");
        if (infoToggle) infoToggle.classList.add("visible");
      }, 10000);
    }

    if (infoToggle && infoPanel) {
      infoToggle.addEventListener("click", () => {
        infoPanel.classList.remove("hidden");
        infoToggle.classList.remove("visible");
        setTimeout(() => {
          infoPanel.classList.add("hidden");
          infoToggle.classList.add("visible");
        }, 10000);
      });
    }

    // 初始化
    convert();
    initVisitorInfo();

    // === busuanzi ===
    (function initBusuanzi() {
      if (location.hostname === "url.hxorz.cn") {
        var s = document.createElement("script");
        s.async = true;
        s.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
        document.body.appendChild(s);
      } else {
        var ids = [
          "busuanzi_container_site_pv",
          "busuanzi_container_site_uv",
          "busuanzi_container_page_pv"
        ];
        ids.forEach(function(id) {
          var el = document.getElementById(id);
          if (el) {
            el.style.display = "none";
          }
        });
      }
    })();
  </script>
</body>
</html>`;
