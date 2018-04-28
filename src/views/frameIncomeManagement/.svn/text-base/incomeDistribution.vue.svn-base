<template>
  <el-form ref="rulesForm" :rules="rules" :model="formData" label-width="100px">
      <el-form-item label="设计部：" prop="DesignDepPay">
        <el-input v-model="formData.DesignDepPay" value="number"></el-input>
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
        <el-button type="primary" @click="addIDist">提交</el-button>
        <el-button @click="cancleEdit">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { GetPay, EditPay } from "@/api/incomeManagement";
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
      InvoiceApplyID: 0
    };
  },
  created() {
    this.contractId = this.$route.params.pid;
    this.InvoiceApplyID = this.$route.params.id;
    GetPay({ ContractID: this.contractId, InvoiceApplyID: this.InvoiceApplyID })
      .then(res => {
          console.log(res)
        if (res.data.Result) {
          this.formData = res.data;
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
    addIDist() {
        this.$refs.rulesForm.validate((valid) => {
            if(valid) {
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
            }
        })
     
    }
  }
};
</script>

<style lang="less" scoped>

</style>
