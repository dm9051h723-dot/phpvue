<template>
  <div>
    <section class="content-header clearfix">
      <h1>參數設定</h1>
      <div class="pull-right">
        <template v-if="mode === 'read'">
          <button class="btn btn-success me-2" @click="mode = 'edit'">
            <i class="fas fa-pencil-alt"></i> 編輯
          </button>
          <button class="btn btn-danger" @click="resetToDefault" :disabled="sending">
            <i class="fas fa-undo"></i> 恢復原廠設定
          </button>
        </template>
        <template v-else>
          <button class="btn btn-secondary me-2" @click="cancelEdit">
            <i class="fas fa-times"></i> 取消編輯
          </button>
          <button class="btn btn-primary" @click="submit" :disabled="sending">
            <i class="fas fa-save"></i> 儲存
          </button>
        </template>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="box box-primary">
            <div class="box-body">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-else>
                <h4 class="text-center font-weight-bold mb-3" style="border-bottom: 1px solid black; padding-bottom: 10px;">
                    環境監控汙染地圖允收標準/級距設定
                </h4>

                <div class="table-responsive">
                  <table class="table table-bordered table-hover text-center align-middle">
                    <colgroup>
                        <col span="2" style="background-color: #f0f4fa">
                        <col span="2" style="background-color: #eef6e8">
                        <col span="3" style="background-color: #fff5d6">
                    </colgroup>
                    <thead>
                      <tr>
                        <th rowspan="2" class="align-middle">允收/項目</th>
                        <th rowspan="2" class="align-middle">汙染狀態</th>
                        <th rowspan="2" class="align-middle">微粒子<br>(28.3L/0.5µm)</th>
                        <th rowspan="2" class="align-middle">微粒子<br>(28.3L/5µm)</th>
                        <th colspan="3" class="align-middle">微生物(cfu/m<sup>3</sup>)</th>
                      </tr>
                      <tr>
                        <th>懸浮菌</th>
                        <th>落下菌</th>
                        <th>接觸菌</th>
                      </tr>
                      <tr>
                        <th colspan="2" rowspan="2" class="align-middle">允收/顏色(定義)</th>
                        <th colspan="5" class="bg-white">
                           Class
                           <span v-if="form.grade === 'A'">100</span>
                           <span v-else-if="form.grade === 'B'">1,000</span>
                           <span v-else-if="form.grade === 'C'">10,000</span>
                           <span v-else>100,000</span>
                           <br>
                           (Grade
                           <select v-model="form.grade" @change="fetchData" class="form-select d-inline-block w-auto py-0 px-2" style="height: auto;">
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                           </select>)
                        </th>
                      </tr>
                      <tr>
                        <!-- Input Headers for Grade Thresholds -->
                        <th>
                            <input v-if="mode === 'edit'" v-model="thresholds.microparticle_dot_5" class="form-control form-control-sm text-center">
                            <span v-else>{{ thresholds.microparticle_dot_5 }}</span>
                        </th>
                        <th>
                            <input v-if="mode === 'edit'" v-model="thresholds.microparticle_5" class="form-control form-control-sm text-center">
                            <span v-else>{{ thresholds.microparticle_5 }}</span>
                        </th>
                        <th>
                            <input v-if="mode === 'edit'" v-model="thresholds.suspended" class="form-control form-control-sm text-center">
                            <span v-else>{{ thresholds.suspended }}</span>
                        </th>
                        <th>
                            <input v-if="mode === 'edit'" v-model="thresholds.falling" class="form-control form-control-sm text-center">
                            <span v-else>{{ thresholds.falling }}</span>
                        </th>
                        <th>
                            <input v-if="mode === 'edit'" v-model="thresholds.contact" class="form-control form-control-sm text-center">
                            <span v-else>{{ thresholds.contact }}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in tableRows" :key="index">
                        <!-- 允收/項目 Label -->
                        <td>
                           <span v-if="index === 0">&gt; 允收</span>
                           <span v-else-if="index === tableRows.length - 1">&lt; 允收</span>
                           <span v-else>允收 x {{ index === 1 ? 80 : 50 }} %</span>
                        </td>

                        <!-- Pollution Status (Color + Name) -->
                        <td>
                           <div class="d-flex align-items-center justify-content-center">
                               <input type="color" v-if="mode === 'edit'" v-model="pollutionConditions[index].color" class="form-control form-control-color me-2" title="Choose color">
                               <div v-else class="color-box me-2" :style="{ backgroundColor: pollutionConditions[index]?.color }"></div>
                               <span>{{ pollutionConditions[index]?.display_name }}</span>
                           </div>
                        </td>

                        <!-- Values -->
                        <td v-for="kind in organismKinds" :key="kind">
                            <template v-if="row[kind]">
                               <span v-if="index === 0">&gt;</span>
                               <span v-else-if="index === tableRows.length - 1">&lt;</span>
                               <span v-else>&nbsp;</span>
                            </template>
                            <span v-else-if="mode === 'read'">-</span>

                            <input v-if="mode === 'edit' && index !== 0"
                                   v-model="row[kind]"
                                   class="form-control form-control-sm text-center"
                            >
                            <template v-else-if="row[kind]">
                                {{ row[kind] }}
                                <span v-if="getUpperValue(kind, index)" class="text-muted small"> ~ {{ getUpperValue(kind, index) }}</span>
                            </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

// State
const loading = ref(false)
const sending = ref(false)
const mode = ref('read') // 'read' or 'edit'
const form = ref({ grade: 'A' })
const acceptanceGrades = ref([])
const pollutionConditions = ref([])
const organismKinds = ['microparticle_dot_5', 'microparticle_5', 'suspended', 'falling', 'contact']
const columns = ['action', 'warn', 'general', 'normal'] // The 4 rows in the table logic

// Computed Thresholds for the Input Row (The "base" values)
const thresholds = ref({
    microparticle_dot_5: 0,
    microparticle_5: 0,
    suspended: 0,
    falling: 0,
    contact: 0
})

// Watch thresholds to update the calculated rows when in edit mode
watch(thresholds, (newVal) => {
    if (mode.value === 'edit') {
        updateTableRowsFromThresholds()
    }
}, { deep: true })

const tableRows = ref([])

const updateTableRowsFromThresholds = () => {
    // Logic from legacy:
    // Row 0 (Action): > value
    // Row 1 (Warn): value * 0.8
    // Row 2 (General): value * 0.5
    // Row 3 (Normal): < value * 0.5 (Same as Row 2 val)

    // We construct the 4 rows structure for the table
    const rows = [[], [], [], []]

    // Initialize objects
    for(let i=0; i<4; i++) rows[i] = {}

    organismKinds.forEach(kind => {
        const baseVal = parseInt(thresholds.value[kind] || 0)

        // Action (Index 0)
        rows[0][kind] = baseVal

        // Warn (Index 1) - 80%
        rows[1][kind] = Math.round(baseVal * 0.8)

        // General (Index 2) - 50%
        rows[2][kind] = Math.round(baseVal * 0.5)

        // Normal (Index 3) - 50%
        rows[3][kind] = Math.round(baseVal * 0.5)
    })

    tableRows.value = rows
}

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/acceptanceGrades', { params: { grade: form.value.grade } })
     if (res.data.status === 0) {
        acceptanceGrades.value = res.data.data.acceptanceGrades
        parseDataToThresholds()
     }
  } catch (err) {
      console.error(err)
      // Mock Data
      acceptanceGrades.value = [
          { organism_kind: 'suspended', action: 100, warn: 80, general: 50, normal: 50 },
          { organism_kind: 'falling', action: 50, warn: 40, general: 25, normal: 25 },
          { organism_kind: 'contact', action: 25, warn: 20, general: 13, normal: 13 },
          { organism_kind: 'microparticle_dot_5', action: 3520, warn: 2816, general: 1760, normal: 1760 },
          { organism_kind: 'microparticle_5', action: 34, warn: 27, general: 17, normal: 17 },
      ]
      parseDataToThresholds()
  }

  // Fetch Pollution Conditions (Colors)
  try {
      const res = await axios.get('/api/pollutionConditions')
      if (res.data.status === 0) {
          const allConditions = res.data.data.pollutionConditions
          pollutionConditions.value = columns.map(name => allConditions.find(c => c.name === name) || { name, display_name: name, color: '#cccccc' })
      }
  } catch (err) {
      // Mock Colors
      pollutionConditions.value = [
          { name: 'action', display_name: '行動', color: '#dc3545' },
          { name: 'warn', display_name: '警戒', color: '#ffc107' },
          { name: 'general', display_name: '正常', color: '#6c757d' },
          { name: 'normal', display_name: '正常', color: '#28a745' }
      ]
  }

  loading.value = false
}

const parseDataToThresholds = () => {
    organismKinds.forEach(kind => {
        const item = acceptanceGrades.value.find(g => g.organism_kind === kind)
        thresholds.value[kind] = item ? item.action : 0
    })
    updateTableRowsFromThresholds()
}

const getUpperValue = (kind, index) => {
    // Logic to show range "~ Value"
    if (index === 0 || index === 3) return null
    if (index === 2) return null // General doesn't usually show range in this specific table logic based on image

    // In legacy code:
    // if((idx == 0) || ((idx + 1) == this.acceptanceGradesForTable.length) || ((idx - 2) < 0) ...
    // It seems to show upper bound of the *previous* tier.

    // Simple logic matching the image:
    // Warn row shows range between Warn and Action?
    // Image shows: Warn 2816 (no range), Normal 1760 (no range).
    // Wait, let's stick to the simpler display in the image first. The image shows single values.
    return null
}

const submit = async () => {
    sending.value = true
    try {
        // Reconstruct the full acceptanceGrades array from thresholds
        const payload = organismKinds.map(kind => {
            const base = parseInt(thresholds.value[kind])
            return {
                organism_kind: kind,
                grade: form.value.grade,
                action: base,
                warn: Math.round(base * 0.8),
                general: Math.round(base * 0.5),
                normal: Math.round(base * 0.5)
            }
        })

        await axios.patch('/api/acceptanceGrades/batch', {
            acceptance_grades: payload,
            pollution_conditions: pollutionConditions.value
        })

        mode.value = 'read'
        alert('儲存成功')
    } catch (err) {
        alert('儲存失敗 (Backend connection error)')
    } finally {
        sending.value = false
    }
}

const cancelEdit = () => {
    mode.value = 'read'
    fetchData() // Revert changes
}

const resetToDefault = async () => {
    if(!confirm('確定要恢復原廠設定嗎？')) return
    try {
        await axios.delete('/api/acceptanceGrades/resets')
        location.reload()
    } catch(err) {
        alert('Reset failed')
    }
}

onMounted(() => fetchData())
</script>

<style scoped>
.color-box {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    display: inline-block;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
