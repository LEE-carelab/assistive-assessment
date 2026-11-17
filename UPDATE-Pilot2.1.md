# Pilot 2.1 PDF Binding Fix

## 修正內容

1. 匯出前直接重新讀取目前畫面的 checkbox、radio、select、switch 與文字輸入值，不再只依賴延遲自動儲存。
2. select 的每個 option 加入明確 `value`，避免顯示文字與儲存值不一致。
3. 新增 `pdf-bindings.js`，為編號 01、05、06、16、17 建立正式 PDF 選項座標及藍色勾號渲染。
4. 五份表格合計建立 510 個可直接套印的選項座標。
5. 完整電子紀錄附頁改用：checkbox `✓`、radio `●`、select `▾`，確保所有選取值都能在 PDF 中覆核。
6. 排除多個 schema 選項誤指向同一個 PDF 父層標籤的歧義綁定。
7. Service Worker 快取版本更新為 Pilot 2.1，並將 `pdf-bindings.js` 納入離線資源。

## 覆蓋部署

將 ZIP 全部解壓，使用其中所有檔案覆蓋 GitHub repository 根目錄；請勿把外層資料夾一起上傳。

根目錄至少應直接看到：

- `index.html`
- `app.js`
- `schemas.js`
- `pdf-bindings.js`
- `pdf-writer.js`
- `styles.css`
- `service-worker.js`
- `manifest.webmanifest`
- `templates/`

上傳並等待 GitHub Pages 完成部署後：

1. iPad Safari 開啟網站並保持連線。
2. 關閉舊的主畫面 App，再重新開啟兩次，讓新 Service Worker 接管。
3. 若仍顯示 Pilot 2.0，移除主畫面圖示，至 Safari 清除該網站資料，再重新開啟網站及加入主畫面。
4. 建立一筆假資料，至少測試 checkbox、radio、select 與文字欄位後匯出 PDF。

原有 IndexedDB 草稿通常會保留，但更新前仍建議先按「全部備份」匯出 JSON。
