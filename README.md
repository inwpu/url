# Xget URL 转换器

一个强大的 URL 加速转换工具，支持 GitHub、Docker、npm、PyPI 等多个开发平台的 URL 和命令自动转换为 Xget 加速链接。

## 功能特性

### URL 转换
- 自动识别多个平台的原始链接
- 一键转换为 Xget 加速链接
- 支持查询参数和锚点保留
- 实时转换，无需刷新页面

### 命令识别与转换
- 智能识别常用安装命令
- 自动转换为加速版本
- 支持多种命令格式和参数

### 支持的平台

#### 代码仓库
- GitHub
- GitLab
- Gitea
- Codeberg
- SourceForge
- AOSP

#### 包管理器
- npm (Node.js)
- PyPI (Python)
- Conda
- Maven
- Gradle
- RubyGems
- CRAN (R)
- CPAN (Perl)
- CTAN (TeX)
- NuGet (.NET)
- Crates (Rust)
- Packagist (PHP)
- Go Modules

#### 容器镜像
- Docker Hub
- GitHub Container Registry (GHCR)
- Quay.io

#### AI 模型与数据集
- Hugging Face
- Civitai

#### Linux 发行版
- Debian
- Ubuntu
- Fedora
- Rocky Linux
- openSUSE
- Arch Linux

#### 其他
- Homebrew
- arXiv
- F-Droid
- Jenkins 插件

## 使用方法

### 在线使用

访问部署的网站，在输入框中粘贴以下任一内容：

#### 1. URL 链接转换

直接粘贴原始 URL：

```
https://github.com/microsoft/vscode
```

转换结果：
```
https://hxorz.cn/gh/microsoft/vscode
```

#### 2. 命令转换

直接粘贴完整的安装命令：

**Git Clone 命令**
```bash
git clone https://github.com/microsoft/vscode
```
转换为：
```bash
git clone https://hxorz.cn/gh/microsoft/vscode
```

**npm 安装命令**
```bash
npm install react
```
转换为：
```bash
npm install react --registry=https://hxorz.cn/npm
```

**pip 安装命令**
```bash
pip install requests
```
转换为：
```bash
pip install requests -i https://hxorz.cn/pypi/simple
```

**下载命令**
```bash
curl -L https://github.com/user/repo/releases/download/v1.0.0/file.tar.gz
```
转换为：
```bash
curl -L https://hxorz.cn/gh/user/repo/releases/download/v1.0.0/file.tar.gz
```

### 推荐命令

转换后会自动生成该平台的推荐命令，可直接复制到终端执行。

## Docker 镜像加速配置

注意：Docker 镜像不支持 URL 直接转换，推荐直接配置 Docker 镜像源。配置后无需修改任何 docker pull 命令，即可自动使用加速服务。

本工具提供完整的 Docker 镜像加速配置说明，支持多种操作系统。

### Linux 系统配置

适用于 Ubuntu、Debian、CentOS、RHEL、Arch Linux、Fedora、openSUSE 等。

```bash
# 1. 编辑或创建 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": ["https://hub.hxorz.cn"]
}
EOF

# 2. 重启 Docker 服务
sudo systemctl restart docker

# 3. 验证配置是否生效
docker info
```

### macOS 配置

**方法 1：图形界面（推荐）**
1. 打开 Docker Desktop
2. 点击菜单栏 Docker 图标 → Preferences
3. 选择 Docker Engine
4. 添加配置：`{"registry-mirrors": ["https://hub.hxorz.cn"]}`
5. 点击 "Apply & Restart"

**方法 2：直接编辑配置文件**
```
~/Library/Group Containers/group.com.docker/settings-store.json
```

### Windows 配置

**方法 1：图形界面（推荐）**
1. 打开 Docker Desktop
2. 点击系统托盘 Docker 图标 → Settings
3. 选择 Docker Engine
4. 添加配置：`{"registry-mirrors": ["https://hub.hxorz.cn"]}`
5. 点击 "Apply & Restart"

**方法 2：直接编辑配置文件**
```
C:\Users\[USERNAME]\AppData\Roaming\Docker\settings-store.json
```

### 验证配置

运行以下命令查看配置是否生效：
```bash
docker info
```

在输出中查找 `Registry Mirrors` 部分，确认看到：
```
Registry Mirrors:
 https://hub.hxorz.cn/
```

## 本地部署

### 前置要求
- Node.js 环境（用于开发测试）
- 或任何静态文件托管服务

### 部署到 Cloudflare Workers

本项目设计为 Cloudflare Workers 应用。

1. 克隆仓库
```bash
git clone https://github.com/inwpu/url.git
cd url
```

2. 安装 Wrangler CLI
```bash
npm install -g wrangler
```

3. 登录 Cloudflare
```bash
wrangler login
```

4. 部署
```bash
wrangler deploy
```

### 部署到其他平台

本项目是纯静态页面，可部署到：
- GitHub Pages
- Vercel
- Netlify
- 任何静态网站托管服务

只需将 `url.js` 作为 HTML 文件服务即可。

## 自定义配置

### 修改 Xget 实例地址

在页面的"Xget 实例地址"输入框中，可以替换为你自己的 Xget Worker 域名。

默认实例：`https://hxorz.cn`

注意：Docker 链接会自动切换到 `hub.hxorz.cn`

### 修改默认实例

编辑 `url.js` 文件，修改第 669 行：

```javascript
<input id="instanceUrl" type="text" value="https://your-domain.com" />
```

## 技术实现

### 核心功能

1. **URL 解析与平台识别**
   - 基于 URL host 自动识别平台
   - 支持 30+ 平台的匹配规则

2. **命令解析**
   - 正则表达式匹配常用命令格式
   - 支持命令参数保留
   - 智能识别 URL 和命令

3. **路径处理**
   - 自动处理路径斜杠
   - 保留查询参数和锚点
   - 避免双斜杠问题

4. **推荐命令生成**
   - 根据平台类型生成对应命令
   - 区分文件下载和仓库克隆
   - 提供多种使用方式

### 性能优化

- 防抖输入处理，减少不必要的转换
- 粒子动画性能自适应
- 移动端优化支持

## 相关项目

- [Xget](https://github.com/xixu-me/Xget) - 超高性能的开源资源加速引擎
- [dockerproxy](https://github.com/inwpu/dockerproxy) - Docker 镜像加速代理

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request。

## 更新日志

### v1.1.0 (2025-11)
- 新增命令识别和自动转换功能
- 支持 git clone、npm install、pip install 等命令
- 修复 URL 路径拼接的双斜杠问题
- 修复 Cloudflare Workers 部署时的正则表达式转义问题
- 优化 Docker 换源配置说明
- 新增 macOS 和 Windows 配置方法
- 改进验证命令说明
- Docker 镜像改为推荐直接配置镜像源（不支持 URL 转换）

### v1.0.0 (初始版本)
- 基础 URL 转换功能
- 支持 30+ 开发平台
- Docker 镜像加速配置
- 响应式设计