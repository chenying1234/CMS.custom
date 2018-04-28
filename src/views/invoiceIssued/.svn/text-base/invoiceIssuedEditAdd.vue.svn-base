<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
        <el-form-item label="合同名称：">
                <el-select v-model="formData.ContractID" placeholder="请选择" @change="getPriceDateData">
                    <el-option v-for="item in ContractNameList" :key="item.ContractID" :label="item.ContractName" :value="item.ContractID">
                    </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="预计收入金额和日期：">
                <el-select v-model="formData.ExpectID" placeholder="请选择">
                    <el-option v-for="item in InvoiceItemList" :key="item.ExpectID" :label="item.ExpectPriceDate" :value="item.ExpectID">
                    </el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="发票项目：" prop="InvoiceItem">
        <el-input v-model="formData.InvoiceItem" placeholder="发票项目"></el-input>
      </el-form-item>
      <el-form-item label="发票价格：" prop="InvoicePrice">
          <el-input v-model="formData.InvoicePrice" placeholder="发票价格"></el-input>
      </el-form-item>
      <el-form-item label="Quotation文件(客户版)上传：" prop="InvoiceAttachmentCus">
            <form id="select_file" class="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName" name="tbFileName"  @change="handleFileCus" />
            </form>
      </el-form-item>
      <el-form-item label="Quotation文件(生产版)上传：" prop="InvoiceAttachmentPro">
            <form id="select_file" class="select_file">
              <div class="fileInfoBox">
                  <el-button>选择文件</el-button>
                  <div id="fileNameBox1">未选择任何文件</div>
              </div>
              <input type="file" id="tbFileName1" name="tbFileName1"  @change="handleFilePro" />
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
  InvoiceApplyAdd,
   ContractInvoiceDDList,
  ExpectInvoiceDDList
} from "@/api/incomeManagement";
import { getNameFile } from '@/utils/handleData'
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
        InvoiceAttachmentPro:"",
        ContractID: "",
        ExpectID: ""
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
      addBtn: false,
      attachmentListCus:[],
      attachmentListPro:[],
      ContractNameList: [],
      InvoiceItemList: [],
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
      this.ContractNameDL();
  },
  methods: {
    //获取合同名称下拉框--项目合同
     ContractNameDL() {
      ContractInvoiceDDList().then(res => {
        if(res.data.flag) {
          this.ContractNameList = res.data.contract_invoice;
          // console.log(this.ContractNameList);
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    getPriceDateData() {
      ExpectInvoiceDDList({
        contractID:this.formData.ContractID
      }).then(res => {
        this.formData.ExpectID='';
        if(res.data.flag) {
          this.InvoiceItemList = res.data.supplier_out;
          console.log(this.InvoiceItemList);
        }
        else{
           this.InvoiceItemList =[];
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    // 获取需要修改的数据
    getEditData() {
      InvoiceApplyDetail({ Id: this.$route.params.id })
        .then(res => {
          if (res.data.Result) {
            this.formData = res.data.data;
            if (this.formData.ExpectRecieptID == 0) {
              this.formData.ExpectRecieptID = null;
            }
             if(this.formData.InvoiceAttachmentCus) {
            document.getElementById("fileNameBox").innerHTML = getNameFile(this.formData.InvoiceAttachmentCus, "\_");
             }
            if(this.formData.InvoiceAttachmentPro) {
            document.getElementById("fileNameBox1").innerHTML = getNameFile(this.formData.InvoiceAttachmentPro, "\_");
             }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/invoiceIssued/index");
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
                  path: "/invoiceIssued/index"
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
                  path: "/invoiceIssued/index"
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
       let file = document.getElementById("tbFileName");
        this.attachmentListCus.push(file.files[0])

        if(file.value !== '') {
          let oMyForm = new FormData()
          oMyForm.append('file', this.attachmentListCus[0]);
          //   console.log(oMyForm)
          fileUpload(oMyForm).then(res => {
            if(res.data.result) {
              this.formData.InvoiceAttachmentCus = res.data.url;
              document.getElementById('fileNameBox').innerHTML = getNameFile(file.value, '\\');
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
    },
     handleFilePro() {
      let file1 = document.getElementById("tbFileName1");
      this.attachmentListPro.push(file1.files[0])
      if (file1.value !== "") {
        let MyForm = new FormData();
        MyForm.append('file', this.attachmentListPro[0]);
        fileUpload(MyForm).then(res => {
            if (res.data.result) {
              this.formData.InvoiceAttachmentPro = res.data.url;
              document.getElementById('fileNameBox1').innerHTML =getNameFile(file1.value, "\\");
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
// #select_file #tbFileName{
//     opacity: 0;
//     filter: alpha(opacity=0);
//     width: 88px;
//     height: 36px;
//     vertical-align: top;
// }
.select_file input{
    opacity: 0;
    filter: alpha(opacity=0);
    width: 88px;
    height: 36px;
    vertical-align: top;
}
#select_file .fileInfoBox #fileNameBox {
    display: inline-block;
}
#select_file .fileInfoBox #fileNameBox1 {
    display: inline-block;
}
</style>