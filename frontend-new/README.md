# Frontend Project (Vue 3)

此資料夾包含重構後的 Vue 3 前端專案。

## 專案結構

- `src/`
  - `components/`: 重用的 Vue 元件 (如 Header, Sidebar)
  - `layouts/`: 頁面佈局 (AppLayout)
  - `views/`: 頁面視圖 (UserListPage, RegionMgmtPage 等)
  - `router/`: 路由設定 (定義頁面網址)
  - `stores/`: Pinia 狀態管理 (User, Device 等)
  - `assets/scss/`: 全域樣式 (Bootstrap, AdminLTE 風格)

## 檔案說明

- `src/main.js`: 應用程式入口，引入 Pinia, Router, Bootstrap 等。
- `src/router/index.js`: 定義所有頁面路由，對應原專案的 `routes.js`。
- `src/views/Common/CrudList.vue`: 通用的列表頁面模板，用於快速建置管理頁面。
- `src/views/RegionMgmt/RegionMgmtPage.vue`: 汙染地圖/區域管理頁面 (包含地圖顯示與操作邏輯)。
- `src/components/Common/SidebarView.vue`: 側邊選單，包含權限判斷與選單展開邏輯。

## 啟動方式

1. 進入此資料夾：
   ```bash
   cd frontend-new
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

4. 瀏覽器開啟 [http://localhost:3000](http://localhost:3000)

## API 串接

目前 `vite.config.js` 已設定 Proxy 指向 `http://localhost:8081` (後端)。
若要串接真實 API，請確保後端服務已啟動。
目前的頁面大多使用 Mock Data (如 `RegionMgmtPage.vue` 中的 `onMounted`)，開發時可替換為 `axios.get('/api/...')`。
