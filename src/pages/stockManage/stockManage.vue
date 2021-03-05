<template>

  <base-content>
    <div class="container q-pa-lg q-gutter-md">
      <q-table
        class="box-shadow"
        :grid="$q.screen.xs"
        title="库存管理"
        :data="allItem"
        :columns="columns"
        :filter="filter"
        row-key="name"
        style="flex: 1;"
      >
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="搜索">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
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

export default {
  name: 'stockManage',
  components: {
    BaseContent
  },
  data () {
    return {
      filter: '',
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
    this.getHistory()
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
        this.allItem = res.data.AllItemInfo
        console.log(this.allItem)
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
