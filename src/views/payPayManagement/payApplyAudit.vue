<template>
 <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="140px">
      <el-form-item label="状态：" prop="AuditStatus">
          <el-radio v-model="formData.AuditStatus" label="通过"></el-radio>
          <el-radio v-model="formData.AuditStatus" label="拒绝"></el-radio>
      </el-form-item>
      <el-form-item label="备注：" prop="AuditRemark">
          <el-input type="textarea" v-model="formData.AuditRemark" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" >提交</el-button>
        <el-button type="primary" @click="cancelAdd">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { CostAuditPost } from '@/api/payManagement'
export default {
  data() {
    return {
      formData: {
        AuditStatus: "",
        AuditRemark: "",
      },
      rules: {
        AuditStatus: [{ required: true, message: "请选择审批状态", trigger: "change" }],
        AuditRemark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      CostApplyID: 0,
      level: 1
    }
  },
  created() {
    this.CostApplyID = this.$route.params.id;
    this.level = this.$store.state.payMag.AuditLevel;
    console.log(this.level)
  },
  methods: {
    submitForm() {
      this.$refs.rulesForm.validate(valid => {
        if(valid) {
          CostAuditPost({
            AuditLevel: this.level,
            AuditRemark: this.formData.AuditRemark,
            AuditStatus: this.formData.AuditStatus,
            CostApplyID: this.CostApplyID
          }).then(res => {
            console.log(res)
            if(res.data.flag) {
              this.$message.success(this.level == 1 ? '主管审批成功！' : '总经理审批成功！');
              this.$router.push({path: "/contract/payContract/detail/" + this.$route.params.pid });
            } else {
              this.$message.error(res.data.message);
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
      this.$router.push({path: "/contract/payContract/detail/" + this.$route.params.pid })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
