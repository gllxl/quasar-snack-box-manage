<template>

  <base-content>
    <div class="container q-pa-lg q-gutter-md">
      <q-tabs
        v-model="noticeType"
        align="justify"
        narrow-indicator
      >
        <q-tab :class='noticeType === `replenishment` ? `text-blue` : ``' name="replenishment" label="补货订单" />
        <q-tab :class='noticeType === `replenishmentHistory` ? `text-blue` : ``' name="replenishmentHistory" label="补货历史记录" />
      </q-tabs>
      <q-tab-panels
        v-model="noticeType"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="bg-transparent text-center"
      >
        <q-tab-panel name="replenishment">
          <div class="q-pa-xs">
            <div class="row">
              <div v-for="(shop) in allReplenishment"
                   :key="shop.replenishmentItemId" class="col-6 q-pa-sm">
                <q-card flat bordered @click="getReplenishmentDetailInfo(shop)">
                  <q-linear-progress size="2px" :value="1" :color="shop.isFinish ? 'teal' : 'red'"/>
                  <q-card-section>

                    <q-list v-ripple="false" padding class="rounded-borders">
                      <q-item v-ripple="false">
                        <q-item-section class="text-weight-bold">
                          {{shop.replenishmentShopAddress}}
                        </q-item-section>
                      </q-item>

                    </q-list>
                    <q-separator/>
                    <q-card-actions class="text-grey">
                      {{shop.CreatTime}}
                    </q-card-actions>
                  </q-card-section>

                  <!--        <q-card-actions>-->
                  <!--          <div class="text-caption text-grey">-->
                  <!--            {{order.orderTime}}-->
                  <!--          </div>-->
                  <!--          <q-space/>-->
                  <!--          <div class="text-caption text-grey">-->
                  <!--            实付:-->
                  <!--          </div>-->
                  <!--          <span class="text-m-orange">-->
                  <!--                ￥{{order.orderPrice}}-->
                  <!--              </span>-->
                  <!--        </q-card-actions>-->

                </q-card>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="replenishmentHistory">
          <q-table
            class="box-shadow"
            :grid="mode=='grid'"
            title="补货记录"
            :data="replenishmentHistory"
            :columns="boxColumns"
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
                <q-td key="replenishmentId" :props="props">{{ props.row.replenishmentId }}</q-td>
                <q-td key="replenishmentShopAddress" :props="props">{{ props.row.replenishmentShopAddress }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
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
          name: 'replenishmentId',
          align: 'left',
          label: '补货单Id',
          field: 'replenishmentId',
          sortable: true
        },
        {
          name: 'replenishmentShopAddress',
          align: 'center',
          label: '地址',
          field: 'replenishmentShopAddress',
          sortable: true
        },
        {
          name: 'replenishmentAllPrice',
          align: 'center',
          label: '价格',
          field: 'replenishmentAllPrice',
          sortable: true
        },
        {
          name: 'replenishmentAllPrice',
          align: 'center',
          label: '价格',
          field: 'replenishmentAllPrice',
          sortable: true
        }
      ],
      allReplenishment: [],
      replenishmentHistory: []
    }
  },
  created () {
    this.getAllReplenishmentInfo()
  },
  methods: {
    handleTableClick (e) {
      this.$router.push({
        path: 'boxDetail',
        query: {
          id: e.shopId
        }
      })
    },

    getAllReplenishmentInfo () {
      const query = {
        url: '/admin/findReplenishmentInfo',
        responseType: 'text',
        params: {}
      }
      this.$fetchData(query).then(res => {
        this.allReplenishment = res.data.data.info
      }).catch(error => {
        console.log(error)
      })
    },

    getAllReplenishmentHistory () {
      const query = {
        url: '/admin/findReplenishmentInfo',
        responseType: 'text',
        params: {}
      }
      this.$fetchData(query).then(res => {
        this.allReplenishment = res.data.data.info
        console.log(this.allReplenishment)
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
