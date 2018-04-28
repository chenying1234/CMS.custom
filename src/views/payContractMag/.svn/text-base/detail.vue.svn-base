<template>
  <div class="main_wrapper">
    <el-form :model="contractFormData" label-width="120px" class="form_inline">
      <el-form-item label="合同类型：">{{contractFormData.ContractType}}</el-form-item>
      <el-form-item label="合同名称：">{{contractFormData.ContractName}}</el-form-item>
      <el-form-item label="合同编号：">{{contractFormData.ContractNo}}</el-form-item>
      <el-form-item label="所属框架合同：">{{contractFormData.FrameworkContract}}</el-form-item>
      <el-form-item label="客户公司名称：">{{contractFormData.CustomerCompanyName}}</el-form-item>
      <el-form-item label="客户部门名称：">{{contractFormData.CustomerDeptmentName}}</el-form-item>
      <el-form-item label="合同生效日起：">{{contractFormData.ContractEffectiveDateBegin}}</el-form-item>
      <el-form-item label="合同生效日止：">{{contractFormData.ContractEffectiveDateEnd}}</el-form-item>
      <el-form-item label="签署日期：">{{contractFormData.SignDate}}</el-form-item>
      <el-form-item label="合同验收方式：">{{contractFormData.ContractAccpetance}}</el-form-item>
      <el-form-item label="合同含税价：">{{contractFormData.FaxPrice}}</el-form-item>
      <el-form-item label="签约公司：">{{contractFormData.SignCompany}}</el-form-item>
      <!-- <el-form-item label="框架合同附件：">{{contractFormData.ContractAttachment}}</el-form-item> -->
      <el-form-item label="风险评估：" style="width: 100%;">{{contractFormData.Risk}}</el-form-item>
    </el-form>

  <!-- 支出管理组件 -->
    <pay-management></pay-management>
    
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
import { contractDetail } from '@/api/contractManagement'
import { customerDepDDList } from '@/api/clientManagement'
import payManagement from '../payPayManagement'
export default {
  components: { payManagement },
  data() {
      return {
        contractFormData: {},
        Id: null,
        // fileName: ''
      }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters([
          'roles'
      ])
  },
  methods: {  
    getData() {
      this.Id = this.$route.params.pid;
      contractDetail({ID: this.Id}).then(res => {
        if(res.data.Result) {
          this.contractFormData = res.data;
          this.contractFormData.Risk = this.contractFormData.Risk.toString();
      // console.log(res.data)
        } else {
          this.$message.error(res.data.Message);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main_wrapper{
  .form_inline{
    background: #e8e8e8;
    border: 1px solid #333;
    font-size: 0;
    padding: 10px;
    .el-form-item{
      width: calc(~'50% - 5px');
      display: inline-block;
      min-height: 46px;
      vertical-align: top;
      margin-bottom: 0;
      &:nth-child(2n-1){
        margin-right: 10px;
      }
    }
  }
  .distributionStyle{
    display: block;
    margin-top: 20px;
  }
}
</style>
<style lang="less">
.main_wrapper{
  .listBox{
    margin: 25px 0 35px;
    &#projectedIncomeList{
      margin-top: 70px;
    }
    h3{
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      height: 36px;
      line-height: 36px;
      .el-button{
        float: right;
      }
    }
    .el-table{
      margin-bottom: 15px;
    }
  }
  .paginationW{
    // float: right;
    // margin-top: 0;
  }

}
</style>
