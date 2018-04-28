<template>
  <div class="pay_wrapper">
    <div class="listBox" id="projectedPayList">
      <h3>
        预计支出列表
        <el-button type="primary" @click="addProjectedPay" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加预计支出</el-button>
      </h3>
      <el-table :data="projectedPayData" v-loading="loading1" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ID" label="预计支出ID" min-width="110"></el-table-column>
        <el-table-column prop="ExpectCostName" label="预计支出项目" min-width="135"></el-table-column>
        <el-table-column prop="ExpectCostDate" label="预计支出日期" min-width="130"></el-table-column>
        <el-table-column prop="ExpectCostPrice" label="预计支出价格" min-width="130"></el-table-column>
        <el-table-column prop="ExpectCostIncome" label="此项预计收入" min-width="130"></el-table-column>
        <el-table-column label="预计支出凭证" min-width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="projectedPayDownload(scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="InputUser" label="添加人" min-width="120"></el-table-column>
        <el-table-column prop="InputDate" label="添加时间" min-width="120"></el-table-column>
        <el-table-column label="管理列" min-width="160" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">
            <template slot-scope="scope">
              <el-button type="text" @click="editProjectedPay(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteProjectedPay(scope.row)">删除</el-button>
              <el-button type="text" @click="addPayApply(scope.row)" v-if="scope.row.IsApply=='False'">申请</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div v-if="TotalCount.projectedPay > PageSize.projectedPay" class="paginationW">
        <el-pagination @current-change="projectedPayCurChange" :current-page="PageIndex.projectedPay" :page-size="PageSize.projectedPay" :total="TotalCount.projectedPay" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <div class="listBox" id="payApplyList">
      <h3>支出申请列表
        <el-button type="primary" @click="addPayApply1" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加支出申请</el-button>
      </h3>
      <el-table :data="payApplyData" v-loading="loading2" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ExpectCostID" label="预计支出ID" min-width="110"></el-table-column>
        <el-table-column prop="ID" label="支出申请ID" min-width="110"></el-table-column>
        <el-table-column prop="SupplierName" label="供应商名称" min-width="120"></el-table-column>
        <el-table-column prop="SupplierContactName" label="供应商联系人姓名" min-width="150"></el-table-column>
        <el-table-column prop="SupplierContactPhone" label="供应商联系人电话" min-width="150"></el-table-column>
        <el-table-column prop="SupplierContactEmail" label="供应商联系人Email" min-width="160"></el-table-column>
        <el-table-column prop="SupplierType" label="供应商类型" min-width="120"></el-table-column>
        <el-table-column prop="ProjectOwner" label="项目负责人" min-width="120"></el-table-column>
        <el-table-column prop="SupplierOwner" label="对供应商联系人" min-width="140"></el-table-column>
        <el-table-column prop="ServiceType" label="服务类别" min-width="110"></el-table-column>
        <el-table-column prop="ServiceContent" label="服务内容" min-width="110"></el-table-column>
        <el-table-column prop="ServiceStartTime" label="服务开始时间" min-width="130"></el-table-column>
        <el-table-column prop="ServiceEndTime" label="服务结束时间" min-width="130"></el-table-column>
        <el-table-column prop="PaidWay" label="支出方式" min-width="100"></el-table-column>
        <el-table-column prop="InvoiceType" label="发票类型" min-width="140"></el-table-column>
        <el-table-column prop="AuditStatus" label="条目审核情况" min-width="140"></el-table-column>
        <el-table-column label="是否已确认" min-width="110">
          <template slot-scope="scope">
            {{scope.row.IsConfirm=='False' ? '否' : '是'}}
          </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注" min-width="150"></el-table-column>
        <el-table-column label="管理列" min-width="195">
            <template slot-scope="scope">
              <el-button type="text" @click="editPayApply(scope.row)" v-if="(roles[0]=='管理员'||roles[0]=='销售经理')&&scope.row.AuditStatus!='总经理审批通过'">修改</el-button>
              <el-button type="text" @click="deletePayApply(scope.row)" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">删除</el-button>
              <el-button type="text" @click="customerAudit(1, scope.row)" v-if="scope.row.AuditStatus=='待审批'&&(roles[0]=='管理员'||roles[0]=='主管')">主管审批</el-button>
              <!-- <el-button type="text" @click="customerAudit(1, scope.row)" v-if="scope.row.AuditStatus == '待审批'&&roles[0]=='总经理'" disabled>主管审批</el-button> -->
              <el-button type="text" @click="customerAudit(2, scope.row)" v-if="scope.row.AuditStatus=='主管审批通过'&&(roles[0]=='管理员'||roles[0]=='总经理')">总经理审批</el-button>
              <el-button type="text" @click="addActualPay(scope.row)" v-if="scope.row.IsConfirm=='False'&&(roles[0]=='管理员'||roles[0]=='会计')">确认</el-button>
              <!-- <div v-if="scope.row.AuditStatus == '总经理审批拒绝'&&(roles[0]=='管理员')">总经理审批拒绝</div>
              <div v-if="(scope.row.AuditStatus == '总经理审批通过'||scope.row.AuditStatus == '总经理审批拒绝')&&roles[0]=='总经理'">已审批</div>
              <div v-if="scope.row.AuditStatus == '主管审批拒绝'&&(roles[0]=='管理员'||roles[0]=='总经理')">主管审批拒绝</div>
              <div v-if="(scope.row.AuditStatus == '主管审批通过' || scope.row.AuditStatus == '主管审批拒绝')&&roles[0]=='主管'">已审批</div> -->
            </template>
        </el-table-column>
      </el-table>
      <div v-if="TotalCount.payApply > PageSize.payApply" class="paginationW">
        <el-pagination @current-change="payApplyCurChange" :current-page="PageIndex.payApply" :page-size="PageSize.payApply" :total="TotalCount.payApply" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <div class="listBox" id="actualPayList">
      <h3>实际支出列表
        <!-- <el-button type="primary" @click="addActualPay1" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加实际支出</el-button> -->
      </h3>
      <el-table :data="actualPayData" v-loading="loading3" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ExpectCostID" label="预计支出ID" min-width="110"></el-table-column>
        <el-table-column prop="CostApplyID" label="支出申请ID" min-width="110"></el-table-column>
        <el-table-column prop="ActualCostPrice" label="实际支出金额" min-width="125"></el-table-column>
        <el-table-column label="实际支出凭证" min-width="125">
           <template slot-scope="scope">
            <el-button type="text" @click="actualPayDownload(scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="InputUser" label="添加人" min-width="120"></el-table-column>
        <el-table-column prop="InputDate" label="添加时间" min-width="120"></el-table-column>
        <el-table-column label="管理列" min-width="120" v-if="roles[0]=='管理员'||roles[0]=='会计'">
            <template slot-scope="scope">
              <el-button type="text" @click="editActualPay(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteActualPay(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div v-if="TotalCount.actualPay > PageSize.actualPay" class="paginationW">
        <el-pagination @current-change="actualPayCurChange" :current-page="PageIndex.actualPay" :page-size="PageSize.actualPay" :total="TotalCount.actualPay" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
import { GetExpectCostList, GetCostApplyList, GetActualCostList, ExpectCostDelete, ExpectCostNameDDL, CostApplyDelete, ActualCostDelete } from '@/api/payManagement'
export default {
  props: ['navOrder'],
  data() {
      return {
        ProjectedPayDL: [],
        projectedPayData: [],
        payApplyData: [],
        actualPayData: [],
        PageIndex: {
          projectedPay: 1,
          payApply: 1,
          actualPay: 1
        },
        PageSize: {
          projectedPay: 0,
          payApply: 0,
          actualPay: 0
        },
        TotalCount: {
          projectedPay: 0,
          payApply: 0,
          actualPay: 0
        },
        loading1: false,
        loading2: false,
        loading3: false,
        contractID: 0
      }
  },
  created() {
    this.contractID = this.$route.params.cid;
      this.getProjectedPayData();
      this.getPayApplyData();
      this.getActualPayData();
  },
  computed: {
    ...mapGetters([
          'roles'
      ])
  },
  methods: {
    //加载预计支出列表数据
    getProjectedPayData() {
      this.loading1 = true;
      GetExpectCostList({contractID: this.contractID, pageIndex: this.PageIndex.projectedPay}).then(res => {
        this.loading1 = false;
        // console.log(res)
        if(res.data.flag) {
          this.projectedPayData = res.data.List;
          this.PageSize.projectedPay = res.data.pageSize;
          this.TotalCount.projectedPay = res.data.Total;
           
        } else {
          console.log('预计支出列表数据加载失败')
        }
      }).catch(err => {
        this.loading1 = false;
        this.$message.error(err);
      })
    },
    projectedPayCurChange(val) {
      this.PageIndex.projectedPay = val;
      this.getProjectedPayData();
    },
    //加载支出申请列表数据
    getPayApplyData() {
      this.loading2 = true;
      GetCostApplyList({contractID: this.contractID, pageIndex: this.PageIndex.payApply}).then(res => {
        this.loading2 = false;
        console.log(res)
        if(res.data.flag) {
          this.payApplyData = res.data.List;
          this.PageSize.payApply = res.data.pageSize;
          this.TotalCount.payApply = res.data.Totel;
      
        } else {
          console.log('支出申请列表数据加载失败')
        }
      }).catch(err => {
        this.loading2 = false;
        this.$message.error(err);
      })
    },
    payApplyCurChange(val) {
      this.PageIndex.payApply = val;
      this.getPayApplyData();
    },
    //加载实际支出列表数据
    getActualPayData() {
      this.loading3 = true;
      GetActualCostList({contractID: this.contractID, pageIndex: this.PageIndex.actualPay}).then(res => {
        this.loading3 = false;
        if(res.data.flag) {
          this.actualPayData = res.data.List;
          this.PageSize.actualPay = res.data.pageSize;
          this.TotalCount.actualPay = res.data.Total;
             
        } else {
          console.log('实际支出列表数据加载失败')
        }
      }).catch(err => {
        this.loading3 = false;
        this.$message.error(err);
      })
    },
    actualPayCurChange(val) {
      this.PageIndex.actualPay = val;
      this.getActualPayData();
    },

       // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos)
    },
    //操作 预计支出列表
    addProjectedPay() {
      this.$router.push({name: '预计支出添加', params: { pid: this.contractID, flag: 'add'}});
    },
    editProjectedPay(row) {
      this.$router.push({name: '预计支出修改', params: { pid: this.contractID, flag: 'edit', id: row.ID}});
    },
    deleteProjectedPay(row) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(() => {
        ExpectCostDelete({ID : row.ID}).then(res => {
          if(res.data.flag) {
            this.$message.success('删除成功！');
            this.getProjectedPayData();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }).catch(() => {
        this.$message.info('已取消删除！');
      })
    },
    projectedPayDownload(row) {
      window.open(this.getNameFile(row.ExpectCostAttachment, '\/'));
    },

    //操作 支出申请列表
    addPayApply(row) {
      this.$router.push({name: '支出申请添加', params: { pid: this.contractID, flag: 'add', id: row.ID}});
    },
    addPayApply1() {
      this.$router.push({name: '支出申请添加', params: { pid: this.contractID, flag: 'add', id: 0}});
    },
    editPayApply(row) {
      this.$router.push({name: '支出申请修改', params: { pid: this.contractID, flag: 'edit', id: row.ID}});
    },
    deletePayApply(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(() => {
        CostApplyDelete({ID : row.ID}).then(res => {
          if(res.data.flag) {
            this.$message.success('删除成功！');
            this.getPayApplyData();
            this.getProjectedPayData();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }).catch(() => {
        this.$message.info('已取消删除！');
      })
    },
    customerAudit(level, row){
      this.$store.commit('payMag/SET_AUDITLEVEL', level);
      this.$router.push({name: '支出申请审批', params: { pid: this.contractID, id: row.ID}});
    },

    //操作 实际支出列表
    addActualPay(row) {
      this.$router.push({name: '实际支出添加', params: { pid: this.contractID, flag: 'add', ECid: row.ExpectCostID, CAid: row.ID}});
    },
    addActualPay1() {
      this.$router.push({name: '实际支出添加', params: { pid: this.contractID, flag: 'add', ECid: 0, CAid: 0}});
    },
    editActualPay(row) {
      this.$router.push({name: '实际支出修改', params: { pid: this.contractID, flag: 'edit', id: row.ID}});
    },
    deleteActualPay(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(() => {
        ActualCostDelete({ID : row.ID}).then(res => {
          if(res.data.flag) {
            this.$message.success('删除成功！');
            this.getActualPayData();
            this.getPayApplyData();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }).catch(() => {
        this.$message.info('已取消删除！');
      })
    },
    actualPayDownload(row) {
      window.open(this.getNameFile(row.ActualCostAttachment, '\/'));
    }
  }
}
</script>

<style lang="less">
.pay_wrapper{
  .el-table th{
    background-color: #f7b1b8;
    div{
      background-color: #f7b1b8;
    }
  }
}
</style>
