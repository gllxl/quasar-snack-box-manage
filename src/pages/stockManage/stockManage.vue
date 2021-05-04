<template>

  <base-content>
    <div class="container q-pa-lg q-gutter-md">
      <q-table
        class="box-shadow"
        :grid="mode=='grid'"
        title="库存管理"
        :data="allItem"
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
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? '退出' : '全屏'}}
            </q-tooltip>
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
            >{{mode==='grid' ? '列表' : '网格'}}
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
            <q-td key="itemId" :props="props">{{ props.row.itemId }}</q-td>
            <q-td key="itemName" :props="props">{{ props.row.itemName }}</q-td>
            <q-td key="itemPrice" :props="props">{{ props.row.itemPrice }}</q-td>
            <q-td key="salesVolumeAll" :props="props">{{ props.row.salesVolumeAll }}</q-td>
            <q-td key="stockCurrentAll" :props="props">{{ props.row.stockCurrentAll }}</q-td>
            <q-td key="operating" :props="props">
              <q-btn class="btn-table text-white" icon="tune" label="详情" @click="handleTableClick(props.row)"/>
            </q-td>
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
  name: 'stockManage',
  components: {
    BaseContent
  },
  data () {
    return {
      filter: '',
      mode: 'list',
      columns: [
        {
          name: 'itemId',
          align: 'left',
          label: '商品Id',
          field: 'itemId',
          sortable: true
        },
        {
          name: 'itemName',
          required: true,
          label: '商品名称',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'itemPrice',
          label: '商品价格',
          field: 'itemPrice',
          sortable: true
        },
        {
          name: 'salesVolumeAll',
          label: '总销量',
          field: 'salesVolumeAll',
          sortable: true
        },
        {
          name: 'stockCurrentAll',
          label: '库存',
          field: 'stockCurrentAll',
          sortable: true
        },
        {
          name: 'operating',
          label: 'operating',
          align: 'center',
          field: 'operating',
          sortable: true
        }
      ],
      allItem: []
    }
  },
  created () {
    this.getAllItem()
    this.getHistoryDetail()
  },
  methods: {
    handleTableClick (e) {
      this.$router.push({
        path: 'tableDetail',
        query: {
          id: e.name
        }
      })
    },

    getAllItem () {
      const query = {
        url: '/admin/findAllItem',
        responseType: 'text',
        params: {}
      }
      this.$fetchData(query).then(res => {
        console.log(res.data)
        this.allItem = res.data.data.info
      }).catch(error => {
        console.log(error)
      })
    },

    getHistory () {
      const query = {
        url: '/opeartionRecord/getAllOpeartionRecord',
        responseType: 'text',
        params: {}
      }
      this.$fetchData(query).then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getHistoryDetail () {
      const query = {
        url: '/opeartionRecord/getOpeartionRecordDetail',
        responseType: 'text',
        params: {
          operationRecordSerial: '6ea394c642de40639ef7e75c23cc25da'
        }
      }
      this.$fetchData(query).then(res => {
        console.log(res.data)
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
        'stockManage.csv',
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
