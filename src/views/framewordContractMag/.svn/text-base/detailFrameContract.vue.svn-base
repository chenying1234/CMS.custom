<template>
  <div class="main_wrapper">
    <el-form :model="frameContractList" label-width="160px" class="form_inline">
      <el-form-item label="框架合同名称：">{{frameContractList.fkcName}}</el-form-item>
      <el-form-item label="框架合同编号：">{{frameContractList.fkcNo}}</el-form-item>
      <el-form-item label="客户公司名称：">{{frameContractList.companyName}}</el-form-item>
      <el-form-item label="签署日期：">{{frameContractList.signDate}}</el-form-item>
      <el-form-item label="框架合同生效日起：">{{frameContractList.dateBegin}}</el-form-item>
      <el-form-item label="框架合同生效日止：">{{frameContractList.dateEnd}}</el-form-item>
    </el-form>

  <!-- 支出管理组件 
    <pay-management></pay-management>-->

  <!-- 收入管理组件 
    <income-management></income-management>
    -->
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
import { detailFKContract } from '@/api/framewordContractManagement.js'
import { contractDetail } from '@/api/contractManagement'
import { customerDepDDList } from '@/api/clientManagement'
// import payManagement from '../payManagement'
// import incomeManagement from '../incomeManagement'
export default {
  // components: { payManagement, incomeManagement },
  data() {
      return {
        frameContractList: {
          ID: null,
          attachment: "",
          companyName: "",
          dateBegin: "",
          dateEnd: "",
          fkcName: "",
          fkcNo: "",
          signDate: "",
        },
        Id: null,
        // fileName: ''
      }
  },
  created() {
    this.detailFrameContract();
  },
  computed: {
    ...mapGetters([
          'roles'
      ])
  },
  methods: {  
    detailFrameContract() {
      console.log('显示框架合同详情');
      let params = this.frameContractList;
      params.ID = Number(this.$route.params.Fid);
      detailFKContract({ ID: params.ID }).then(res => {
        this.frameContractList = res.data.fkc;
        console.log(this.frameContractList);
      }).catch(err => {
        this.$message.error(err)
      });
    },
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
