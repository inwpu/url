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
  <title>Xget URL 转换器 - hxorz.cn</title>
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
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top, #1f2937 0, #020617 55%);
      color: #f9fafb;
    }
    .wrapper {
      width: 100%;
      max-width: 860px;
      padding: 24px 16px;
    }
    .card {
      background: rgba(15, 23, 42, 0.96);
      border-radius: 18px;
      padding: 22px 20px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.25);
      backdrop-filter: blur(14px);
    }

    /* 顶部：标题 + 时钟 + 日历 */
    .top-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .title-block {
      min-width: 220px;
      max-width: 460px;
    }
    .title {
      font-size: 22px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .title-badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid rgba(56, 189, 248, 0.7);
      color: #7dd3fc;
      background: rgba(15, 23, 42, 0.9);
    }
    .subtitle {
      font-size: 13px;
      color: #9ca3af;
      margin-bottom: 6px;
    }

    /* 时间 + 日历区域 */
    .time-calendar {
      display: flex;
      gap: 16px;
      align-items: stretch;
      flex-wrap: wrap;
      justify-content: flex-end;
      flex: 1;
    }

    /* 圆形翻页时钟 */
    .clock-wrapper {
      flex-shrink: 0;
    }
    .clock-circle {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 20%, #22c55e 0, #0f172a 45%);
      border: 2px solid rgba(148, 163, 184, 0.7);
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.9),
        0 14px 32px rgba(15, 23, 42, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .clock-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      z-index: 2;
    }
    .clock-unit {
      display: inline-block;
      padding: 6px 8px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid rgba(148, 163, 184, 0.6);
      font-size: 18px;
      font-variant-numeric: tabular-nums;
      transform-origin: center bottom;
      backface-visibility: hidden;
    }
    .clock-sep {
      font-size: 16px;
      opacity: 0.9;
    }
    .clock-label {
      margin-top: 6px;
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #cbd5f5;
      z-index: 2;
    }
    .clock-circle::before {
      content: "";
      position: absolute;
      inset: 14px;
      border-radius: inherit;
      border: 1px dashed rgba(148, 163, 184, 0.4);
      opacity: 0.9;
    }

    /* 翻页动画 */
    .clock-unit.flip {
      animation: flip 0.38s ease-out;
    }
    @keyframes flip {
      0% {
        transform: rotateX(0deg);
      }
      40% {
        transform: rotateX(-75deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }

    /* 粒子爆炸 */
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 999px;
      background: radial-gradient(circle, #22c55e 0, #06b6d4 100%);
      pointer-events: none;
      opacity: 0;
      animation: explode 0.6s ease-out forwards;
    }
    @keyframes explode {
      0% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.8);
        opacity: 0;
      }
    }

    /* 日历 */
    .calendar-wrapper {
      min-width: 190px;
      background: rgba(15, 23, 42, 0.85);
      border-radius: 14px;
      padding: 10px 10px 8px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.8);
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .calendar-header span {
      font-size: 13px;
      color: #e5e7eb;
      font-weight: 600;
    }
    .calendar-sub {
      font-size: 11px;
      color: #9ca3af;
    }
    .calendar-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      table-layout: fixed;
    }
    .calendar-table th,
    .calendar-table td {
      text-align: center;
      padding: 2px 0;
    }
    .calendar-table th {
      color: #9ca3af;
      font-weight: 500;
    }
    .calendar-day {
      border-radius: 999px;
      margin: 0 auto;
      width: 20px;
      height: 20px;
      line-height: 20px;
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

    /* 原来的表单区域 */
    .main-body {
      margin-top: 8px;
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
      padding: 0 14px;
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

    @media (max-width: 720px) {
      .card {
        padding: 18px 14px;
      }
      .top-row {
        flex-direction: column;
      }
      .time-calendar {
        justify-content: flex-start;
      }
    }
    @media (max-width: 600px) {
      .output-row {
        flex-direction: column;
      }
      .btn {
        padding: 8px 12px;
        justify-content: center;
      }
      .clock-circle {
        width: 130px;
        height: 130px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="top-row">
        <div class="title-block">
          <div class="title">
            Xget URL 转换器
            <span class="title-badge">hxorz.cn 实例</span>
          </div>
          <div class="subtitle">
            将 GitHub / GitLab / Hugging Face / npm / PyPI 等平台的原始链接，一键转换为通过
            <code>hxorz.cn</code> 的 Xget 加速链接。
          </div>
        </div>

        <div class="time-calendar">
          <!-- 圆形翻页时钟 -->
          <div class="clock-wrapper">
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

          <!-- 日历 -->
          <div class="calendar-wrapper">
            <div class="calendar-header">
              <span id="calMonth"></span>
              <span class="calendar-sub">本月</span>
            </div>
            <table class="calendar-table" id="calendarTable"></table>
          </div>
        </div>
      </div>

      <div class="main-body">
        <div class="field">
          <label for="instanceUrl">Xget 实例地址</label>
          <input id="instanceUrl" type="text" value="https://hxorz.cn" />
          <small>例如：<code>https://hxorz.cn</code>，可替换为你自己的 Xget Worker 域名。</small>
        </div>

        <div class="field">
          <label for="originalUrl">原始 URL</label>
          <textarea id="originalUrl" placeholder="粘贴 GitHub / Hugging Face / npm / PyPI 等原始链接"></textarea>
          <small>平台将自动识别并生成加速 URL。</small>
        </div>

        <div class="field">
          <label for="convertedUrl">转换后的 Xget URL</label>
          <div class="output-row">
            <textarea id="convertedUrl" readonly placeholder="转换结果会显示在这里"></textarea>
            <button id="copyBtn" class="btn" type="button">
              复制
            </button>
          </div>
          <div id="status" class="status"></div>
        </div>

        <div class="footer">
          <span class="pill">
            <strong>支持平台</strong>
            <span>GitHub / GitLab / Gitea / Codeberg / Hugging Face / npm / PyPI / conda / Maven / Debian / Ubuntu 等</span>
          </span>
          <span>
            基于 <a href="https://github.com/xixu-me/Xget" target="_blank" rel="noreferrer">Xget</a> URL 规则 · by hxorz
          </span>
        </div>
      </div>
    </div>
  </div>

  <script>
    // === 平台规则（简化版） ===
    const PLATFORMS = [
      { name: "GitHub",       prefix: "gh",      match: ["github.com"] },
      { name: "GitHub Gist",  prefix: "gist",    match: ["gist.github.com"] },
      { name: "GitLab",       prefix: "gl",      match: ["gitlab.com"] },
      { name: "Gitea",        prefix: "gitea",   match: ["gitea.com"] },
      { name: "Codeberg",     prefix: "codeberg",match: ["codeberg.org"] },
      { name: "SourceForge",  prefix: "sf",      match: ["sourceforge.net"] },
      { name: "AOSP",         prefix: "aosp",    match: ["android.googlesource.com"] },
      { name: "Hugging Face", prefix: "hf",      match: ["huggingface.co"] },
      { name: "Civitai",      prefix: "civitai", match: ["civitai.com"] },
      { name: "npm",          prefix: "npm",     match: ["registry.npmjs.org"] },
      { name: "PyPI",         prefix: "pypi",    match: ["pypi.org"] },
      { name: "conda",        prefix: "conda",   match: ["repo.anaconda.com", "conda.anaconda.org"] },
      { name: "Maven",        prefix: "maven",   match: ["repo1.maven.org"] },
      { name: "Apache",       prefix: "apache",  match: ["downloads.apache.org"] },
      { name: "Gradle",       prefix: "gradle",  match: ["plugins.gradle.org"] },
      { name: "Homebrew",     prefix: "homebrew",match: ["github.com/Homebrew"] },
      { name: "RubyGems",     prefix: "rubygems",match: ["rubygems.org"] },
      { name: "CRAN",         prefix: "cran",    match: ["cran.r-project.org"] },
      { name: "CPAN",         prefix: "cpan",    match: ["www.cpan.org"] },
      { name: "CTAN",         prefix: "ctan",    match: ["tug.ctan.org"] },
      { name: "Go 模块",      prefix: "golang",  match: ["proxy.golang.org"] },
      { name: "NuGet",        prefix: "nuget",   match: ["api.nuget.org"] },
      { name: "Rust Crates",  prefix: "crates",  match: ["crates.io"] },
      { name: "Packagist",    prefix: "packagist",match:["repo.packagist.org"] },
      { name: "Debian",       prefix: "debian",  match: ["deb.debian.org"] },
      { name: "Ubuntu",       prefix: "ubuntu",  match: ["archive.ubuntu.com"] },
      { name: "Fedora",       prefix: "fedora",  match: ["dl.fedoraproject.org"] },
      { name: "Rocky Linux",  prefix: "rocky",   match: ["download.rockylinux.org"] },
      { name: "openSUSE",     prefix: "opensuse",match:["download.opensuse.org"] },
      { name: "Arch Linux",   prefix: "arch",    match: ["geo.mirror.pkgbuild.com"] },
      { name: "arXiv",        prefix: "arxiv",   match: ["arxiv.org"] },
      { name: "F-Droid",      prefix: "fdroid",  match: ["f-droid.org"] },
      { name: "Jenkins 插件", prefix: "jenkins", match: ["updates.jenkins.io"] }
    ];

    const instanceInput = document.getElementById("instanceUrl");
    const originalInput = document.getElementById("originalUrl");
    const convertedInput = document.getElementById("convertedUrl");
    const copyBtn = document.getElementById("copyBtn");
    const statusEl = document.getElementById("status");

    function normalizeInstanceUrl(url) {
      if (!url) return "";
      url = url.trim();
      if (!/^https?:\\/\\//i.test(url)) {
        url = "https://" + url;
      }
      // 移除尾部斜杠
      return url.replace(/\\/+/g, "/").replace(/\\/+$/, "");
    }

    function detectPlatform(u) {
      const host = u.host.toLowerCase();
      const href = u.href.toLowerCase();
      for (const p of PLATFORMS) {
        if (p.match.some(m => host.includes(m) || href.includes(m.toLowerCase()))) {
          return p;
        }
      }
      return null;
    }

    function convert() {
      const rawInstance = instanceInput.value;
      const rawUrl = originalInput.value.trim();

      statusEl.textContent = "";
      statusEl.className = "status";

      if (!rawUrl) {
        convertedInput.value = "";
        return;
      }

      let instance = normalizeInstanceUrl(rawInstance);
      if (!instance) {
        statusEl.textContent = "请先填写 Xget 实例地址，例如：https://hxorz.cn";
        statusEl.classList.add("err");
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

      const platform = detectPlatform(u);
      if (!platform) {
        statusEl.textContent = "暂未识别到支持的平台（GitHub / Hugging Face / npm / PyPI 等）。";
        statusEl.classList.add("err");
        convertedInput.value = "";
        return;
      }

      const path = u.pathname || "/";
      const query = u.search || "";
      const hash = u.hash || "";
      const result = instance + "/" + platform.prefix + path + query + hash;

      convertedInput.value = result;
      statusEl.textContent = "已识别平台：" + platform.name + "，转换成功 ✅";
      statusEl.classList.add("ok");
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
        statusEl.textContent = "已复制到剪贴板。";
        statusEl.className = "status ok";
      } catch (e) {
        convertedInput.select();
        document.execCommand("copy");
        statusEl.textContent = "已尝试复制，请手动确认。";
        statusEl.className = "status ok";
      }
    });

    // === 圆形翻页时钟 + 粒子爆炸 ===
    const clockCircle = document.getElementById("clockCircle");
    const clockHour = document.getElementById("clockHour");
    const clockMinute = document.getElementById("clockMinute");
    const clockSecond = document.getElementById("clockSecond");

    function pad(n) {
      return n.toString().padStart(2, "0");
    }

    function spawnParticles() {
      if (!clockCircle) return;
      const count = 14;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        const angle = Math.random() * Math.PI * 2;
        const radius = 40 + Math.random() * 22; // px 级半径
        const x = 50 + Math.cos(angle) * radius / 1.5;
        const y = 50 + Math.sin(angle) * radius / 1.5;
        p.style.left = x + "%";
        p.style.top = y + "%";
        clockCircle.appendChild(p);
        setTimeout(() => {
          if (p.parentNode === clockCircle) {
            clockCircle.removeChild(p);
          }
        }, 650);
      }
    }

    function setDigit(el, newValue, triggerParticles) {
      if (!el) return;
      const old = el.textContent;
      if (old === newValue) return;
      el.textContent = newValue;
      el.classList.remove("flip");
      // 强制重排以重触发动画
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

      // 秒翻动时带粒子爆炸效果；分、小时自然翻
      setDigit(clockHour, h, false);
      setDigit(clockMinute, m, false);
      setDigit(clockSecond, s, true);
    }

    // === 日历 ===
    const calMonthEl = document.getElementById("calMonth");
    const calTableEl = document.getElementById("calendarTable");

    function renderCalendar(baseDate) {
      if (!calMonthEl || !calTableEl) return;
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth(); // 0-11
      const today = baseDate.getDate();

      calMonthEl.textContent = year + " 年 " + (month + 1) + " 月";

      // 星期一到星期日
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
        const dayOfWeek = cur.getDay(); // 0=Sun...6=Sat
        const idx = (dayOfWeek + 6) % 7; // 转换到 0=Mon...6=Sun

        week[idx] = d;

        // 到周日或最后一天，输出一行
        if (idx === 6 || d === daysInMonth) {
          html += "<tr>";
          for (let i = 0; i < 7; i++) {
            const val = week[i];
            if (!val) {
              html += "<td></td>";
            } else {
              let cls = "calendar-day";
              if (val === today) {
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

    // 初始化
    convert();
    updateClock();
    renderCalendar(new Date());
    setInterval(updateClock, 1000);
  </script>
</body>
</html>`;
