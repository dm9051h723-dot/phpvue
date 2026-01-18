import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/Layouts/AppLayout.vue'
import LoginPage from '../views/User/LoginPage.vue'
import UserListPage from '../views/User/UserListPage.vue'
import RegionMgmtPage from '../views/RegionMgmt/RegionMgmtPage.vue'
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
      { path: '', redirect: '/users' }, // Default redirect
      { path: 'users', component: UserListPage },
      { path: 'vehicleMgmts', component: UnderConstruction },
      { path: 'objectMgmts', component: UnderConstruction },
      { path: 'regionMgmts', component: UnderConstruction }, // List page
      { path: 'events', component: UnderConstruction },
      { path: 'parkingLotMgmts', component: UnderConstruction },
      { path: 'projects', component: UnderConstruction },
      { path: 'acceptanceGrades', component: UnderConstruction },
      { path: 'microOrganisms', component: UnderConstruction },
      { path: 'scheduledMissions', component: UnderConstruction },
      { path: 'floorRegionMgmts/:id', component: RegionMgmtPage },
      { path: 'regionMgmts/:id', component: RegionMgmtPage },
      { path: 'dashboard', component: UnderConstruction },
      { path: 'devices', component: UnderConstruction },
      { path: 'mirStatuses', component: UnderConstruction },
      { path: 'missions', component: UnderConstruction },
      { path: 'missionQueues/history', component: UnderConstruction },
      { path: 'missionQueues/current', component: UnderConstruction },
      { path: 'maps', component: UnderConstruction },
      { path: 'hookStatuses', component: UnderConstruction },
      { path: 'missionBookings', component: UnderConstruction },
      { path: 'missionQueues/sample', component: UnderConstruction },
      { path: 'remoteManagementSystemStatuses', component: UnderConstruction },
      // Window routes (popups) - mapping to regular pages for now or UnderConstruction
      { path: 'vehicleMgmts/window', component: UnderConstruction },
      { path: 'parkingLotMgmts/window', component: UnderConstruction },
      { path: 'cleanAreas/window', component: UnderConstruction },
      { path: 'elevatorMgmts/window', component: UnderConstruction },
      { path: 'mqttCommands/window', component: UnderConstruction },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
