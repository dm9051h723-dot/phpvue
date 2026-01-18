<template>
    <aside class="main-sidebar">
        <section class="sidebar" style="height:auto">
            <ul class="sidebar-menu">
                <li class="header">主選單</li>

                <!-- Account Management -->
                <li v-if="permissions.contains('user-role-manage')" :class="{active: route.path.includes('/users')}">
                    <router-link to="/users">
                        <i class="fas fa-user-circle"></i> <span>帳號權限管理</span>
                    </router-link>
                </li>

                <!-- Sampling Robot -->
                <li v-if="permissions.contains('sampling-robot')" class="treeview" :class="{active: isSamplingRobotActive, 'menu-open': isSamplingRobotOpen}">
                    <a href="javascript:void(0)" @click="toggleMenu('sampling')">
                        <i class="fas fa-car"></i>
                        <span>採樣機器人</span>
                        <span class="pull-right-container"><i class="fas fa-angle-left pull-right"></i></span>
                    </a>
                    <ul class="treeview-menu">
                        <!-- Mission Submenu -->
                        <li class="treeview" :class="{active: isMissionActive, 'menu-open': isMissionOpen}">
                            <a href="javascript:void(0)" @click="toggleMenu('mission')">
                                <i class="far fa-circle"></i>
                                <span>任務</span>
                                <span class="pull-right-container"><i class="fas fa-angle-left pull-right"></i></span>
                            </a>
                            <ul class="treeview-menu">
                                <li :class="{active: route.path.includes('/missions') && !route.path.includes('/missionQueues/sample')}">
                                    <router-link to="/missions">
                                        <i class="far fa-circle"></i> <span>發送任務</span>
                                    </router-link>
                                </li>
                                <li :class="{active: route.path.includes('/missionQueues/current')}">
                                    <router-link to="/missionQueues/current">
                                        <i class="far fa-circle"></i> <span>目前任務列</span>
                                    </router-link>
                                </li>
                                <li :class="{active: route.path.includes('/missionQueues/history')}">
                                    <router-link to="/missionQueues/history">
                                        <i class="far fa-circle"></i> <span>歷史任務列</span>
                                    </router-link>
                                </li>
                                <li :class="{active: route.path.includes('/missionBookings')}">
                                    <router-link to="/missionBookings">
                                        <i class="far fa-circle"></i> <span>預約任務</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <!-- Other Sampling Robot Items -->
                        <li :class="{active: route.path.includes('/regionMgmts') && route.query.is_deploy == '0'}">
                            <router-link to="/regionMgmts?is_deploy=0">
                                <i class="far fa-circle"></i> <span>GDC</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path.includes('/regionMgmts') && route.query.is_deploy == '1'}">
                            <router-link to="/regionMgmts?is_deploy=1">
                                <i class="far fa-circle"></i> <span>SR</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path.includes('/maps')}">
                            <router-link to="/maps">
                                <i class="far fa-circle"></i> <span>地圖列</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path.includes('/missionQueues/sample')}">
                            <router-link to="/missionQueues/sample">
                                <i class="far fa-circle"></i> <span>歷史採樣任務進度</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path === '/hookStatuses'}">
                            <router-link to="/hookStatuses">
                                <i class="far fa-circle"></i> <span>手臂資訊</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path === '/remoteManagementSystemStatuses'}">
                            <router-link to="/remoteManagementSystemStatuses">
                                <i class="far fa-circle"></i> <span>採樣任務進度</span>
                            </router-link>
                        </li>
                        <li :class="{active: route.path.includes('/devices')}">
                            <router-link to="/devices">
                                <i class="far fa-circle"></i> <span>AP連線 / IP連線</span>
                            </router-link>
                        </li>
                        <li v-if="device && (device.ip || device.ap)">
                            <a :href="device.ip ? ('http://' + device.ip) : device.ap" target="_blank">
                                <i class="far fa-circle"></i> <span>MIR 軟體</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <!-- Pollution Map -->
                <li v-if="permissions.contains('pollution-map')" :class="{active: route.path.includes('/floorRegionMgmts') || route.path.match(/\/regionMgmts\/[1-9]/)}">
                    <router-link to="/floorRegionMgmts/1">
                        <i class="fas fa-map"></i>
                        <span>汙染地圖</span>
                    </router-link>
                </li>

                <!-- Parameter Settings -->
                <li v-if="permissions.contains('parameter-settings')" :class="{active: route.path.includes('/acceptanceGrades')}">
                    <router-link to="/acceptanceGrades">
                        <i class="fas fa-cog"></i>
                        <span>參數設定</span>
                    </router-link>
                </li>

                <!-- Data Entry -->
                <li v-if="permissions.contains('microbiological-data-entry')" :class="{active: route.path.includes('/microOrganisms') && route.query.source !== '2'}">
                    <router-link to="/microOrganisms">
                        <i class="fas fa-tag"></i>
                        <span>數據輸入</span>
                    </router-link>
                </li>

                <!-- Dashboard -->
                <li v-if="permissions.contains('data-analysis-table')" :class="{active: route.path.includes('/dashboard')}">
                    <router-link to="/dashboard">
                        <i class="fas fa-chart-area"></i>
                        <span>數據分析表</span>
                    </router-link>
                </li>

            </ul>
        </section>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useDeviceStore } from '../../stores/device'

const route = useRoute()
const userStore = useUserStore()
const deviceStore = useDeviceStore()

const permissions = computed(() => userStore.permissions)
const device = computed(() => deviceStore.device)

const openMenus = ref({
    sampling: true,
    mission: false
})

const toggleMenu = (menu) => {
    openMenus.value[menu] = !openMenus.value[menu]
}

const isSamplingRobotOpen = computed(() => openMenus.value.sampling)
const isMissionOpen = computed(() => openMenus.value.mission)

const isSamplingRobotActive = computed(() => {
    return route.path.includes('/devices') ||
           route.path.includes('/mirStatuses') ||
           route.path.includes('/missions') ||
           route.path.includes('/missionQueues') ||
           route.path.includes('/regionMgmts') ||
           route.path.includes('/maps') ||
           (route.path.includes('/microOrganisms') && route.query.source === '2') ||
           route.path.includes('/locations') ||
           route.path.includes('/hookStatuses') ||
           route.path.includes('/missionBookings') ||
           route.path.includes('/remoteManagementSystemStatuses')
})

const isMissionActive = computed(() => {
    return route.path.includes('/mirStatuses') ||
           route.path.includes('/missions') ||
           route.path.includes('/missionQueues') ||
           route.path.includes('/missionBookings')
})
</script>

<style scoped>
/* Add any specific overrides here if main.scss doesn't cover it */
</style>
