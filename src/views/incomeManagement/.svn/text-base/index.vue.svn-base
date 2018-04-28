<template>
  <div class="income_wrapper">
    <div class="listBox" id="projectedIncomeList">
      <h3>预计收款列表
        <el-button type="primary" @click="addProjectedIncome" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加预计收款</el-button>
      </h3>
      <el-table :data="projectedIncomeData" v-loading="loading1" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ID" label="预计收款ID" min-width="110"></el-table-column>
        <el-table-column prop="ExpectRecieptDate" label="预计收入时间" min-width="125"></el-table-column>
        <el-table-column prop="ExpectRecieptPrice" label="预计收入金额" min-width="125"></el-table-column>
        <el-table-column prop="CustomerContact" label="客户经办人" min-width="120"></el-table-column>
        <el-table-column prop="InputUser" label="添加人" min-width="120"></el-table-column>
        <el-table-column prop="InputDate" label="添加时间" min-width="120"></el-table-column>
        <el-table-column label="管理列" min-width="150" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">
            <template slot-scope="scope">
              <el-button type="text" @click="editProjectedIncome(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteProjectedIncome(scope.row)">删除</el-button>
              <el-button type="text" @click="addIncomeApplication(scope.row)" v-if="scope.row.IsApply=='False'">申请</el-button>
            </template>
        </el-table-column>
      </el-table>
       <div v-if="TotalCount.projectedIncome > PageSize.projectedIncome" class="paginationW">
        <el-pagination @current-change="projectedIncomeCurChange" :current-page="PageIndex.projectedIncome" :page-size="PageSize.projectedIncome" :total="TotalCount.projectedIncome" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <div class="listBox" id="incomeApplyList">
      <h3>收款(发票)申请列表
        <el-button type="primary" @click="addIncomeApplication1" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加收款申请</el-button>
      </h3>
      <el-table :data="IncomeApplyData" v-loading="loading2" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ExpectRecieptID" label="预计收款ID" min-width="110"></el-table-column>
        <el-table-column prop="ID" label="收款(发票)申请ID" min-width="110"></el-table-column>
        <el-table-column prop="InvoiceItem" label="发票项目" min-width="120"></el-table-column>
        <el-table-column prop="InvoicePrice" label="发票价格" min-width="100"></el-table-column>
        <el-table-column prop="InvoiceAudit" label="审核状态" min-width="100"></el-table-column>
        <el-table-column prop="InvoiceRemark" label="备注" min-width="120"></el-table-column>
        <el-table-column prop="InvoiceAuditUse" label="发票审核人" min-width="125"></el-table-column>
        <el-table-column prop="InputUser" label="添加人" min-width="120"></el-table-column>
        <el-table-column prop="InputDate" label="添加时间" min-width="120"></el-table-column>
        <el-table-column label="是否已确认" min-width="110">
          <template slot-scope="scope">
            {{scope.row.IsConfirm=='False' ? '否' : '是'}}
          </template>
        </el-table-column>
        <el-table-column label="管理列" min-width="190" v-if="roles[0]!='总经理'">
            <template slot-scope="scope">
              <el-button type="text" @click="editIncomeApplication(scope.row)" v-if="scope.row.InvoiceAudit == '待审批' &&(roles[0]=='管理员'||roles[0]=='销售经理')">修改</el-button>
              <el-button type="text" @click="deleteIncomeApplication(scope.row)" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">删除</el-button>
              <el-button type="text" @click="addActualIncome(scope.row)" v-if="scope.row.IsConfirm=='False'&&(roles[0]=='管理员'||roles[0]=='会计')">确认</el-button>
              <el-button type="text" @click="customerAudit(scope.row)" v-if="scope.row.InvoiceAudit == '待审批' && (roles[0]=='管理员'||roles[0]=='主管')">主管审批</el-button>
              <el-button type="text" @click="incomeDistribution(scope.row)" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">收入分配</el-button>

            </template>
        </el-table-column>
      </el-table>
       <div v-if="TotalCount.IncomeApply > PageSize.IncomeApply" class="paginationW">
        <el-pagination @current-change="IncomeApplyCurChange" :current-page="PageIndex.IncomeApply" :page-size="PageSize.IncomeApply" :total="TotalCount.IncomeApply" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <div class="listBox" id="actualIncomeList">
      <h3>实际收入列表</h3>
      <el-table :data="actualIncomeData" v-loading="loading3" element-loading-text="拼命加载中" border stripe style="width: 100%">
        <el-table-column prop="ExpectRecieptID" label="预计收款ID" min-width="110"></el-table-column> 
        <el-table-column prop="InvoiceApplyID" label="收款(发票)申请ID" min-width="110"></el-table-column>
        <el-table-column prop="InvoiceNo" label="发票号" min-width="100"></el-table-column>
        <el-table-column label="发票附件" min-width="120">
           <template slot-scope="scope">
            <el-button type="text" @click="actualIncomeDownload(scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ExpressNo" label="快递号" min-width="100"></el-table-column>
        <el-table-column prop="InputUser" label="添加人" min-width="120"></el-table-column>
        <el-table-column prop="InputDate" label="添加时间" min-width="120"></el-table-column>
        <el-table-column label="管理列" min-width="120" v-if="roles[0]=='管理员'||roles[0]=='会计'">
            <template slot-scope="scope">
              <el-button type="text" @click="editActualIncome(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteActualIncome(scope.row)">删除</el-button>
               
            </template>
        </el-table-column>
      </el-table>
       <div v-if="TotalCount.actualIncome > PageSize.actualIncome" class="paginationW">
        <el-pagination @current-change="actualIncomeCurChange" :current-page="PageIndex.actualIncome" :page-size="PageSize.actualIncome" :total="TotalCount.actualIncome" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
      <!-- <el-button type="primary" @click="addActualIncome1" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加实际收入</el-button> -->
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import {
  ExpectRecieptList,
  InvoiceApplyList,
  InvoiceList,
  ExpectRecieptDelete,
  InvoiceDelete,
  InvoiceApplyDelete
} from "@/api/incomeManagement";
export default {
  data() {
    return {
      projectedIncomeData: [],
      IncomeApplyData: [],
      actualIncomeData: [],
      PageIndex: {
        projectedIncome: 1,
        IncomeApply: 1,
        actualIncome: 1
      },
      PageSize: {
        projectedIncome: 0,
        IncomeApply: 0,
        actualIncome: 0
      },
      TotalCount: {
        projectedIncome: 0,
        IncomeApply: 0,
        actualIncome: 0
      },
      loading1: false,
      loading2: false,
      loading3: false,
      contractID: null,
      ExpectRecieptID: 0
    };
  },
  created() {
    this.contractID = this.$route.params.pid;
    this.getProjectedIncomeData();
    this.getIncomeApplyData();
    this.getActualIncomeData();
  },
  methods: {
    //加载预计收款列表数据
    getProjectedIncomeData() {
      this.loading1 = true;
      ExpectRecieptList({
        cid: this.contractID,
        PageNum: this.PageIndex.projectedIncome
      })
        .then(res => {
          this.loading1 = false;
          if (res.data.Result) {
            this.projectedIncomeData = res.data.data;
            this.PageSize.projectedIncome = res.data.PageSize;
            this.TotalCount.projectedIncome = res.data.Count;
            //  for (var i = 0; i < res.data.data.length; i++) {
            //   //格式化后台返回的 “添加时间”
            //   let myInputDate = this.projectedIncomeData[i].InputDate;
            //   let myStr = myInputDate.substr(0, 10);
            //   this.projectedIncomeData[i].InputDate = myStr;
            // }
          } else {
            console.log("预计收款列表数据加载失败");
          }
        })
        .catch(err => {
          this.loading1 = false;
          this.$message.error(err);
        });
    },
    projectedIncomeCurChange(val) {
      this.PageIndex.projectedIncome = val;
      this.getProjectedIncomeData();
    },
    //加载收款申请列表数据
    getIncomeApplyData() {
      this.loading2 = true;
      InvoiceApplyList({
        cid: this.contractID,
        PageNum: this.PageIndex.IncomeApply
      })
        .then(res => {
          this.loading2 = false;
          if (res.data.Result) {
            this.IncomeApplyData = res.data.data;
            this.PageSize.IncomeApply = res.data.PageSize;
            this.TotalCount.IncomeApply = res.data.Count;
          } else {
            console.log("收款申请列表数据加载失败");
          }
        })
        .catch(err => {
          this.loading2 = false;
          this.$message.error(err);
        });
    },
    IncomeApplyCurChange(val) {
      this.PageIndex.IncomeApply = val;
      this.getIncomeApplyData();
    },
    //加载实际收入列表数据
    getActualIncomeData() {
      this.loading3 = true;
      InvoiceList({
        cid: this.contractID,
        PageNum: this.PageIndex.actualIncome
      })
        .then(res => {
          this.loading3 = false;
          if (res.data.Result) {
            this.actualIncomeData = res.data.data;
            this.PageSize.actualIncome = res.data.PageSize;
            this.TotalCount.actualIncome = res.data.Count;
          } else {
            console.log("实际收入列表数据加载失败");
          }
        })
        .catch(err => {
          this.loading3 = false;
          this.$message.error(err);
        });
    },
    actualIncomeCurChange(val) {
      this.PageIndex.actualIncome = val;
      this.getActualIncomeData();
    },
    //操作 预计收款列表
    addProjectedIncome() {
      this.$router.push({
        name: "预计收款添加",
        params: { pid: this.contractID, flag: "add" }
      });
    },
    editProjectedIncome(row) {
      this.$router.push({
        name: "预计收款修改",
        params: { pid: this.contractID, flag: "edit", id: row.ID }
      });
    },
    deleteProjectedIncome(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ExpectRecieptDelete({ Id: row.ID })
            .then(res => {
              if (res.data.Result) {
                this.$message.success("删除成功！");
                this.getProjectedIncomeData();
              } else {
                this.$message.error(res.data.Message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },

    //操作 收款(发票)申请列表
    addIncomeApplication(row) {
      this.$router.push({
        name: "收款申请添加",
        params: { pid: this.contractID, flag: "add", id: row.ID }
      });
    },
    addIncomeApplication1() {
      this.$router.push({
        name: "收款申请添加",
        params: { pid: this.contractID, flag: "add", id: 0 }
      });
    },
    editIncomeApplication(row) {
      this.$router.push({
        name: "收款申请修改",
        params: { pid: this.contractID, flag: "edit", id: row.ID }
      });
    },
    deleteIncomeApplication(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          InvoiceApplyDelete({ Id: row.ID })
            .then(res => {
              if (res.data.Result) {
                this.$message.success("删除成功！");
                this.getIncomeApplyData();
                this.getProjectedIncomeData();
              } else {
                this.$message.error(res.data.Message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
    customerAudit(row) {
      // this.$store.commit("incomeMag/SET_AUDITLEVEL");
      this.$router.push({
        name: "收款申请审批",
        params: { pid: this.contractID, id: row.ID }
      });
    },
    incomeDistribution(row) {
      // this.$store.commit("incomeMag/SET_PROJECTINVOICEPRICE", row.InvoicePrice);
      localStorage.setItem("ProjectInvoicePrice",row.InvoicePrice);
      this.$router.push({name: "收入分配", params: {pid: this.contractID, id: row.ID}});
    },

    //操作 实际收入列表
    addActualIncome(row) {
      this.$router.push({
        name: "实际收入添加",
        params: {
          pid: this.contractID,
          flag: "add",
          id: row.ExpectRecieptID,
          caid: row.ID
        }
      });
    },
    addActualIncome1() {
      this.$router.push({
        name: "实际收入添加",
        params: { pid: this.contractID, flag: "add", id: 0, caid: 0 }
      });
    },
    editActualIncome(row) {
      this.$router.push({
        name: "实际收入修改",
        params: { pid: this.contractID, flag: "edit", id: row.ID }
      });
    },
    deleteActualIncome(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          InvoiceDelete({ Id: row.ID })
            .then(res => {
              if (res.data.Result) {
                this.$message.success("删除成功！");
                this.getActualIncomeData();
                this.getIncomeApplyData();
              } else {
                this.$message.error(res.data.Message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
    // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos);
    },
    actualIncomeDownload(row) {
      window.open(this.getNameFile(row.InvoiceAttachment, "/"));
    }
  },
  computed: {
    ...mapGetters(["roles"])
  }
};
</script>

<style lang="less">
.income_wrapper{
  .el-table th{
    background-color: #51d2b7;
    div{
      background-color: #51d2b7;
    }
  }
}
</style>
