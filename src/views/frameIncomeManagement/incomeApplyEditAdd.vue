<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
      <el-form-item label="发票项目：" prop="InvoiceItem">
        <el-input v-model="formData.InvoiceItem" placeholder="发票项目"></el-input>
      </el-form-item>
      <el-form-item label="发票价格：" prop="InvoicePrice">
          <el-input v-model="formData.InvoicePrice" placeholder="发票价格"></el-input>
      </el-form-item>
      <el-form-item label="Quotation文件(客户版)上传：" prop="InvoiceAttachmentCus">
            <form id="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName" name="tbFileName"  @change="handleFileCus" />
            </form>
      </el-form-item>
      <el-form-item label="Quotation文件(生产版)上传：" prop="InvoiceAttachmentPro">
            <form id="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName" name="tbFileName"  @change="handleFilePro" />
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
import { fileUpload } from "@/api/fileUpload";
import {
  InvoiceApplyDetail,
  InvoiceApplyEdit,
  InvoiceApplyAdd
} from "@/api/incomeManagement";
export default {
  data() {
    const validPrice = (rule, value, callback) => {
      let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/;
      if (!value) {
        callback(new Error("请输入发票价格"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字，最多带两位小数"));
      } else {
        callback();
      }
    };
    const validItem = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入发票项目"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        ContractID: 0,
        ExpectRecieptID: 0,
        InvoicePrice: null,
        InvoiceItem: "",
        InvoiceAttachmentCus: "",
        InvoiceAttachmentPro:""
      },
      rules: {
        InvoicePrice: [
          { required: true, trigger: "blur", validator: validPrice }
        ],
        InvoiceItem: [{ required: true, trigger: "blur", validator: validItem }],
        InvoiceAttachmentCus: [
          { required: true, message: "请上传Quotation文件(客户版)", trigger: "change" }
        ],
      },
      editBtn: false,
      addBtn: false
    };
  },
  created() {
    let pageFlag = this.$route.params.flag;
    if (pageFlag == "add") {
      this.addBtn = true;
      this.formData.ContractID = this.$route.params.pid;
    }
    if (pageFlag == "edit") {
      this.getEditData();
      this.editBtn = true;
    }
    if (this.$route.params.id != 0) {
      this.formData.ExpectRecieptID = parseInt(this.$route.params.id);
    } else {
      this.formData.ExpectRecieptID = null;
    }
  },
  methods: {
    // 获取需要修改的数据
    getEditData() {
      InvoiceApplyDetail({ Id: this.$route.params.id })
        .then(res => {
          if (res.data.Result) {
            this.formData = res.data.data;
            if (this.formData.ExpectRecieptID == 0) {
              this.formData.ExpectRecieptID = null;
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/contract/project/detail/" + this.$route.params.pid);
    },
    //修改收款申请
    changeForm() {
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
           if(!this.formData.ExpectRecieptID) {
            this.formData.ExpectRecieptID = 0;
          }
          InvoiceApplyEdit(this.formData)
            .then(res => {
              if (res.data.Result) {
                this.$message({
                  message: "修改成功!",
                  type: "success"
                });
                this.$router.push({
                  path: "/contract/project/detail/" + this.$route.params.pid
                });
              } else {
                this.$message.error(res.data.Message);
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
    //添加收款申请
    submitForm() {
      // this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
           if(!this.formData.ExpectRecieptID) {
            this.formData.ExpectRecieptID = 0;
          }
          console.log(this.formData);
          InvoiceApplyAdd(this.formData)
            .then(res => {
              if (res.data.Result) {
                this.$message({
                  message: "添加成功!",
                  type: "success"
                });
                this.$router.push({
                  path: "/contract/project/detail/" + this.$route.params.pid
                });
              } else {
                this.$message.error(res.data.Message);
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
     //选择文件上传
    handleFileCus() {
      var file = document.getElementById("tbFileName");
      if (file.value !== "") {
        let MyForm = new FormData();
        MyForm.append("file", file.files[0]);
        fileUpload(MyForm)
          .then(res => {
            if (res.data.result) {
              this.formData.InvoiceAttachment = res.data.url;
              document.getElementById(
                "fileNameBox"
              ).innerHTML = this.getNameFile(file.value, "\\");
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
     handleFilePro() {
      var file = document.getElementById("tbFileName");
      if (file.value !== "") {
        let MyForm = new FormData();
        MyForm.append("file", file.files[0]);
        fileUpload(MyForm)
          .then(res => {
            if (res.data.result) {
              this.formData.InvoiceAttachment = res.data.url;
              document.getElementById(
                "fileNameBox"
              ).innerHTML = this.getNameFile(file.value, "\\");
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
  }
};
</script>

<style lang="less" scoped>

</style>