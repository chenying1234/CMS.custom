<template>
 <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="框架合同" name="first">
          <template>
               <el-form :inline="true" :model="searchList1" class="el-form-inline">
                <el-form-item label="合同名称：">
                        <el-select v-model="searchList1.ContractID" placeholder="请选择" @change="getPriceDateData1">
                            <el-option v-for="item in ContractNameList" :key="item.ContractID" :label="item.ContractName" :value="item.ContractID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="预计支出项目：">
                        <el-select v-model="searchList1.ExpectCostID" placeholder="请选择">
                            <el-option v-for="item in ProjectedPayDL" :key="item.ExpectCostID" :label="item.ExpectPriceDate" :value="item.ExpectCostID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchItem()">查询</el-button>
                    <el-button type="primary" @click="addPayApply1" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加支出申请</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="payApplyData" v-loading="loading1" element-loading-text="拼命加载中" border stripe style="width: 100%">
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
                      <el-button type="text" @click="customerAudit(2, scope.row)" v-if="scope.row.AuditStatus=='主管审批通过'&&(roles[0]=='管理员'||roles[0]=='总经理')">总经理审批</el-button>
                      <el-button type="text" @click="addActualPay(scope.row)" v-if="scope.row.IsConfirm=='False'&&(roles[0]=='管理员'||roles[0]=='会计')">确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="TotalCount.payApply > PageSize.payApply" class="paginationW">
              <el-pagination @current-change="payApplyCurChange" :current-page="PageIndex.payApply" :page-size="PageSize.payApply" :total="TotalCount.payApply" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
          </template>
         </el-tab-pane>
         <el-tab-pane label="项目合同" name="second">
           <template>
               <el-form :inline="true" :model="searchList2" class="el-form-inline">
                <el-form-item label="合同名称：">
                        <el-select v-model="searchList2.ContractID" placeholder="请选择" @change="getPriceDateData2">
                            <el-option v-for="item in ContractNameList" :key="item.ContractID" :label="item.ContractName" :value="item.ContractID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="预计支出项目：">
                        <el-select v-model="searchList2.ExpectCostID" placeholder="请选择">
                            <el-option v-for="item in ProjectedPayDL" :key="item.ExpectCostID" :label="item.ExpectPriceDate" :value="item.ExpectCostID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchItem()">查询</el-button>
                    <el-button type="primary" @click="addPayApply1" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加支出申请</el-button>
                </el-form-item>
            </el-form>
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
                      <el-button type="text" @click="customerAudit(2, scope.row)" v-if="scope.row.AuditStatus=='主管审批通过'&&(roles[0]=='管理员'||roles[0]=='总经理')">总经理审批</el-button>
                      <el-button type="text" @click="addActualPay(scope.row)" v-if="scope.row.IsConfirm=='False'&&(roles[0]=='管理员'||roles[0]=='会计')">确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="TotalCount.payApply > PageSize.payApply" class="paginationW">
              <el-pagination @current-change="payApplyCurChange" :current-page="PageIndex.payApply" :page-size="PageSize.payApply" :total="TotalCount.payApply" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
          </template>
         </el-tab-pane>
         <el-tab-pane label="支出合同" name="third">
           <template>
               <el-form :inline="true" :model="searchList3" class="el-form-inline">
                <el-form-item label="合同名称：">
                        <el-select v-model="searchList3.ContractID" placeholder="请选择" @change="getPriceDateData3">
                            <el-option v-for="item in ContractNameList" :key="item.ContractID" :label="item.ContractName" :value="item.ContractID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="预计支出项目：">
                        <el-select v-model="searchList3.ExpectCostID" placeholder="请选择">
                            <el-option v-for="item in ProjectedPayDL" :key="item.ExpectCostID" :label="item.ExpectPriceDate" :value="item.ExpectCostID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchItem()">查询</el-button>
                    <el-button type="primary" @click="addPayApply1" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加支出申请</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="payApplyData" v-loading="loading3" element-loading-text="拼命加载中" border stripe style="width: 100%">
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
                      <el-button type="text" @click="customerAudit(2, scope.row)" v-if="scope.row.AuditStatus=='主管审批通过'&&(roles[0]=='管理员'||roles[0]=='总经理')">总经理审批</el-button>
                      <el-button type="text" @click="addActualPay(scope.row)" v-if="scope.row.IsConfirm=='False'&&(roles[0]=='管理员'||roles[0]=='会计')">确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="TotalCount.payApply > PageSize.payApply" class="paginationW">
              <el-pagination @current-change="payApplyCurChange" :current-page="PageIndex.payApply" :page-size="PageSize.payApply" :total="TotalCount.payApply" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
          </template>
         </el-tab-pane>
    </el-tabs>
</template>
 
<script>
import { mapGetters } from 'vuex'
import { GetExpectCostList,
ExpectInvoiceDDList, 
GetCostApplyList, 
GetActualCostList,
 ExpectCostDelete,
  ExpectCostNameDDL, 
  CostApplyDelete,
   ActualCostDelete ,
    ContractInvoiceDDList} from '@/api/payManagement'
export default {
  props: ['navOrder'],
  data() {
      return {
        ProjectedPayDL: [],
        payApplyData: [],
        actualPayData: [],
        PageIndex: {
        
          payApply: 1,
         
        },
        PageSize: {
        
          payApply: 0,
        
        },
        TotalCount: {
          
          payApply: 0,
        
        },
        loading1: false,
        loading2: false,
        loading3: false,
        contractID: 0,
        activeName:'first',
        searchList1: {
          ContractID: "",
          ExpectCostID: ""
        },
        searchList2: {
          ContractID: "",
          ExpectCostID: ""
        },
        searchList3: {
          ContractID: "",
          ExpectCostID: ""
        },
        ContractNameList:[],
      }
  },
  created() {
    //this.contractID = this.$route.params.cid;
      this.getPayApplyData();
      this.getPriceDateData1();
      this.getPriceDateData2();
      this.getPriceDateData3();
      this.ContractNameDL1();
      this.ContractNameDL2();
      this.ContractNameDL3();
  },
  computed: {
    ...mapGetters([
          'roles'
      ])
  },
  methods: {
     handleClick(tab, event) {
      console.log(tab, event);
    },
     //获取合同名称下拉框--项目合同
     ContractNameDL1() {
      ContractInvoiceDDList().then(res => {
        if(res.data.flag) {
          this.ContractNameList = res.data.contract_invoice;
          // console.log(this.ContractNameList);
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
  //获取合同名称下拉框--框架合同
     ContractNameDL2() {
      ContractInvoiceDDList().then(res => {
        if(res.data.flag) {
          this.ContractNameList = res.data.contract_invoice;
          // console.log(this.ContractNameList);
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
     //获取合同名称下拉框--支出合同
     ContractNameDL3() {
      ContractInvoiceDDList().then(res => {
        if(res.data.flag) {
          this.ContractNameList = res.data.contract_invoice;
          // console.log(this.ContractNameList);
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    //获取预计支出项目
     getPriceDateData1() {
      ExpectInvoiceDDList({
        contractID:this.searchList1.ContractID
      }).then(res => {
        this.searchList1.ExpectID='';
        if(res.data.flag) {
          this.InvoiceItemList = res.data.supplier_out;
          console.log(this.InvoiceItemList);
        }
        else{
           this.InvoiceItemList =[];
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
     getPriceDateData2() {
      ExpectInvoiceDDList({
        contractID:this.searchList1.ContractID
      }).then(res => {
        this.searchList1.ExpectID='';
        if(res.data.flag) {
          this.InvoiceItemList = res.data.supplier_out;
          console.log(this.InvoiceItemList);
        }
        else{
           this.InvoiceItemList =[];
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
     getPriceDateData3() {
      ExpectInvoiceDDList({
        contractID:this.searchList1.ContractID
      }).then(res => {
        this.searchList1.ExpectID='';
        if(res.data.flag) {
          this.InvoiceItemList = res.data.supplier_out;
          console.log(this.InvoiceItemList);
        }
        else{
           this.InvoiceItemList =[];
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    //下拉框联动
    getPriceDateData() {
      ExpectInvoiceDDList({
        contractID:this.searchList.ContractID
      }).then(res => {
        this.searchList.ExpectID='';
        if(res.data.flag) {
          this.InvoiceItemList = res.data.supplier_out;
          console.log(this.InvoiceItemList);
        }
        else{
           this.InvoiceItemList =[];
        }
      }).catch(err => {
          this.$message.error(err)
      });
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
       // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos)
    },
    projectedPayDownload(row) {
      window.open(this.getNameFile(row.ExpectCostAttachment, '\/'));
    },

    //操作 支出申请列表
    addPayApply(row) {
      this.$router.push({name: '支出申请的添加', params: { pid: this.contractID, flag: 'add', id: row.ID}});
    },
    addPayApply1() {
      this.$router.push({name: '支出申请的添加', params: { pid: this.contractID, flag: 'add', id: 0}});
    },
    editPayApply(row) {
      this.$router.push({name: '支出申请的修改', params: { pid: this.contractID, flag: 'edit', id: row.ID}});
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
      this.$router.push({name: '支出申请的审批', params: { pid: this.contractID, id: row.ID}});
    },

    //操作 实际支出列表
    addActualPay(row) {
      this.$router.push({name: '支出实际支出添加', params: { pid: this.contractID, flag: 'add', ECid: row.ExpectCostID, CAid: row.ID}});
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
