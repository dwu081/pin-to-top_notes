# minimal-top-note

一个最小可运行的 Electron 置顶便签应用（Always on Top + 自动保存）。

## 项目结构

```text
minimal-top-note/
├── package.json
├── electron-builder.yml
├── .gitignore
├── scripts/
│   └── postinstall.js
└── src/
    ├── main.js
    ├── preload.js
    ├── index.html
    ├── renderer.js
    └── style.css
```

## 环境要求

- Node.js 18+（建议 LTS）
- Windows / macOS / Linux

## 安装依赖

> 在项目根目录执行。

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd install
```

## 启动应用

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd start
```

## 打包应用

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd run dist
npx.cmd electron-builder --win portable
```

构建完成后，`dist` 中主要有：

- `Minimal Top Note Setup 0.1.0.exe`（安装版）
- `Minimal Top Note 0.1.0.exe`（免安装便携版，双击即用）

## 发布到 GitHub（源码 + 可执行文件）

1. 把源码推到 GitHub 仓库（不提交 `node_modules/` 和 `dist/`）
2. 在 GitHub `Releases` 中上传 `dist` 产物给用户下载

示例命令：

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
git init
git add .
git commit -m "release: v0.1.0"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
git tag v0.1.0
git push origin v0.1.0
```

详细流程见：`RELEASE_CHECKLIST.md`

## 常见问题（Windows PowerShell）

如果你看到类似“禁止运行脚本（`npm.ps1`）”错误，这是执行策略导致的。

你有两种方式：

1. 继续使用 `npm.cmd`（推荐，最简单）
2. 或临时放宽当前会话策略：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm start
```

## 功能说明

- 点击 `Pin` 切换窗口置顶（Always on Top）
- 文本内容自动保存到 Electron 用户数据目录下的 `note.txt`
- 重启应用后会自动加载上次内容