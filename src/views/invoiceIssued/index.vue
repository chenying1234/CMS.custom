<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="框架合同" name="first">
            <template>
            <el-button type="primary" @click="addIncomeApplication1" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加收款申请</el-button> 
            <el-table :data="IncomeApplyData" v-loading="loading1" element-loading-text="拼命加载中" border stripe style="width: 100%">
                <el-table-column prop="ExpectRecieptID" label="预计收款ID" min-width="110"></el-table-column>
                <el-table-column prop="ID" label="收款申请ID" min-width="110"></el-table-column>
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
                    <el-button type="text" @click="customerAudit(scope.row)" v-if="scope.row.InvoiceAudit == '待审批' && roles[0]=='主管'">主管审批</el-button>
                    <el-button type="text" @click="incomeDistribution(scope.row)" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">收入分配</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div v-if="TotalCount1.IncomeApply > PageSize1.IncomeApply" class="paginationW">
                <el-pagination @current-change="IncomeApplyCurChange" :current-page="PageIndex1.IncomeApply" :page-size="PageSize1.IncomeApply" :total="TotalCount1.IncomeApply" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
            </template>
        </el-tab-pane>
        <el-tab-pane label="项目合同" name="second">
                <template>
                <el-button type="primary" @click="addIncomeApplication1" v-if="roles[0]=='管理员'||roles[0]=='销售经理'">添加收款申请</el-button>             
                <el-table :data="IncomeApplyData1" v-loading="loading2" element-loading-text="拼命加载中" border stripe style="width: 100%">
                    <el-table-column prop="ExpectRecieptID" label="预计收款ID" min-width="110"></el-table-column>
                    <el-table-column prop="ID" label="收款申请ID" min-width="110"></el-table-column>
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
                        <el-button type="text" @click="addActualIncome(scope.row)" v-if="roles[0]=='管理员'||roles[0]=='会计'">确认</el-button>
                        <el-button type="text" @click="customerAudit(scope.row)" v-if="scope.row.InvoiceAudit == '待审批' && (roles[0]=='管理员'||roles[0]=='主管')">主管审批</el-button>
                        <el-button type="text" @click="incomeDistribution(scope.row)" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">收入分配</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="TotalCount.IncomeApply > PageSize.IncomeApply" class="paginationW">
                    <el-pagination @current-change="IncomeApplyCurChange1" :current-page="PageIndex.IncomeApply" :page-size="PageSize.IncomeApply" :total="TotalCount.IncomeApply" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
                </template>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import { mapGetters } from "vuex";
import {
  //InvoiceApplyList,
  // ExpectRecieptDelete,
  // InvoiceDelete,
  InvoiceApplyDelete,
  InvoiceApplyContractList,
} from "@/api/incomeManagement";
export default {
  data() {
    return {
      IncomeApplyData: [],
      IncomeApplyData1: [],
      PageIndex: {
        IncomeApply: 1
      },
      PageSize: {
        IncomeApply: 0
      },
      TotalCount: {
        IncomeApply: 0
      },
       PageIndex1: {
        IncomeApply: 1
      },
      PageSize1: {
        IncomeApply: 0
      },
      TotalCount1: {
        IncomeApply: 0
      },
      loading1: false,
      loading2: false,
      contractID: 0,
      ExpectID: 0,
      
    };
  },
  mounted:{
    ...mapGetters('incomeMag',[
      activeName
    ])
  },
  created() {
    // this.contractID = this.$route.params.cid;
    // this.getIncomeApplyData();
     this.getIncomeApplyData1();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //加载发票开具列表数据
     //框架合同列表
    // getIncomeApplyData() {
    //      this.loading1 = true;
    //      InvoiceApplyList({
    //     // cid: this.contractID,
    //     // PageNum: this.PageIndex.IncomeApply
    //      })
    //     .then(res => {
    //       this.loading1 = false;
    //       if (res.data.Result) {
    //         this.IncomeApplyData = res.data.data;
    //         this.PageSize.IncomeApply = res.data.PageSize;
    //         this.TotalCount.IncomeApply = res.data.Count;
    //       } else {
    //         console.log("收款申请列表数据加载失败");
    //       }
    //     })
    //     .catch(err => {
    //       this.loading1 = false;
    //       this.$message.error(err);
    //     });
    // },
     //加载发票开具列表数据
     //项目合同列表
    getIncomeApplyData1(data){
         this.loading2 = true;
        InvoiceApplyContractList({
         cid: data||this.contractID,
         PageNum: this.PageIndex.IncomeApply,
         eid:this.ExpectID         
        })
        .then(res => {
          this.loading2 = false;
          if (res.data.Result) {
            this.IncomeApplyData1 = res.data.data;
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
     // this.getIncomeApplyData();
     
    },
    IncomeApplyCurChange1(val) {
      this.PageIndex.IncomeApply = val;
      this.getIncomeApplyData1();
    },
    //操作 收款(发票)申请列表
    addIncomeApplication(row) {
      this.$router.push({
        name: "发票申请添加",
        params: { pid: this.contractID, flag: "add", id: row.ID }
      });
    },
    addIncomeApplication1() {
      this.$router.push({
        name: "发票申请添加",
        params: { pid: this.contractID, flag: "add", id: 0 }
      });
    },
    editIncomeApplication(row) {
      this.$router.push({
        name: "发票申请修改",
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
                this.getIncomeApplyData1();
               
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
        name: "发票申请审批",
        params: { pid: this.contractID, id: row.ID }
      });
    },
    incomeDistribution(row) {
      // this.$router.push({ name: "修改发票收入分配", params: { pid: this.contractID } });
       localStorage.setItem("ProjectInvoicePrice",row.InvoicePrice);
      this.$router.push({name: "发票收入分配", params: {pid: this.contractID, id: row.ID}});
    },
   //操作 实际收入列表
    addActualIncome(row) {
    //   localStorage.setItem("ProjectInvoicePrice",row.ExpectRecieptID);
      this.$router.push({
        name: "发票实际收入添加",
        params: {
          pid: this.contractID,
          flag: "add",
          id: row.ExpectRecieptID,
          caid: row.ID
        }
      });
    },
    // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos);
    },
    actualIncomeDownload(row) {
      window.open(this.getNameFile(row.InvoiceAttachment, "/"));
    },
    // 搜索
    searchItem() {
         this.getIncomeApplyData1(this.searchList.ContractID);
    }
  },
  computed: {
    ...mapGetters(["roles"])
  }
};
</script>

<style lang="less" scoped>
.income_wrapper {
  .el-table th {
    background-color: #51d2b7;
    div {
      background-color: #51d2b7;
    }
  }
}
</style>
