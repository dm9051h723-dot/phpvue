# Frontend Pages Implementation Status

| Page / Route | Component | Status | Notes |
| :--- | :--- | :---: | :--- |
| **User Management** | | | |
| `/users` | `UserListPage.vue` | ✅ Done | User & Role Management tabs (Role implementation partial). |
| `/login` | `LoginPage.vue` | ✅ Done | Basic login form structure. |
| **Management** | | | |
| `/vehicleMgmts` | `VehicleMgmtListPage.vue` | ✅ Done | List view with Edit toggle. |
| `/projects` | `ProjectListPage.vue` | ✅ Done | CRUD table with Search. |
| `/events` | `EventListPage.vue` | ✅ Done | Read-only list with level badges. |
| `/parkingLotMgmts` | `ParkingLotMgmtListPage.vue` | ✅ Done | CRUD table. |
| `/objectMgmts` | `ObjectMgmtListPage.vue` | 🚧 In Progress | Targeted for this update. |
| `/scheduledMissions` | `ScheduledMissionListPage.vue` | 🚧 In Progress | Targeted for this update. |
| **Robot & Mission** | | | |
| `/mirStatuses` | `MirStatusListPage.vue` | ✅ Done | Read-only status list. |
| `/missions` | `MissionListPage.vue` | ✅ Done | Mission sending form and list. |
| `/missionQueues` | `MissionQueueListPage.vue` | ✅ Done | Supports Current and History views. |
| `/maps` | `MapListPage.vue` | ✅ Done | List and Sync action. |
| `/devices` | `DeviceListPage.vue` | ✅ Done | List with link to IP. |
| `/hookStatuses` | `HookStatusListPage.vue` | ✅ Done | Read-only status. |
| `/missionBookings` | `MissionBookingListPage.vue` | ✅ Done | CRUD table. |
| `/remoteManagement...` | `Remote...ListPage.vue` | ✅ Done | Read-only status. |
| **Data & Dashboard** | | | |
| `/dashboard` | `DashboardListPage.vue` | ⚠️ Partial | Layout done, **Charts not implemented**. |
| `/microOrganisms` | `MicroOrganismListPage.vue` | ✅ Done | CRUD table. |
| `/acceptanceGrades` | `AcceptanceGradeListPage.vue` | ✅ Done | List with Edit action. |
| **Map Visualization** | | | |
| `/regionMgmts/:id` | `RegionMgmtPage.vue` | ⚠️ Partial | Image loading & Zoom done. **Canvas drawing & Drag-drop missing**. |
| `/floorRegionMgmts/:id`| `RegionMgmtPage.vue` | ⚠️ Partial | Same as above. |
| **Popups / Windows** | | | |
| `/vehicleMgmts/window` | `VehicleMgmtListPage.vue` | ✅ Done | Reused main component. |
| `/parkingLot.../window`| `ParkingLotMgmtListPage.vue`| ✅ Done | Reused main component. |
| `/cleanAreas/window` | `UnderConstruction` | ❌ Pending | |
| `/elevatorMgmts/window`| `UnderConstruction` | ❌ Pending | |
| `/mqttCommands/window` | `UnderConstruction` | ❌ Pending | |

## Legend
*   ✅ **Done**: Basic structure, API connection (mock/real), and UI layout complete.
*   ⚠️ **Partial**: Page exists but lacks complex specific features (e.g. Charts, Interactive Canvas).
*   🚧 **In Progress**: Currently being implemented.
*   ❌ **Pending**: Still points to `UnderConstruction`.
