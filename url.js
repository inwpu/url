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
      color-scheme: dark;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at 20% 20%, #0f172a 0, #020617 55%, #01030e 100%);
      color: #f8fafc;
      overflow-x: hidden;
    }
    #particleCanvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      opacity: 0.85;
    }
    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 16px 52px;
    }
    .header {
      text-align: center;
      margin-bottom: 28px;
      max-width: 720px;
    }
    .brand {
      font-size: clamp(28px, 5vw, 42px);
      font-weight: 700;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .brand-badge {
      font-size: 11px;
      padding: 2px 10px;
      border-radius: 999px;
      border: 1px solid rgba(125, 211, 252, 0.6);
      background: rgba(15, 23, 42, 0.85);
      color: #7dd3fc;
    }
    .header-sub {
      margin-top: 10px;
      font-size: 14px;
      color: #cbd5f5;
      line-height: 1.6;
    }
    .layout {
      width: 100%;
      max-width: 1200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 26px;
    }
    .clock-stage {
      position: relative;
      width: min(92vw, 900px);
      margin: 10px auto 32px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
      box-shadow:
        0 25px 60px rgba(2, 6, 23, 0.85),
        inset 0 0 60px rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(148, 163, 184, 0.35);
      background: radial-gradient(circle, rgba(8, 145, 178, 0.08), rgba(7, 89, 133, 0.08) 35%, rgba(2, 6, 23, 0.96) 70%);
    }
    .clock-stage::after {
      content: "";
      position: absolute;
      inset: 8%;
      border-radius: 50%;
      border: 1px dashed rgba(148, 163, 184, 0.25);
      pointer-events: none;
    }
    #clockCanvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.35));
    }
    .clock-overlay {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px 12px;
      padding: 14px 24px;
      background: rgba(15, 23, 42, 0.55);
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      backdrop-filter: blur(10px);
    }
    .clock-chip {
      font-size: clamp(14px, 2.4vw, 18px);
      letter-spacing: 0.08em;
      color: #fdfdfd;
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.55);
      transition: transform 0.3s ease, color 0.3s ease;
    }
    .clock-chip.pulse {
      animation: glowPulse 0.8s ease;
    }
    @keyframes glowPulse {
      0% { transform: scale(1); color: #e0f2fe; text-shadow: 0 0 8px rgba(125, 211, 252, 0.6); }
      40% { transform: scale(1.12); color: #f9fafb; text-shadow: 0 0 25px rgba(6, 182, 212, 0.95); }
      100% { transform: scale(1); color: #fdfdfd; }
    }
    .card {
      flex: 1 1 360px;
      width: 100%;
      max-width: 520px;
      background: rgba(8, 15, 40, 0.86);
      border-radius: 26px;
      padding: 26px 22px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow:
        0 25px 50px rgba(2, 6, 23, 0.65),
        inset 0 1px 0 rgba(148, 163, 184, 0.2);
      backdrop-filter: blur(18px);
    }
    .card h2 {
      margin: 0 0 12px;
      font-size: 20px;
    }
    .docker-card {
      max-width: 900px;
    }
    .code-block {
      background: rgba(15, 23, 42, 0.92);
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      padding: 12px 14px;
      font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
      font-size: 13px;
      line-height: 1.5;
      overflow: auto;
      margin: 8px 0 14px;
    }
    .distro-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
    .distro-card {
      background: rgba(15, 23, 42, 0.7);
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      padding: 12px;
    }
    .distro-card h4 {
      margin: 0 0 6px;
      font-size: 14px;
      color: #7dd3fc;
    }
    .distro-card code {
      font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
      font-size: 12px;
      color: #f8fafc;
    }
    .field {
      margin-bottom: 16px;
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
      color: #94a3b8;
      margin-top: 4px;
      line-height: 1.4;
    }
    input,
    textarea {
      width: 100%;
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.45);
      background: rgba(15, 23, 42, 0.92);
      color: #e2e8f0;
      padding: 11px 13px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    }
    input:focus,
    textarea:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.45);
      background: rgba(15, 23, 42, 0.95);
    }
    textarea {
      min-height: 68px;
      resize: vertical;
    }
    .output-row {
      display: flex;
      gap: 10px;
      align-items: stretch;
    }
    .output-row textarea {
      flex: 1;
      min-height: 68px;
    }
    .btn {
      border-radius: 12px;
      padding: 0 18px;
      font-size: 13px;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: linear-gradient(135deg, #22d3ee, #14b8a6);
      color: #f8fafc;
      font-weight: 600;
      transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
    }
    .btn:hover {
      filter: brightness(1.05);
      box-shadow: 0 15px 32px rgba(13, 148, 136, 0.35);
      transform: translateY(-1px);
    }
    .btn:active {
      transform: translateY(0);
      box-shadow: 0 6px 18px rgba(13, 148, 136, 0.4);
    }
    .status {
      margin-top: 8px;
      font-size: 12px;
      min-height: 18px;
    }
    .status.ok {
      color: #34d399;
    }
    .status.err {
      color: #fb7185;
    }
    .footer {
      margin-top: 18px;
      font-size: 11px;
      color: #a5b4fc;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 6px;
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
      padding: 2px 10px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(148, 163, 184, 0.4);
      backdrop-filter: blur(12px);
    }
    .pill strong {
      color: #e5e7eb;
    }
    .pill span {
      color: #94a3b8;
      margin-left: 4px;
    }
    .info-panel {
      position: fixed;
      right: 18px;
      bottom: 22px;
      width: 260px;
      max-width: calc(100% - 32px);
      background: rgba(15, 23, 42, 0.9);
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.45);
      box-shadow: 0 18px 40px rgba(2, 6, 23, 0.75);
      padding: 12px 14px;
      font-size: 11px;
      color: #e5e7eb;
      z-index: 2;
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
      opacity: 0.7;
      margin-right: 4px;
    }
    .info-toggle {
      position: fixed;
      right: 18px;
      bottom: 20px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.6);
      background: rgba(15, 23, 42, 0.95);
      padding: 6px 12px;
      color: #e5e7eb;
      font-size: 11px;
      cursor: pointer;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.85);
      z-index: 2;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .info-toggle.visible {
      opacity: 1;
      transform: translateY(0);
    }
    @media (max-width: 960px) {
      .clock-stage {
        width: min(96vw, 640px);
      }
      .card {
        max-width: 640px;
      }
    }
    @media (max-width: 640px) {
      .clock-overlay {
        flex-direction: column;
        gap: 6px;
      }
      .output-row {
        flex-direction: column;
      }
      .info-panel {
        left: 12px;
        right: 12px;
        width: auto;
      }
      .info-toggle {
        left: 12px;
        right: 12px;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <canvas id="particleCanvas"></canvas>
  <div class="page">
    <header class="header">
      <div class="brand">
        hxorz URL 转换器
        <span class="brand-badge">国内加速</span>
      </div>
      <p class="header-sub">
        将 GitHub / GitLab / Docker Hub / GHCR / Hugging Face 等原始链接一键转到 hxorz 加速域名，现已支持直接粘贴
        <code>docker pull</code> 命令。
      </p>
    </header>

    <section class="clock-stage">
      <canvas id="clockCanvas"></canvas>
      <div class="clock-overlay">
        <span class="clock-chip" id="cnMonth">--月</span>
        <span class="clock-chip" id="cnDay">--号</span>
        <span class="clock-chip" id="cnWeek">星期-</span>
        <span class="clock-chip" id="cnHour">--点</span>
        <span class="clock-chip" id="cnMinute">--分</span>
        <span class="clock-chip" id="cnSecond">--秒</span>
      </div>
    </section>

    <main class="layout">
      <section class="card converter-card">
        <h2>加速链接转换</h2>
        <div class="field">
          <label for="instanceUrl">Xget 实例地址</label>
          <input id="instanceUrl" type="text" value="https://hxorz.cn" />
          <small>默认走 hxorz.cn，你也可替换为自己的 Worker 域名。Docker 加速推荐将本地 Daemon 改成 hub.hxorz.cn，详见下方说明。</small>
        </div>

        <div class="field">
          <label for="originalUrl">原始 URL / docker 命令</label>
          <textarea id="originalUrl" placeholder="粘贴 GitHub / Docker Hub / GHCR / Hugging Face / npm / PyPI 等链接，或直接粘贴 docker pull 命令"></textarea>
          <small>平台自动识别生成加速 URL，docker 命令会被解析成 hub.hxorz.cn/镜像。</small>
        </div>

        <div class="field">
          <label for="convertedUrl">转换后的加速链接</label>
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

      <section class="card docker-card">
        <h2>Docker 换源指南</h2>
        <p>
          国内拉取 Docker 镜像的最佳方式是直接把守护进程的镜像源指向 <code>https://hub.hxorz.cn</code>，而不是逐条替换命令。
          参考 <a href="https://github.com/inwpu/dockerproxy" target="_blank" rel="noopener">dockerproxy 项目</a> 可获得更多代理玩法。
        </p>
        <p>编辑 <code>/etc/docker/daemon.json</code>，将配置改为：</p>
        <pre class="code-block">{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}</pre>
        <p>保存后执行 <code>sudo systemctl daemon-reload</code>、<code>sudo systemctl restart docker</code>，即可让新镜像源生效。</p>
        <div class="distro-grid">
          <div class="distro-card">
            <h4>Ubuntu / Debian</h4>
            <p>预装 systemd：</p>
            <code>sudo mkdir -p /etc/docker<br>sudo nano /etc/docker/daemon.json<br>sudo systemctl daemon-reload<br>sudo systemctl restart docker</code>
          </div>
          <div class="distro-card">
            <h4>CentOS / RHEL / Rocky</h4>
            <p>若使用 firewalld：</p>
            <code>sudo mkdir -p /etc/docker<br>sudo vim /etc/docker/daemon.json<br>sudo systemctl enable docker --now</code>
          </div>
          <div class="distro-card">
            <h4>Fedora / openSUSE</h4>
            <p>同样放置 daemon.json，重启 docker 服务或 <code>sudo systemctl restart docker</code>。</p>
          </div>
          <div class="distro-card">
            <h4>Arch / Manjaro</h4>
            <p>编辑 <code>/etc/docker/daemon.json</code> 后执行：</p>
            <code>sudo systemctl enable docker --now<br>sudo systemctl restart docker</code>
          </div>
        </div>
        <p>重启完成后，直接运行 <code>docker pull</code> 将自动走 hxorz.cn 的镜像加速，无需额外命令替换。</p>
      </section>
    </main>
  </div>

  <!-- 悬浮访问信息窗（不存储，只展示当前信息 + busuanzi 统计） -->
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

    function parseDockerPullCommand(text) {
      if (!text) return null;
      const lower = text.toLowerCase();
      const idx = lower.indexOf("docker pull");
      if (idx === -1) return null;
      const after = text.slice(idx + "docker pull".length).trim();
      if (!after) return null;
      const tokens = after.split(/\\s+/);
      const options = [];
      let image = "";
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (!token) continue;
        if (!image && token.startsWith("-")) {
          options.push(token);
          if (
            token.startsWith("--") &&
            !token.includes("=") &&
            tokens[i + 1] &&
            !tokens[i + 1].startsWith("-")
          ) {
            options.push(tokens[i + 1]);
            i++;
          }
          continue;
        }
        if (!image) {
          image = token.replace(/^['"]|['"]$/g, "");
          break;
        }
      }
      if (!image) return null;
      return { image, options };
    }

    function normalizeDockerReference(ref) {
      if (!ref) return "";
      let value = ref.trim();
      value = value.replace(/^https?:\\/\\//i, "");
      value = value.replace(/^registry-1\\.docker\\.io\\//i, "");
      value = value.replace(/^docker\\.io\\//i, "");
      value = value.replace(/^hub\\.docker\\.com\\/r\\//i, "");
      value = value.replace(/^library\\//i, "library/");
      return value.replace(/^\\/+/, "");
    }

    function buildCommands(platform, url, dockerOptions = []) {
      if (!platform || !url) return "";
      const cmds = [];
      if (platform.id === "docker") {
        const noScheme = url.replace(/^https?:\\/\\//i, "");
        const optionText = dockerOptions.length ? dockerOptions.join(" ") + " " : "";
        cmds.push("# Docker 拉取镜像（如有登录需求请自行补充 docker login）");
        cmds.push("docker pull " + optionText + noScheme);
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

    function pad(n) {
      return n.toString().padStart(2, "0");
    }

    function convert() {
      const rawInstance = instanceInput.value;
      const rawInput = originalInput.value.trim();

      statusEl.textContent = "";
      statusEl.className = "status";
      cmdOutput.value = "";
      cmdHint.textContent = "";

      if (!rawInput) {
        convertedInput.value = "";
        return;
      }

      const dockerCmd = parseDockerPullCommand(rawInput);
      if (dockerCmd) {
        const ref = normalizeDockerReference(dockerCmd.image);
        if (!ref) {
          statusEl.textContent = "未能解析 docker pull 命令，请检查镜像名称。";
          statusEl.classList.add("err");
          convertedInput.value = "";
          return;
        }
        const dockerUrl = "https://hub.hxorz.cn/" + ref;
        convertedInput.value = dockerUrl;
        statusEl.textContent = "已识别 Docker 命令，已切换到 hub.hxorz.cn ✅（同时建议在下方按指南配置系统级镜像源）";
        statusEl.classList.add("ok");
        const cmdText = buildCommands({ id: "docker", name: "Docker 镜像" }, dockerUrl, dockerCmd.options);
        cmdOutput.value = cmdText;
        cmdHint.textContent = "Docker 命令已自动替换为 hxorz 加速镜像，可直接复制执行。";
        return;
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(rawInput);
      } catch (e) {
        statusEl.textContent = "原始 URL 无法解析，请检查是否粘贴完整。";
        statusEl.classList.add("err");
        convertedInput.value = "";
        return;
      }

      let platform = detectPlatform(parsedUrl, rawInput);
      if (!platform) {
        statusEl.textContent = "暂未识别到支持的平台（GitHub / Docker Hub / Hugging Face / npm / PyPI 等）。";
        statusEl.classList.add("err");
        convertedInput.value = "";
        return;
      }

      let effectiveInstance = normalizeInstanceUrl(rawInstance);
      let result = "";
      const path = parsedUrl.pathname || "/";
      const query = parsedUrl.search || "";
      const hash = parsedUrl.hash || "";

      if (platform.id === "docker") {
        effectiveInstance = "https://hub.hxorz.cn";
        result = effectiveInstance + path + query + hash;
        statusEl.textContent = "已识别平台：Docker 镜像，已自动切换加速域名为 hub.hxorz.cn ✅（参考下方换源步骤可获得全局加速）";
      } else {
        if (!effectiveInstance) {
          statusEl.textContent = "请先填写 Xget 实例地址，例如：https://hxorz.cn";
          statusEl.classList.add("err");
          convertedInput.value = "";
          return;
        }
        const prefix = platform.prefix ? "/" + platform.prefix : "";
        result = effectiveInstance + prefix + path + query + hash;
        statusEl.textContent = "已识别平台：" + platform.name + "，转换成功 ✅";
      }

      convertedInput.value = result;
      statusEl.classList.add("ok");
      const cmdText = buildCommands(platform, result);
      cmdOutput.value = cmdText;
      if (cmdText) {
        cmdHint.textContent = "已为 " + platform.name + " 生成推荐命令，可直接复制后按需修改。";
      }
    }

    function debounceConvert() {
      clearTimeout(window.__xgetTimer);
      window.__xgetTimer = setTimeout(convert, 120);
    }

    originalInput.addEventListener("input", debounceConvert);
    instanceInput.addEventListener("input", debounceConvert);

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

    const clockCanvas = document.getElementById("clockCanvas");
    const cnMonthEl = document.getElementById("cnMonth");
    const cnDayEl = document.getElementById("cnDay");
    const cnWeekEl = document.getElementById("cnWeek");
    const cnHourEl = document.getElementById("cnHour");
    const cnMinuteEl = document.getElementById("cnMinute");
    const cnSecondEl = document.getElementById("cnSecond");

    const WEEK_LABELS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const CN_DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

    function toChineseNumber(num) {
      if (num === 0) return "零";
      if (num === 10) return "十";
      if (num < 10) return CN_DIGITS[num];
      if (num < 20) return "十" + (num % 10 === 0 ? "" : CN_DIGITS[num % 10]);
      const tens = Math.floor(num / 10);
      const units = num % 10;
      return CN_DIGITS[tens] + "十" + (units ? CN_DIGITS[units] : "");
    }

    const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => toChineseNumber(i + 1) + "月");
    const DAY_LABELS = Array.from({ length: 31 }, (_, i) => toChineseNumber(i + 1) + "号");
    const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => toChineseNumber(i) + "点");
    const MINUTE_LABELS = Array.from({ length: 60 }, (_, i) => toChineseNumber(i) + "分");
    const SECOND_LABELS = Array.from({ length: 60 }, (_, i) => toChineseNumber(i) + "秒");

    let clockCtx = null;
    let lastClockState = null;
    let clockRotation = 0;
    let clockFrameTime = 0;
    let clockAnimHandle = null;

    function initClockCanvas() {
      if (!clockCanvas) return;
      clockCtx = clockCanvas.getContext("2d");
      resizeClockCanvas();
    }

    function resizeClockCanvas() {
      if (!clockCanvas || !clockCtx) return;
      const parent = clockCanvas.parentElement;
      const size = parent ? parent.clientWidth : clockCanvas.clientWidth || 600;
      const dpr = window.devicePixelRatio || 1;
      clockCanvas.width = size * dpr;
      clockCanvas.height = size * dpr;
      clockCanvas.style.width = size + "px";
      clockCanvas.style.height = size + "px";
      clockCtx.setTransform(1, 0, 0, 1, 0, 0);
      clockCtx.scale(dpr, dpr);
      if (lastClockState) {
        drawClockTexture(lastClockState, clockRotation);
      }
    }

    function drawClockTexture(state, rotationValue = 0) {
      if (!clockCtx || !state) return;
      const size = clockCanvas.clientWidth;
      const center = size / 2;
      clockCtx.clearRect(0, 0, size, size);
      const bg = clockCtx.createRadialGradient(center, center, size * 0.05, center, center, size * 0.5);
      bg.addColorStop(0, "rgba(14, 165, 233, 0.3)");
      bg.addColorStop(1, "rgba(2, 6, 23, 0.9)");
      clockCtx.fillStyle = bg;
      clockCtx.fillRect(0, 0, size, size);

      const rotationSeeds = [0.25, -0.18, 0.12, -0.1, 0.3];
      const rings = [
        { labels: MONTH_LABELS, radius: size * 0.18, highlight: state.month },
        { labels: DAY_LABELS, radius: size * 0.28, highlight: state.day - 1 },
        { labels: HOUR_LABELS, radius: size * 0.39, highlight: state.hour },
        { labels: MINUTE_LABELS, radius: size * 0.51, highlight: state.minute },
        { labels: SECOND_LABELS, radius: size * 0.63, highlight: state.second }
      ];

      rings.forEach((ring, ringIndex) => {
        const step = (Math.PI * 2) / ring.labels.length;
        for (let i = 0; i < ring.labels.length; i++) {
          const angle = -Math.PI / 2 + i * step + rotationValue * rotationSeeds[ringIndex];
          const x = center + Math.cos(angle) * ring.radius;
          const y = center + Math.sin(angle) * ring.radius;
          const isActive = i === ring.highlight;
          clockCtx.save();
          clockCtx.translate(x, y);
          clockCtx.rotate(angle + Math.PI / 2);
          clockCtx.font = (isActive ? "600 " : "400 ") + Math.max(13, size * 0.02) + "px 'Noto Serif SC', 'PingFang SC', serif";
          clockCtx.fillStyle = isActive
            ? "rgba(248, 250, 252, 0.98)"
            : "rgba(148, 163, 184," + (0.3 + ringIndex * 0.12) + ")";
          clockCtx.textAlign = "center";
          clockCtx.textBaseline = "middle";
          clockCtx.fillText(ring.labels[i], 0, 0);
          if (isActive) {
            clockCtx.shadowColor = "rgba(6, 182, 212, 0.8)";
            clockCtx.shadowBlur = 12;
          }
          clockCtx.restore();
        }
      });
    }

    function startClockAnimation() {
      if (clockAnimHandle) {
        cancelAnimationFrame(clockAnimHandle);
      }
      clockFrameTime = 0;
      const loop = (timestamp) => {
        if (!clockCtx || !lastClockState) {
          clockAnimHandle = requestAnimationFrame(loop);
          return;
        }
        if (!clockFrameTime) {
          clockFrameTime = timestamp;
        }
        const delta = timestamp - clockFrameTime;
        clockFrameTime = timestamp;
        clockRotation += delta * 0.0008;
        drawClockTexture(lastClockState, clockRotation);
        clockAnimHandle = requestAnimationFrame(loop);
      };
      clockAnimHandle = requestAnimationFrame(loop);
    }

    function animateChip(el, value) {
      if (!el || el.textContent === value) return;
      el.textContent = value;
      el.classList.remove("pulse");
      void el.offsetWidth;
      el.classList.add("pulse");
    }

    function updateClock() {
      const now = new Date();
      const state = {
        month: now.getMonth(),
        day: now.getDate(),
        weekday: now.getDay(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      };
      lastClockState = state;
      animateChip(cnMonthEl, MONTH_LABELS[state.month]);
      animateChip(cnDayEl, DAY_LABELS[state.day - 1]);
      animateChip(cnWeekEl, WEEK_LABELS[state.weekday]);
      animateChip(cnHourEl, HOUR_LABELS[state.hour]);
      animateChip(cnMinuteEl, MINUTE_LABELS[state.minute]);
      animateChip(cnSecondEl, SECOND_LABELS[state.second]);
    }

    const particleCanvas = document.getElementById("particleCanvas");
    let particleCtx = null;
    let particles = [];
    let viewWidth = window.innerWidth;
    let viewHeight = window.innerHeight;
    const PARTICLE_COUNT = 120;

    function createParticle() {
      return {
        x: Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        life: Math.random() * 300 + 200
      };
    }

    function resizeParticles() {
      if (!particleCanvas || !particleCtx) return;
      viewWidth = window.innerWidth;
      viewHeight = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      particleCanvas.width = viewWidth * dpr;
      particleCanvas.height = viewHeight * dpr;
      particleCtx.setTransform(1, 0, 0, 1, 0, 0);
      particleCtx.scale(dpr, dpr);
    }

    function drawParticles() {
      if (!particleCtx) return;
      particleCtx.clearRect(0, 0, viewWidth, viewHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.x < -20 || p.x > viewWidth + 20 || p.y < -20 || p.y > viewHeight + 20 || p.life <= 0) {
          Object.assign(p, createParticle());
        }
        const gradient = particleCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, "rgba(45,212,191," + p.alpha + ")");
        gradient.addColorStop(1, "rgba(13,148,136,0)");
        particleCtx.fillStyle = gradient;
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        particleCtx.fill();
      });
      requestAnimationFrame(drawParticles);
    }

    function initParticles() {
      if (!particleCanvas) return;
      particleCtx = particleCanvas.getContext("2d");
      resizeParticles();
      particles = new Array(PARTICLE_COUNT).fill(0).map(createParticle);
      requestAnimationFrame(drawParticles);
    }

    window.addEventListener("resize", () => {
      resizeParticles();
      resizeClockCanvas();
    });

    const infoPanel = document.getElementById("infoPanel");
    const infoToggle = document.getElementById("infoToggle");

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

    initClockCanvas();
    updateClock();
    startClockAnimation();
    convert();
    initParticles();
    setInterval(updateClock, 1000);
    initVisitorInfo();

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
