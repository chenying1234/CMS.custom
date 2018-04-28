<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
      <el-form-item label="预计支出项目：" prop="ExpectCostName">
          <el-input v-model="formData.ExpectCostName" placeholder="预计支出项目"></el-input>
      </el-form-item>
      <el-form-item label="预计支出日期：" prop="ExpectCostDate">
        <el-date-picker type="date" v-model="formData.ExpectCostDate" placeholder="请选择" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="预计支出金额：" prop="ExpectCostPrice">
          <el-input v-model="formData.ExpectCostPrice" placeholder="预计支出价格"></el-input>
      </el-form-item>
      <el-form-item label="此项预计收入：" prop="ExpectCostIncome">
          <el-input v-model="formData.ExpectCostIncome" placeholder="此项预计收入"></el-input>
      </el-form-item>
      <el-form-item label="预计支出凭证附件上传：" prop="ExpectCostAttachment">
            <form id="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName" name="tbFileName"  @change="handleFile" />
            </form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeForm" v-if="editBtn">修改</el-button>
        <el-button type="primary" @click="submitForm" v-if="addBtn">添加</el-button>
        <el-button type="primary" @click="cancelAdd">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { formatDate, getNameFile } from '@/utils/handleData'
import { fileUpload } from '@/api/fileUpload'
import { GetExpectCostData, ExpectCostEdit, ExpectCostAdd } from '@/api/payManagement'
export default {
  data() {
    const validPrice = (rule, value, callback) => {
      let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/;
      if (!value) {
        callback(new Error("请输入预计支出价格"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字，最多带两位小数"));
      } else {
        callback();
      }
    };
    const validIncome = (rule, value, callback) => {
      let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/;
      if (!value) {
        callback(new Error("请输入此项预计收入"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字，最多带两位小数"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        ContractID: 0,
        ExpectCostName: "",
        ExpectCostDate: "",
        ExpectCostPrice: null,
        ExpectCostIncome: null,
        ExpectCostAttachment: ""
      },
      rules: {
        ExpectCostName: [{ required: true, message: "请输入预计支出项目", trigger: "blur" }],
        ExpectCostDate: [{ required: true, message: "请选择预计支出日期", trigger: "blur" }],
        ExpectCostPrice: [{ required: true, trigger: "blur", validator: validPrice }],
        ExpectCostIncome: [{ required: true, trigger: "blur", validator: validIncome }],
        ExpectCostAttachment: [{ required: true, message: "请上传框架合同附件", trigger: "change" }]
      },
      editBtn: false,
      addBtn: false
    };
  },
  created() {
    let pageFlag = this.$route.params.flag;
    if(pageFlag == 'add') {
      this.addBtn = true;
      this.formData.ContractID = parseInt(this.$route.params.pid);
    }
    if(pageFlag == 'edit') {
      this.getEditData();
      this.editBtn = true;
    }
  },
  methods: {
    // 获取需要修改的数据
    getEditData() {
      GetExpectCostData({ID: this.$route.params.id}).then(res => {
        if(res.data.flag) {
          this.formData = res.data.expectCost;
          if(this.formData.ExpectCostAttachment) {
            document.getElementById("fileNameBox").innerHTML = getNameFile(this.formData.ExpectCostAttachment, "\_");
          }
        } 
      }).catch(err => {
        this.$message.error(err);
      })
    },
    //选择文件上传
    handleFile() {
      var file = document.getElementById("tbFileName");
      if (file.value !== "") {
        let MyForm = new FormData();
        MyForm.append("file", file.files[0]);
        fileUpload(MyForm)
          .then(res => {
            if (res.data.result) {
              this.formData.ExpectCostAttachment = res.data.url;
              document.getElementById("fileNameBox").innerHTML = getNameFile(file.value, "\\");
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    formatAllData() {
        if(this.formData.ExpectCostDate && (typeof this.formData.ExpectCostDate) == 'object'){
            this.formData.ExpectCostDate = formatDate(this.formData.ExpectCostDate);
        }
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/contract/payContract/detail/" + this.$route.params.pid);
    },
    //修改预计支出
    changeForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          ExpectCostEdit(this.formData)
            .then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "修改成功!",
                  type: "success"
                });
                this.$router.push({ path: "/contract/payContract/detail/" + this.$route.params.pid });
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("前端验证没通过!");
          return false;
        }
      });
    },
    //添加预计支出
    submitForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          ExpectCostAdd(this.formData)
            .then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "添加成功!",
                  type: "success"
                });
                this.$router.push({ path: "/contract/payContract/detail/" + this.$route.params.pid });
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("前端验证没通过!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>
