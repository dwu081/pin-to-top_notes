# Minimal Top Note

`Minimal Top Note` 是一个基于 Electron 的轻量便签工具，核心目标是：

- 快速记录
- 一键置顶
- 自动本地保存

适合放在桌面常驻，用来记待办、临时想法或工作提示。

## 核心功能

- `Pin / Pinned`：点击按钮切换窗口是否始终置顶（Always on Top）
- 自动保存：输入内容后会自动保存到本地文件
- 自动恢复：下次打开应用会加载上次保存的内容

## 项目是怎么工作的

- `src/main.js`
    - 创建 Electron 窗口
    - 处理置顶逻辑（`setAlwaysOnTop`）
    - 处理便签读写（保存到用户目录下 `note.txt`）
- `src/preload.js`
    - 通过 `contextBridge` 暴露安全 API：`window.topNote`
- `src/renderer.js`
    - 处理前端交互（按钮状态、输入监听、自动保存）
- `src/index.html` + `src/style.css`
    - 页面结构与样式

## 本地运行（基础）

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd install
npm.cmd start
```

## Windows 常见问题

如果 PowerShell 报 `npm.ps1` 执行策略错误，优先使用 `npm.cmd`（本项目文档也统一使用这个命令）。

## 打包（可选）

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd run dist
npx.cmd electron-builder --win portable
```

打包后可执行文件在 `dist/` 目录。