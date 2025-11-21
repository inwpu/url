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
      padding: 20px 16px 36px;
    }
    .main {
      width: 100%;
      max-width: 1200px;
    }

    .header {
      margin-bottom: 20px;
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

    /* 罗盘时钟容器 */
    .compass-clock-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      padding: 20px;
    }

    .compass-clock {
      position: relative;
      width: min(90vw, 700px);
      height: min(90vw, 700px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .clock-ring {
      position: absolute;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .clock-item {
      position: absolute;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      transform-origin: center;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
    }

    .clock-item.active {
      color: #22c55e;
      font-weight: 700;
      text-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.4);
      transform: scale(1.3);
    }

    .clock-item.rotating {
      animation: itemRotate 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes itemRotate {
      0% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.5) rotate(90deg); }
      50% { transform: scale(1.2) rotate(180deg); }
      75% { transform: scale(1.4) rotate(270deg); }
      100% { transform: scale(1.3) rotate(360deg); }
    }

    /* 中心信息显示 */
    .clock-center {
      position: absolute;
      text-align: center;
      z-index: 10;
    }

    .clock-center-text {
      font-size: 16px;
      color: #e5e7eb;
      line-height: 1.8;
    }

    .clock-center-text span {
      display: inline-block;
      margin: 0 8px;
      padding: 4px 12px;
      background: rgba(34, 197, 94, 0.2);
      border-radius: 8px;
      border: 1px solid rgba(34, 197, 94, 0.5);
    }

    /* 粒子爆炸效果 */
    .burst-particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      pointer-events: none;
      animation: burst 0.8s ease-out forwards;
    }

    @keyframes burst {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
    }

    /* URL 转换卡片 */
    .card {
      width: 100%;
      background: rgba(15, 23, 42, 0.96);
      border-radius: 20px;
      padding: 20px 20px 18px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.35);
      backdrop-filter: blur(14px);
      margin-bottom: 20px;
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
      border: 1px solid rgba(148, 163, 184, 0.6);
      background: rgba(15, 23, 42, 0.9);
      color: #e5e7eb;
      padding: 9px 11px;
      font-size: 13px;
      outline: none;
      transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
    }
    input:focus, textarea:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.95);
    }
    textarea {
      min-height: 64px;
      resize: vertical;
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
      transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.1s ease;
    }
    .btn:hover {
      filter: brightness(1.05);
      box-shadow: 0 10px 18px rgba(34, 197, 94, 0.35);
      transform: translateY(-1px);
    }
    .btn:active {
      box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);
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
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.35);
      backdrop-filter: blur(14px);
      margin-bottom: 20px;
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
      border: 1px solid rgba(148, 163, 184, 0.5);
      background: rgba(15, 23, 42, 0.9);
      color: #9ca3af;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .distro-tab:hover {
      border-color: #38bdf8;
      color: #e5e7eb;
    }

    .distro-tab.active {
      background: linear-gradient(135deg, #22c55e, #06b6d4);
      color: #fff;
      border-color: transparent;
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

      <!-- 罗盘时钟 -->
      <section class="compass-clock-section">
        <div class="compass-clock" id="compassClock">
          <div class="clock-center">
            <div class="clock-center-text" id="clockCenterText"></div>
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
    // === 粒子动画背景 ===
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 60 + 120; // 绿色到青色
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${this.hue}, 70%, 60%, \${this.opacity})\`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000));
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

          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = \`rgba(34, 197, 94, \${opacity})\`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
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
        cmds.push("# Docker 拉取镜像（如有私有仓库登录等，请自行补充）");
        cmds.push("docker pull " + noScheme);
      } else if (["github","gist","gitlab","gitea","codeberg","sf","aosp","homebrew"].includes(platform.id)) {
        cmds.push("# Git 克隆仓库");
        cmds.push("git clone " + url);
      } else {
        cmds.push("# 下载文件");
        cmds.push("curl -L '" + url + "'");
        cmds.push("wget '" + url + "'");
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

    // === 罗盘时钟 ===
    const compassClock = document.getElementById('compassClock');
    const clockCenterText = document.getElementById('clockCenterText');

    // 中文数字
    const chineseMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const chineseDays = [];
    for (let i = 1; i <= 31; i++) {
      if (i <= 10) chineseDays.push(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][i-1] + '号');
      else if (i < 20) chineseDays.push('十' + ['一', '二', '三', '四', '五', '六', '七', '八', '九'][i-11] + '号');
      else if (i === 20) chineseDays.push('二十号');
      else if (i < 30) chineseDays.push('二十' + ['一', '二', '三', '四', '五', '六', '七', '八', '九'][i-21] + '号');
      else if (i === 30) chineseDays.push('三十号');
      else chineseDays.push('三十一号');
    }
    const chineseWeekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const chineseHours = [];
    for (let i = 0; i < 24; i++) {
      if (i === 0) chineseHours.push('零点');
      else if (i <= 10) chineseHours.push(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][i-1] + '点');
      else if (i < 20) chineseHours.push('十' + (i === 10 ? '' : ['一', '二', '三', '四', '五', '六', '七', '八', '九'][i-11]) + '点');
      else if (i === 20) chineseHours.push('二十点');
      else chineseHours.push('二十' + ['一', '二', '三'][i-21] + '点');
    }
    const chineseMinutes = [];
    const chineseSeconds = [];
    for (let i = 0; i < 60; i++) {
      let str = '';
      if (i === 0) str = '零';
      else if (i <= 10) str = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][i-1];
      else if (i < 20) str = '十' + ['一', '二', '三', '四', '五', '六', '七', '八', '九'][i-11];
      else if (i % 10 === 0) str = ['二十', '三十', '四十', '五十'][i/10-2];
      else str = ['二十', '三十', '四十', '五十'][Math.floor(i/10)-2] + ['一', '二', '三', '四', '五', '六', '七', '八', '九'][i%10-1];
      chineseMinutes.push(str + '分');
      chineseSeconds.push(str + '秒');
    }

    // 环配置
    const rings = [
      { id: 'month', items: chineseMonths, radius: 0.95 },
      { id: 'day', items: chineseDays, radius: 0.82 },
      { id: 'weekday', items: chineseWeekdays, radius: 0.69 },
      { id: 'hour', items: chineseHours, radius: 0.56 },
      { id: 'minute', items: chineseMinutes, radius: 0.43 },
      { id: 'second', items: chineseSeconds, radius: 0.30 }
    ];

    let clockElements = {};
    let lastValues = {};

    function createCompassClock() {
      const size = compassClock.offsetWidth;
      const center = size / 2;

      rings.forEach(ring => {
        clockElements[ring.id] = [];
        const count = ring.items.length;
        const radius = (size / 2) * ring.radius;

        ring.items.forEach((item, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;

          const el = document.createElement('div');
          el.className = 'clock-item';
          el.textContent = item;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
          el.style.transform = 'translate(-50%, -50%)';

          compassClock.appendChild(el);
          clockElements[ring.id].push(el);
        });
      });
    }

    function spawnBurstParticles(el) {
      const rect = el.getBoundingClientRect();
      const clockRect = compassClock.getBoundingClientRect();
      const x = rect.left - clockRect.left + rect.width / 2;
      const y = rect.top - clockRect.top + rect.height / 2;

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = \`hsl(\${120 + Math.random() * 60}, 70%, 60%)\`;
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');

        compassClock.appendChild(particle);

        // 动画到终点
        particle.animate([
          { left: x + 'px', top: y + 'px', opacity: 1, transform: 'scale(1)' },
          { left: endX + 'px', top: endY + 'px', opacity: 0, transform: 'scale(0)' }
        ], {
          duration: 600,
          easing: 'ease-out'
        });

        setTimeout(() => particle.remove(), 600);
      }
    }

    function updateCompassClock() {
      const now = new Date();
      const values = {
        month: now.getMonth(),
        day: now.getDate() - 1,
        weekday: now.getDay(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      };

      // 更新中心文本
      clockCenterText.innerHTML = \`
        <span>\${chineseMonths[values.month]}</span>
        <span>\${chineseDays[values.day]}</span>
        <span>\${chineseWeekdays[values.weekday]}</span><br>
        <span>\${chineseHours[values.hour]}</span>
        <span>\${chineseMinutes[values.minute]}</span>
        <span>\${chineseSeconds[values.second]}</span>
      \`;

      // 更新各环
      Object.keys(values).forEach(key => {
        const elements = clockElements[key];
        if (!elements) return;

        elements.forEach((el, i) => {
          const isActive = i === values[key];
          const wasActive = el.classList.contains('active');

          if (isActive && !wasActive) {
            el.classList.add('active');
            el.classList.add('rotating');
            spawnBurstParticles(el);

            setTimeout(() => {
              el.classList.remove('rotating');
            }, 600);
          } else if (!isActive && wasActive) {
            el.classList.remove('active');
          }
        });
      });

      lastValues = values;
    }

    // 初始化时钟
    createCompassClock();
    updateCompassClock();
    setInterval(updateCompassClock, 1000);

    // 窗口大小变化时重建时钟
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // 清除现有元素
        const items = compassClock.querySelectorAll('.clock-item');
        items.forEach(item => item.remove());
        clockElements = {};
        createCompassClock();
        updateCompassClock();
      }, 200);
    });

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
