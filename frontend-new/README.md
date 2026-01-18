# Frontend Project (Vue 3)

此資料夾包含重構後的 Vue 3 前端專案，位於分支 `feature/frontend-separation`。

## 使用技術

*   **框架**: Vue 3 (Composition API)
*   **建置工具**: Vite
*   **狀態管理**: Pinia
*   **路由**: Vue Router
*   **UI 樣式**: Bootstrap 5 + AdminLTE 風格 (SASS)

## 專案結構

- `src/`
  - `components/`: 重用的 Vue 元件 (如 Header, Sidebar)
  - `layouts/`: 頁面佈局 (AppLayout)
  - `views/`: 頁面視圖 (UserListPage, RegionMgmtPage 等)
  - `router/`: 路由設定 (定義頁面網址)
  - `stores/`: Pinia 狀態管理 (User, Device 等)
  - `assets/scss/`: 全域樣式 (Bootstrap, AdminLTE 風格)

## 如何取得與啟動

如果你是第一次使用此分支，請按照以下步驟操作：

1. **拉取分支代碼**
   ```bash
   git fetch origin feature/frontend-separation
   git checkout feature/frontend-separation
   ```

2. **進入前端目錄**
   ```bash
   cd frontend-new
   ```

3. **安裝依賴**
   ```bash
   npm install
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **瀏覽器開啟**
   前往 [http://localhost:3000](http://localhost:3000)

## API 串接說明

目前 `vite.config.js` 已設定 Proxy 指向 `http://localhost:8081` (後端 Laravel 服務)。
*   若要串接真實 API，請確保後端服務已啟動 (`php artisan serve --port=8081`)。
*   目前的頁面範例 (如 `RegionMgmtPage.vue`) 暫時使用 Mock Data 方便前端開發，正式串接時可將 `regionMgmt.value = { ... }` 替換為 `axios.get('/api/...')`。
