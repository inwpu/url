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
      background: radial-gradient(circle at top, #020617 0, #020617 40%, #020617 60%, #020617 100%);
      background-image:
        radial-gradient(circle at 0% 0%, #0b1120 0, transparent 50%),
        radial-gradient(circle at 100% 0%, #1e293b 0, transparent 55%),
        radial-gradient(circle at 50% 100%, #111827 0, transparent 55%);
      color: #f9fafb;
    }
    .page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 28px 16px 36px;
    }
    .main {
      width: 100%;
      max-width: 1120px;
    }

    .header {
      margin-bottom: 24px;
      text-align: left;
    }
    .header-title {
      font-size: 26px;
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
    }

    /* 顶部大时钟 + 万年历 */
    .hero {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      gap: 32px;
      margin-bottom: 26px;
    }

    .clock-block {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .clock-circle {
      position: relative;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 20%, #22c55e 0, #0f172a 45%, #020617 80%);
      border: 2px solid rgba(148, 163, 184, 0.8);
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.9),
        0 22px 44px rgba(15, 23, 42, 0.95),
        0 0 80px rgba(34, 197, 94, 0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      perspective: 900px;
    }
    .clock-circle::before {
      content: "";
      position: absolute;
      inset: 22px;
      border-radius: inherit;
      border: 1px dashed rgba(148, 163, 184, 0.55);
    }
    .clock-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      z-index: 2;
    }
    .clock-unit {
      display: inline-block;
      padding: 10px 12px;
      border-radius: 10px;
      background: radial-gradient(circle at 20% 0%, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.98));
      border: 1px solid rgba(148, 163, 184, 0.7);
      font-size: 32px;
      font-variant-numeric: tabular-nums;
      transform-origin: center bottom;
      backface-visibility: hidden;
      box-shadow: 0 6px 14px rgba(15, 23, 42, 0.8);
    }
    .clock-sep {
      font-size: 24px;
      opacity: 0.9;
    }
    .clock-label {
      margin-top: 10px;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #e5e7eb;
      z-index: 2;
    }

    .clock-unit.flip {
      animation: flip 0.42s ease-out;
    }
    @keyframes flip {
      0% {
        transform: rotateX(0deg);
      }
      40% {
        transform: rotateX(-85deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }

    .particle {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 999px;
      background: radial-gradient(circle, #22c55e 0, #06b6d4 100%);
      pointer-events: none;
      opacity: 0;
      animation: explode 0.7s ease-out forwards;
    }
    @keyframes explode {
      0% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.2);
        opacity: 0;
      }
    }

    /* 万年历 */
    .calendar-block {
      flex: 0 0 320px;
      background: rgba(15, 23, 42, 0.92);
      border-radius: 18px;
      padding: 12px 14px 10px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      box-shadow: 0 18px 32px rgba(15, 23, 42, 0.9);
    }
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 8px;
    }
    .calendar-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .calendar-month-label {
      font-size: 15px;
      font-weight: 600;
      color: #e5e7eb;
    }
    .calendar-sub {
      font-size: 11px;
      color: #9ca3af;
    }
    .calendar-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .cal-btn {
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      background: rgba(15, 23, 42, 0.9);
      color: #e5e7eb;
      font-size: 11px;
      padding: 2px 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }
    .cal-btn:hover {
      border-color: #38bdf8;
    }
    .cal-select {
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      background: rgba(15, 23, 42, 0.95);
      color: #e5e7eb;
      font-size: 11px;
      padding: 2px 8px;
      outline: none;
    }
    .calendar-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      table-layout: fixed;
      margin-top: 4px;
    }
    .calendar-table th,
    .calendar-table td {
      text-align: center;
      padding: 3px 0;
    }
    .calendar-table th {
      color: #9ca3af;
      font-weight: 500;
    }
    .calendar-day {
      border-radius: 999px;
      margin: 0 auto;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: #e5e7eb;
    }
    .calendar-day.today {
      background: linear-gradient(135deg, #22c55e, #06b6d4);
      color: #0f172a;
      font-weight: 700;
      box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9);
    }
    .calendar-day.muted {
      color: #4b5563;
    }

    /* URL 转换卡片，全宽 */
    .card {
      width: 100%;
      background: rgba(15, 23, 42, 0.96);
      border-radius: 20px;
      padding: 20px 20px 18px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.35);
      backdrop-filter: blur(14px);
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

    @media (max-width: 900px) {
      .header {
        text-align: center;
      }
      .header-sub {
        margin-left: auto;
        margin-right: auto;
      }
      .hero {
        margin-bottom: 22px;
      }
    }
    @media (max-width: 640px) {
      .card {
        padding: 16px 14px 14px;
      }
      .clock-circle {
        width: 220px;
        height: 220px;
      }
      .clock-unit {
        font-size: 26px;
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
  <div class="page">
    <main class="main">
      <header class="header">
        <div class="header-title">
          Xget URL 转换器
          <span class="header-badge">hxorz.cn 实例</span>
        </div>
        <div class="header-sub">
          将 GitHub / GitLab / Hugging Face / npm / PyPI 等平台的原始链接，一键转换为通过
          <code>hxorz.cn</code> 的 Xget 加速链接。上方大时钟与万年历仅作展示与日期选择使用。
        </div>
      </header>

      <section class="hero">
        <!-- 居中大翻页时钟 -->
        <div class="clock-block">
          <div class="clock-circle" id="clockCircle">
            <div class="clock-time">
              <span class="clock-unit" id="clockHour">00</span>
              <span class="clock-sep">:</span>
              <span class="clock-unit" id="clockMinute">00</span>
              <span class="clock-sep">:</span>
              <span class="clock-unit" id="clockSecond">00</span>
            </div>
            <div class="clock-label">当前时间</div>
          </div>
        </div>

        <!-- 万年历：可切月 / 可选年月 -->
        <div class="calendar-block">
          <div class="calendar-header">
            <div class="calendar-title-group">
              <div class="calendar-month-label" id="calMonthLabel"></div>
              <div class="calendar-sub">点击切换月份或选择任意年月</div>
            </div>
            <div class="calendar-controls">
              <button class="cal-btn" id="calPrevBtn">« 上月</button>
              <button class="cal-btn" id="calTodayBtn">今天</button>
              <button class="cal-btn" id="calNextBtn">下月 »</button>
              <select class="cal-select" id="calYearSelect"></select>
              <select class="cal-select" id="calMonthSelect"></select>
            </div>
          </div>
          <table class="calendar-table" id="calendarTable"></table>
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
            基于 <a href="https://github.com/xixu-me/Xget" target="_blank" rel="noreferrer">Xget</a> URL 规则 · by hxorz
          </span>
        </div>
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
    // === 平台规则（带 Docker 特殊处理） ===
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
        // Docker 统一使用 hub.hxorz.cn
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

    // === 大圆形翻页时钟 + 粒子爆炸 ===
    const clockCircle = document.getElementById("clockCircle");
    const clockHour = document.getElementById("clockHour");
    const clockMinute = document.getElementById("clockMinute");
    const clockSecond = document.getElementById("clockSecond");

    function pad(n) {
      return n.toString().padStart(2, "0");
    }

    function spawnParticles() {
      if (!clockCircle) return;
      const count = 18;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        const angle = Math.random() * Math.PI * 2;
        const radius = 70 + Math.random() * 40;
        const x = 50 + Math.cos(angle) * radius / 2;
        const y = 50 + Math.sin(angle) * radius / 2;
        p.style.left = x + "%";
        p.style.top = y + "%";
        clockCircle.appendChild(p);
        setTimeout(() => {
          if (p.parentNode === clockCircle) {
            clockCircle.removeChild(p);
          }
        }, 750);
      }
    }

    function setDigit(el, newValue, triggerParticles) {
      if (!el) return;
      const old = el.textContent;
      if (old === newValue) return;
      el.textContent = newValue;
      el.classList.remove("flip");
      void el.offsetWidth;
      el.classList.add("flip");
      if (triggerParticles) {
        spawnParticles();
      }
    }

    function updateClock() {
      const now = new Date();
      const h = pad(now.getHours());
      const m = pad(now.getMinutes());
      const s = pad(now.getSeconds());

      setDigit(clockHour, h, false);
      setDigit(clockMinute, m, false);
      setDigit(clockSecond, s, true);
    }

    // === 万年历：可切换月份、选择年月 ===
    const calMonthLabel = document.getElementById("calMonthLabel");
    const calTableEl = document.getElementById("calendarTable");
    const calPrevBtn = document.getElementById("calPrevBtn");
    const calNextBtn = document.getElementById("calNextBtn");
    const calTodayBtn = document.getElementById("calTodayBtn");
    const calYearSelect = document.getElementById("calYearSelect");
    const calMonthSelect = document.getElementById("calMonthSelect");

    const todayDate = new Date();
    let calYear = todayDate.getFullYear();
    let calMonth = todayDate.getMonth(); // 0-11

    (function initYearMonthSelect() {
      const startYear = calYear - 50;
      const endYear = calYear + 10;
      for (let y = startYear; y <= endYear; y++) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y + " 年";
        calYearSelect.appendChild(opt);
      }
      for (let m = 1; m <= 12; m++) {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m + " 月";
        calMonthSelect.appendChild(opt);
      }
    })();

    function renderCalendar(year, month) {
      if (!calMonthLabel || !calTableEl) return;
      calMonthLabel.textContent = year + " 年 " + (month + 1) + " 月";

      calYearSelect.value = year;
      calMonthSelect.value = (month + 1).toString();

      const todayY = todayDate.getFullYear();
      const todayM = todayDate.getMonth();
      const todayD = todayDate.getDate();

      const headers = ["一", "二", "三", "四", "五", "六", "日"];
      let html = "<thead><tr>";
      for (const h of headers) {
        html += "<th>" + h + "</th>";
      }
      html += "</tr></thead><tbody>";

      const firstDay = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let week = new Array(7).fill("");
      for (let d = 1; d <= daysInMonth; d++) {
        const cur = new Date(year, month, d);
        const dayOfWeek = cur.getDay();
        const idx = (dayOfWeek + 6) % 7;

        week[idx] = d;

        if (idx === 6 || d === daysInMonth) {
          html += "<tr>";
          for (let i = 0; i < 7; i++) {
            const val = week[i];
            if (!val) {
              html += "<td></td>";
            } else {
              let cls = "calendar-day";
              if (year === todayY && month === todayM && val === todayD) {
                cls += " today";
              }
              html += '<td><div class="' + cls + '">' + val + "</div></td>";
            }
          }
          html += "</tr>";
          week = new Array(7).fill("");
        }
      }
      html += "</tbody>";
      calTableEl.innerHTML = html;
    }

    calPrevBtn.addEventListener("click", () => {
      if (calMonth === 0) {
        calMonth = 11;
        calYear--;
      } else {
        calMonth--;
      }
      renderCalendar(calYear, calMonth);
    });

    calNextBtn.addEventListener("click", () => {
      if (calMonth === 11) {
        calMonth = 0;
        calYear++;
      } else {
        calMonth++;
      }
      renderCalendar(calYear, calMonth);
    });

    calTodayBtn.addEventListener("click", () => {
      calYear = todayDate.getFullYear();
      calMonth = todayDate.getMonth();
      renderCalendar(calYear, calMonth);
    });

    calYearSelect.addEventListener("change", () => {
      calYear = Number(calYearSelect.value);
      renderCalendar(calYear, calMonth);
    });

    calMonthSelect.addEventListener("change", () => {
      calMonth = Number(calMonthSelect.value) - 1;
      renderCalendar(calYear, calMonth);
    });

    // === 悬浮访问信息窗：仅展示当前信息 + busuanzi 计数，不存储 ===
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

      // IP 信息（只展示一次，不存本地）
      fetch("https://api.ipify.org?format=json")
        .then(r => r.json())
        .then(data => {
          document.getElementById("statIP").textContent = data.ip || "-";
        })
        .catch(() => {
          document.getElementById("statIP").textContent = "获取失败";
        });

      // 10 秒后自动隐藏悬浮窗，显示“访问信息”按钮
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
    updateClock();
    renderCalendar(calYear, calMonth);
    setInterval(updateClock, 1000);
    initVisitorInfo();

    // === busuanzi 不蒜子：仅在 url.hxorz.cn 下加载，统计 PV/UV ===
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
