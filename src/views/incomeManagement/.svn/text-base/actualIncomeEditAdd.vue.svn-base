<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
     <el-form-item label="发票号：" prop="InvoiceNo">
          <el-input v-model="formData.InvoiceNo" placeholder="发票号"></el-input>
      </el-form-item> 
      <el-form-item label="发票附件上传：" prop="InvoiceAttachment">
            <form id="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName" name="tbFileName"  @change="handleFile" />
            </form>
      </el-form-item>
      <el-form-item label="快递号：" prop="ExpressNo">
          <el-input v-model="formData.ExpressNo" placeholder="快递号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeForm" v-if="editBtn">修改</el-button>
        <el-button type="primary" @click="submitForm" v-if="addBtn">添加</el-button>
        <el-button type="primary" @click="cancelAdd">关闭</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
// import { formatDate } from "@/utils/handleData";
import { fileUpload } from "@/api/fileUpload";
import { InvoiceDetail, InvoiceAdd, InvoiceEdit } from "@/api/incomeManagement";
export default {
  data() {
    const validInvoiceNo = (rule, value, callback) => {
      let reg = /^(0|[1-9][0-9]*)$/;
      if (!value) {
        callback(new Error("请输入发票号"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    const validExpressNo = (rule, value, callback) => {
      let reg = /^(0|[1-9][0-9]*)$/;
      if (!value) {
        callback(new Error("请输入快递号"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        ContractID: "",
        ExpectRecieptID: "",
        InvoiceApplyID:"",
        InvoiceNo: "",
        ExpressNo: "",
        InvoiceAttachment: ""
      },
      rules: {
        InvoiceNo: [
          { required: true, trigger: "blur", validator: validInvoiceNo }
        ],
        ExpressNo: [
          { required: true, trigger: "blur", validator: validExpressNo }
        ],
        InvoiceAttachment: [
          { required: true, message: "请上传框架合同附件", trigger: "change" }
        ]
      },
      editBtn: false,
      addBtn: false
    };
  },
  created() {
    let pageFlag = this.$route.params.flag;
    if (pageFlag == "add") {
      this.addBtn = true;
    }
    if (pageFlag == "edit") {
      this.getEditData();
      this.editBtn = true;
    }
    this.formData.contractID = this.$route.params.pid;
    this.formData.ExpectRecieptID = this.$route.params.id;
    this.formData.InvoiceApplyID = this.$route.params.caid;
  },
  methods: {
    // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.lastIndexOf(tag);
      return str.substring(pos + 1);
    },
    // 获取需要修改的数据
    getEditData() {
      InvoiceDetail({ Id: this.$route.params.id })
        .then(res => {
          if (res.data.Result) {
            this.formData = res.data.data;
            if (this.formData.InvoiceAttachment) {
              document.getElementById(
                "fileNameBox"
              ).innerHTML = this.getNameFile(
                this.formData.InvoiceAttachment,
                "_"
              );
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
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
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/contract/project/detail/" + this.$route.params.pid);
    },
    //修改实际收入
    changeForm() {
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          InvoiceEdit(this.formData)
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加实际收入
    submitForm() {
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          InvoiceAdd(this.formData)
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
