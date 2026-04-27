# Release Checklist (GitHub)

## 1) 准备代码

- [ ] 确认功能正常（`npm.cmd start`）
- [ ] 更新版本号（`package.json` -> `version`）
- [ ] 确认 `.gitignore` 已忽略 `node_modules/`、`dist/`

## 2) 打包产物

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
npm.cmd install
npm.cmd run dist
npx.cmd electron-builder --win portable
```

产物位置：`dist/`

- `Minimal Top Note Setup x.y.z.exe`（安装版）
- `Minimal Top Note x.y.z.exe`（免安装便携版，双击即用）

## 3) 提交代码到 GitHub Repo

```powershell
Set-Location "d:\vibe coding\note\minimal-top-note-1"
git init
git add .
git commit -m "release: v0.1.0"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 4) 打 Tag 并推送

```powershell
git tag v0.1.0
git push origin v0.1.0
```

## 5) 创建 GitHub Release

在 GitHub 仓库页面：

1. 进入 `Releases` -> `Draft a new release`
2. 选择 Tag：`v0.1.0`
3. 标题示例：`Minimal Top Note v0.1.0`
4. 上传 `dist/` 里的两个 Windows 文件：
   - `Minimal Top Note x.y.z.exe`
   - `Minimal Top Note Setup x.y.z.exe`
5. 点击 `Publish release`

---

## 推荐说明模板（Release Notes）

- 新增：Pin to Top 置顶功能
- 新增：自动保存本地便签
- 优化：Windows 可下载即用（portable）
