<template>
 <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="140px">
      <el-form-item label="状态：" prop="InvoiceAudit">
          <el-radio v-model="formData.InvoiceAudit" label="通过"></el-radio>
          <el-radio v-model="formData.InvoiceAudit" label="拒绝"></el-radio>
      </el-form-item>
      <el-form-item label="备注：" prop="InvoiceRemark">
          <el-input type="textarea" v-model="formData.InvoiceRemark" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" >提交</el-button>
        <el-button type="primary" @click="cancelAdd">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { InvoiceApplyAudit } from '@/api/incomeManagement'
export default {
  data() {
    return {
      formData: {
        InvoiceAudit: "",
        InvoiceRemark: "",
      },
      rules: {
        InvoiceAudit: [{ required: true, message: "请选择审批状态", trigger: "change" }],
        InvoiceRemark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      ID: 0,
    }
  },
  created() {
     this.ID = this.$route.params.id;
  },
  methods: {
    submitForm() {
      this.$refs.rulesForm.validate(valid => {
        if(valid) {
          InvoiceApplyAudit({
            InvoiceRemark: this.formData.InvoiceRemark,
            InvoiceAudit: this.formData.InvoiceAudit,
            ID:this.ID
          }).then(res => {
            console.log(res)
            if(res.data.Result) {
              this.$message.success('主管审批成功！');
               this.$router.push({
                  path: "/invoiceIssued/index"
                });
             // this.$router.push({path: "/contractMag/detail/" + this.$route.params.pid });
            } else {
              this.$message.error(res.data.Message);
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('前端验证没通过!');
          return false;
        }
      })
    },
    cancelAdd() {
       this.$router.push({
                  path: "/invoiceIssued/index"
                });
    //  this.$router.push({path: "/contractMag/detail/" + this.$route.params.pid })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
