<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
      <el-form-item label="预计收款日期：" prop="ExpectRecieptDate">
        <el-date-picker type="date" v-model="formData.ExpectRecieptDate" placeholder="请选择" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="预计收款金额：" prop="ExpectRecieptPrice">
          <el-input v-model="formData.ExpectRecieptPrice" placeholder="预计收款金额"></el-input>
      </el-form-item>
      <el-form-item label="客户经办人：" prop="CustomerContact">
          <el-input v-model="formData.CustomerContact" placeholder="客户经办人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeForm" v-if="editBtn">修改</el-button>
        <el-button type="primary" @click="submitForm" v-if="addBtn">添加</el-button>
        <el-button type="primary" @click="cancelAdd">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { formatDate } from '@/utils/handleData'
import {ExpectRecieptDetail,ExpectRecieptEdit, ExpectRecieptAdd } from '@/api/incomeManagement'
export default {
  data() {
    const validPrice = (rule, value, callback) => {
        let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/;
      if (!value) {
        callback(new Error("请输入预计收款金额"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字，最多带两位小数"));
      } else {
        callback();
      }
    };
    const validCustomer = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入客户经办人"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        ContractID: 0,
        ExpectRecieptDate: "",
        ExpectRecieptPrice: null,
        CustomerContact: "",
        ID:"",
      },
      rules: {
        ExpectRecieptDate: [{ required: true, message: "请选择预计收款日期", trigger: "blur" }],
        ExpectRecieptPrice: [{ required: true, trigger: "blur", validator: validPrice }],
        CustomerContact: [{ required: true, trigger: "blur", validator: validCustomer }],
      },
      editBtn: false,
      addBtn: false
    };
  },
  created() {
    let pageFlag = this.$route.params.flag;
    if(pageFlag == 'add') {
      this.addBtn = true;
      this.formData.ContractID = this.$route.params.pid;
    }
    if(pageFlag == 'edit') {
      this.getEditData();
      this.editBtn = true;
    }
  },
  methods: {
   
    // 获取需要修改的数据
    getEditData() {
      ExpectRecieptDetail({Id: this.$route.params.id}).then(res => {
        if(res.data.Result) {
          this.formData = res.data.data;
        } 
      }).catch(err => {
        this.$message.error(err);
      })
    },

    formatAllData() {
        if(this.formData.ExpectRecieptDate && (typeof this.formData.ExpectRecieptDate) == 'object'){
            this.formData.ExpectRecieptDate = formatDate(this.formData.ExpectRecieptDate);
        }
        
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/contract/project/detail/" + this.$route.params.pid);
    },
    //修改预计收款
    changeForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          ExpectRecieptEdit(this.formData)
            .then(res => {
              if (res.data.Result) {
                this.$message({
                  message: "修改成功!",
                  type: "success"
                });
                this.$router.push({ path: "/contract/project/detail/" + this.$route.params.pid });
              } else {
                this.$message.error(res.data.Message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加预计收款
    submitForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          ExpectRecieptAdd(this.formData)
            .then(res => {
              if (res.data.Result) {
                this.$message({
                  message: "添加成功!",
                  type: "success"
                });
                this.$router.push({ path: "/contract/project/detail/" + this.$route.params.pid });
              } else {
                this.$message.error(res.data.Message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>
