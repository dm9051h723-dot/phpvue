# Amdr Laravel Project - 手動安裝指令

此專案使用 Laravel (後端) 與 Vue.js (前端)，資料庫使用 PostgreSQL。

## 1. 檢查 Docker 是否可用
```bash
docker --version
docker compose version
```

## 2. 準備環境與設定檔
複製環境變數範例檔：
```bash
cp .env.example .env
```
請確認 `.env` 中的資料庫設定與 `docker-compose.yml` 一致：
```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=CDMO
DB_USERNAME=postgres
DB_PASSWORD=itriacs
```

## 3. 啟動基礎設施 (PostgreSQL, Redis, RabbitMQ)
```bash
docker compose up -d
```
*注意：此專案使用 PostgreSQL，而非 MySQL。*

## 4. 還原資料庫 (cdmo.dump)
**強烈建議**執行此步驟以匯入初始地圖與機器人設定資料。請確保 `cdmo.dump` 檔案存在於專案根目錄。

```bash
# Windows (PowerShell/CMD):
docker run --rm -v ${PWD}:/backup --network host -e PGPASSWORD=itriacs postgres:15 pg_restore -h 127.0.0.1 -U postgres -d CDMO -v /backup/cdmo.dump

# Linux/Mac:
docker run --rm -v $(pwd):/backup --network host -e PGPASSWORD=itriacs postgres:15 pg_restore -h 127.0.0.1 -U postgres -d CDMO -v /backup/cdmo.dump
```

## 5. 安裝後端依賴 (PHP/Composer)
需確認本機已安裝 PHP 與 Composer。

```bash
composer install
php artisan key:generate
php artisan storage:link
```

## 6. 安裝前端依賴 (Node.js/NPM)
需確認本機已安裝 Node.js (建議 v12 或 v14，依據 `package.json` 依賴判斷)。

```bash
npm install
# 編譯前端資源
npm run dev
```

## 7. 啟動服務

**啟動 Laravel WebSocket Server (用於即時通訊):**
```bash
# 需先全域安裝 laravel-echo-server 或者使用 npx
npm install -g laravel-echo-server
laravel-echo-server start
```

**啟動後端伺服器:**
```bash
php artisan serve --port=8081
```

## 8. 訪問應用程式
瀏覽器開啟: [http://localhost:8081](http://localhost:8081)
