<template>
  <el-form ref="rulesForm" :rules="rules" :model="formData" label-width="100px">
    <el-row class="priceList">
      <el-col :span="12">发票申请金额：<span>{{ InvoicePrice }}</span></el-col>
      <el-col :span="12">输入金额总和：<span :class="{alertRed : diffPrice}">{{ totalPrice }}</span></el-col>
    </el-row>
    <el-form-item label="设计部：" prop="DesignDepPay">
      <el-input v-model="formData.DesignDepPay" value="number" :blur="computeTotal()"></el-input>
    </el-form-item>
    <el-form-item label="制作部：" prop="MakeDepPay">
      <el-input v-model="formData.MakeDepPay"></el-input>
    </el-form-item>
    <el-form-item label="工程部：" prop="EngineeringDepPay">
      <el-input v-model="formData.EngineeringDepPay"></el-input>
    </el-form-item>
    <el-form-item label="客户部：" prop="CustomDepPay">
      <el-input v-model="formData.CustomDepPay"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitIDist">提交</el-button>
      <el-button @click="cancleEdit">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetPay, EditPay } from "@/api/incomeManagement";
import { twoDecimals } from "@/utils/handleData"
export default {
  data() {
      const validDotNum = (rule, value, callback) => {
          let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/
          if(!value) {
              callback(new Error("请输入分配金额"));
          } else if(!reg.test(value.trim())) {
              callback(new Error("请输入数字，最多带两位小数"));
          } else {
              callback();
          }
      }
    return {
      formData: {
        DesignDepPay: null,
        MakeDepPay: null,
        EngineeringDepPay: null,
        CustomDepPay: null,
        ID: 0,
      },
      rules: {
        DesignDepPay: [{ required: true, validator: validDotNum, trigger: "blur" }],
        MakeDepPay: [{ required: true, validator: validDotNum, trigger: "blur" }],
        EngineeringDepPay: [{ required: true, validator: validDotNum, trigger: "blur" }],
        CustomDepPay: [{ required: true, validator: validDotNum, trigger: "blur" }]
      },
      contractId: 0,
      InvoiceApplyID: 0,
      InvoicePrice: 0,
      totalPrice: 0,
      diffPrice: false
    };
  },
  created() {
    this.contractId = this.$route.params.pid;
    this.InvoiceApplyID = this.$route.params.id;
    this.InvoicePrice = localStorage.getItem("ProjectInvoicePrice");
    GetPay({ ContractID: this.contractId, InvoiceApplyID: this.InvoiceApplyID })
      .then(res => {
        if (res.data.Result) {
          // console.log(res)
          this.formData = res.data;
          let price = Number(this.formData.DesignDepPay) + Number(this.formData.MakeDepPay) + Number(this.formData.EngineeringDepPay) + Number(this.formData.CustomDepPay);
          // 格式化输入金额总和，保留2位小数
          this.totalPrice = twoDecimals(price);

        } else {
          this.$message.error(res.data.Message);
        }
      })
      .catch(err => {
        console.log(err);
        this.$message.error(err.Message);
      });
  },
  methods: {
    cancleEdit() {
      this.$router.push("/contract/project/detail/" + this.contractId);
    },
    computeTotal(e) {
      let price = Number(this.formData.DesignDepPay) + Number(this.formData.MakeDepPay) + Number(this.formData.EngineeringDepPay) + Number(this.formData.CustomDepPay);
      // 格式化输入金额总和，保留2位小数
      this.totalPrice = twoDecimals(price);
          
      if(this.totalPrice != this.InvoicePrice) {
        this.diffPrice = true;
      } else {
        this.diffPrice = false;
      }
      
   },
    submitIDist() {
        this.$refs.rulesForm.validate((valid) => {
            if(valid) {
              if(this.totalPrice == this.InvoicePrice) {
                this.formData.contractId = this.contractId;
                this.formData.InvoiceApplyID = this.InvoiceApplyID;
                EditPay(this.formData).then(res => {
                    if (res.data.Result) {
                      this.$message({
                          message: "修改成功!",
                          type: "success"
                      });
                      this.$router.push({ path: "/contract/project/detail/" + this.contractId });
                    } else {
                        this.$message.error(res.data.Message);
                    }
                }).catch(err => {
                    this.$message.error('修改失败！')
                });
              } else {
                this.$message.error('发票申请金额与输入金额总和不等，请重新输入！')
              }
              
            }
        })
     
    }
  }
};
</script>

<style lang="less" scoped>
.priceList{
  margin-bottom: 22px;
  span.totalGreen{
    color: green;
  }
  span.alertRed{
    color: red;
  }
}
</style>
