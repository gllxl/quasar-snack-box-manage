<template>

  <base-content>
    <div class="container q-pa-lg q-gutter-md">
      <q-table
        class="box-shadow"
        :grid="mode=='grid'"
        title="盘货记录"
        :data="allInventoryRecord"
        :columns="columns"
        :filter="filter"
        row-key="name"
        style="flex: 1;"
      >
        <template v-slot:top-right="props">
          <q-input dense debounce="300" v-model="filter" placeholder="搜索">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            class="q-mx-md"
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltipF
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{ props.inFullscreen ? '退出' : '全屏' }}
            </q-tooltipF>
          </q-btn>

          <q-btn
            flat
            round
            dense
            class="q-mx-md"
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{ mode === 'grid' ? '列表' : '网格' }}
            </q-tooltip>
          </q-btn>
          <q-btn
            class="btn-table q-mx-md text-white"
            icon-right="archive"
            label="导出Excel"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="inventoryRecordId" :props="props">{{ props.row.inventoryRecordId }}</q-td>
            <q-td key="inventoryRecordShopName" :props="props">{{ props.row.inventoryRecordShopName }}</q-td>
            <q-td key="inventoryRecordCreatedTime" :props="props">{{ props.row.inventoryRecordCreatedTime }}</q-td>
            <q-td key="inventoryRecordIsDefect" :props="props">{{ props.row.inventoryRecordIsDefect }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </base-content>

</template>

<script>

import BaseContent from '../../components/BaseContent/BaseContent'
import { wrapCsvValue } from 'src/utils/exportCsv'
import { exportFile } from 'quasar'

export default {
  name: 'recordManage',
  components: {
    BaseContent
  },
  data () {
    return {
      filter: '',
      mode: 'list',
      noticeType: 'replenishment',
      columns: [
        {
          name: 'inventoryRecordId',
          align: 'left',
          label: '盘货单Id',
          field: 'inventoryRecordId',
          sortable: true
        },
        {
          name: 'inventoryRecordShopName',
          align: 'center',
          label: '地址',
          field: 'inventoryRecordShopName',
          sortable: true
        },
        {
          name: 'inventoryRecordCreatedTime',
          align: 'center',
          label: '盘货时间',
          field: 'inventoryRecordCreatedTime',
          sortable: true
        },
        {
          name: 'inventoryRecordIsDefect',
          align: 'center',
          label: '状态',
          field: 'inventoryRecordIsDefect',
          sortable: true
        }
      ],
      allInventoryRecord: [],
      replenishmentHistory: []
    }
  },
  created () {
    this.getAllInventoryRecordInfo()
  },
  methods: {

    getAllInventoryRecordInfo () {
      const query = {
        url: '/ir/getAll',
        responseType: 'text',
        params: {}
      }
      this.$fetchData(query).then(res => {
        this.allInventoryRecord = res.data.data.info
      }).catch(error => {
        console.log(error)
      })
    },

    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.allItem.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === undefined ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'boxManage.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: '浏览器拒绝文件下载',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="css" scoped>
.my-card {
  width: 100%;
  min-height: 390px;
  height: 100%;
  /*max-width: 350px;*/
}

.income {
  width: 100%;
  background: linear-gradient(to right, #68E4BC 0%, #4AD0D1 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #0db4afb8;
  background-size: 200% auto;
}

.income:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(13, 180, 175, 0.72);
}

.expense {
  width: 100%;
  background: linear-gradient(to left, #FCAC94 0%, #f3a183 98%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #FCA76C;
  background-size: 200% auto;
}

.expense:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #FCA76C;
}

.total {
  width: 100%;
  background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px rgba(240, 115, 200, 0.73);
  background-size: 200% auto;
}

.total:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(240, 115, 200, 0.73);
}

.btn-table {
  background: linear-gradient(to right, #36d1dc, #5b86e5);
  transition: all 0.3s ease-in-out;
}

.btn-table:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
