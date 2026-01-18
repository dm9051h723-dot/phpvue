import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/Layouts/AppLayout.vue'
import LoginPage from '../views/User/LoginPage.vue'
import UserListPage from '../views/User/UserListPage.vue'
import RegionMgmtPage from '../views/RegionMgmt/RegionMgmtPage.vue'
import VehicleMgmtListPage from '../views/VehicleMgmt/VehicleMgmtListPage.vue'
import ProjectListPage from '../views/Project/ProjectListPage.vue'
import EventListPage from '../views/Event/EventListPage.vue'
import ParkingLotMgmtListPage from '../views/ParkingLotMgmt/ParkingLotMgmtListPage.vue'
import ObjectMgmtListPage from '../views/ObjectMgmt/ObjectMgmtListPage.vue'
import ScheduledMissionListPage from '../views/ScheduledMission/ScheduledMissionListPage.vue'
import MirStatusListPage from '../views/MirStatus/MirStatusListPage.vue'
import MissionListPage from '../views/Mission/MissionListPage.vue'
import MissionQueueListPage from '../views/MissionQueue/MissionQueueListPage.vue'
import MapListPage from '../views/Map/MapListPage.vue'
import DeviceListPage from '../views/Device/DeviceListPage.vue'
import HookStatusListPage from '../views/HookStatus/HookStatusListPage.vue'
import DashboardListPage from '../views/Dashboard/DashboardListPage.vue'
import MicroOrganismListPage from '../views/MicroOrganism/MicroOrganismListPage.vue'
import AcceptanceGradeListPage from '../views/AcceptanceGrade/AcceptanceGradeListPage.vue'
import RemoteManagementSystemStatusListPage from '../views/RemoteManagementSystemStatus/RemoteManagementSystemStatusListPage.vue'
import MissionBookingListPage from '../views/MissionBooking/MissionBookingListPage.vue'
import UnderConstruction from '../views/Common/UnderConstruction.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', redirect: '/users' },
      { path: 'users', component: UserListPage },
      { path: 'vehicleMgmts', component: VehicleMgmtListPage },
      { path: 'projects', component: ProjectListPage },
      { path: 'events', component: EventListPage },
      { path: 'parkingLotMgmts', component: ParkingLotMgmtListPage },
      { path: 'objectMgmts', component: ObjectMgmtListPage },
      { path: 'scheduledMissions', component: ScheduledMissionListPage },
      { path: 'mirStatuses', component: MirStatusListPage },
      { path: 'missions', component: MissionListPage },
      { path: 'missionQueues/current', component: MissionQueueListPage },
      { path: 'missionQueues/history', component: MissionQueueListPage },
      { path: 'maps', component: MapListPage },
      { path: 'devices', component: DeviceListPage },
      { path: 'hookStatuses', component: HookStatusListPage },
      { path: 'dashboard', component: DashboardListPage },
      { path: 'microOrganisms', component: MicroOrganismListPage },
      { path: 'acceptanceGrades', component: AcceptanceGradeListPage },
      { path: 'remoteManagementSystemStatuses', component: RemoteManagementSystemStatusListPage },
      { path: 'missionBookings', component: MissionBookingListPage },

      // Complex pages not yet fully ported or needing sub-components
      { path: 'regionMgmts', component: UnderConstruction },
      { path: 'floorRegionMgmts/:id', component: RegionMgmtPage },
      { path: 'regionMgmts/:id', component: RegionMgmtPage },
      { path: 'missionQueues/sample', component: UnderConstruction },

      // Window popups
      { path: 'vehicleMgmts/window', component: VehicleMgmtListPage },
      { path: 'parkingLotMgmts/window', component: ParkingLotMgmtListPage },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
