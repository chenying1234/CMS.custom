<template>
  <div class="addFrameContract">
    <el-form ref="eidtFrameContractList" :rules="rules" :model="eidtFrameContractList" label-width="180px">
      <el-form-item label="框架合同名称：" prop="fkcName">
        <el-input v-model="eidtFrameContractList.fkcName"></el-input>
      </el-form-item>
      <el-form-item label="框架合同编号：" prop="fkcNo">
        <el-input v-model="eidtFrameContractList.fkcNo"></el-input>
      </el-form-item>
      <el-form-item label="客户公司名称：" prop="companyName">
        <el-select v-model="eidtFrameContractList.companyName" placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in companyNameList" :key="item.key" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签署日期：" prop="signDate">
        <el-col>
          <el-date-picker type="date" placeholder="请选择" v-model="eidtFrameContractList.signDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="框架合同生效日起：" prop="dateBegin">
        <el-date-picker type="date" placeholder="请选择" v-model="eidtFrameContractList.dateBegin" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="框架合同生效日止：" prop="dateEnd">
        <el-date-picker type="date" placeholder="请选择" v-model="eidtFrameContractList.dateEnd" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="框架合同附件上传：" prop="attachment">
        <form id="select_file">
          <div class="fileInfoBox">
            <el-button>选择文件</el-button>
            <div id="fileNameBox">未选择任何文件</div>
          </div>
          <input type="file" id="tbFileName" name="tbFileName" @change="handleUploadFile" />
        </form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEditFrameContract">修改</el-button>
        <el-button @click="handleCancleAddFrameContract">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import Cookies from 'js-cookie'
import { fileUpload } from '@/api/fileUpload'
import { CustomerDDList, detailFKContract, editFKContract } from '@/api/framewordContractManagement.js'
import { formatDate, getNameFile } from '@/utils/handleData'
export default {
  data() {
    return {
      eidtFrameContractList: {
        ID: null,
        attachment: "",
        companyName: "",
        dateBegin: "",
        dateEnd: "",
        fkcName: "",
        fkcNo: "",
        signDate: "",
      },
      companyNameList: [],
      attachmentList: [],
      oldID: null,
      rules: {
        fkcName: [{ required: true, message: '请输入框架合同名称', trigger: 'blur' }],
        fkcNo: [{ required: true, message: '请输入框架合同编号', trigger: 'blur' }],
        companyName: [{ required: true, message: '请选择客户公司名称', trigger: 'change' }],
        signDate: [{ required: true, message: '请选择预签日期', trigger: 'blur' }],
        dateBegin: [{ required: true, message: '请选择框架合同生效日起', trigger: 'blur' }],
        dateEnd: [{ required: true, message: '请选择框架合同生效日止', trigger: 'blur' }],
        attachment: [{ required: true, message: '请上传框架合同附件', trigger: 'change' }]
      },
    }
  },

  created() {
    this.getCompanyName();
    if (this.$route.params.obj !== undefined) {
      this.detailFrameContract();
    }
  },

  methods: {
    getCompanyName() {
      console.log('获取客户公司名称下拉选项');
      CustomerDDList().then(res => {
        if (res.data.flag) {
          this.companyNameList = res.data.cust_area;
        } else {
          this.$message.error(res.data.Message)
        }
      }).catch(err => {
        this.$message.error(err)
      });

    },
    detailFrameContract() {
      console.log('显示框架合同详情');
      let params = this.eidtFrameContractList;
      params.ID = Number(this.$route.params.obj);
      detailFKContract({ ID: params.ID }).then(res => {
        this.eidtFrameContractList = res.data.fkc;
        console.log(this.eidtFrameContractList);
        document.getElementById('fileNameBox').innerHTML = getNameFile(this.eidtFrameContractList.attachment, "\_");
        // if (res.data.flag) {
        //   this.eidtFrameContractList = res.data.fkc;
        // } else {
        //   this.$message.error(res.data.Message);
        // }
      }).catch(err => {
        this.$message.error(err)
      });
    },
    handleEditFrameContract() {
      console.log('编辑框架合同');
      this.formatAllData();
      this.$refs.eidtFrameContractList.validate((valid) => {
              console.log(this.eidtFrameContractList)
        if (valid) {
          editFKContract(this.eidtFrameContractList).then(res => {
            if (res.data.flag) {
              this.$message.success('框架合同修改成功！');
              this.$router.push({
                name: "框架合同列表",
                params: { obj: 0, flag: arguments[0] }
              });
            } else {
              this.$message.error(res.data.Message);
            }
          }).catch(err => {
            this.$message.error(err)
          });
        } else {
          console.log('前端验证失败!');
        }
      })
    },
    handleCancleAddFrameContract() {
      console.log('取消添加框架合同');
      this.$router.push({
        name: "框架合同列表",
        params: { obj: 0, flag: arguments[0] }
      });
    },
    formatAllData() {
      if (this.eidtFrameContractList.signDate && (typeof this.eidtFrameContractList.signDate) == 'object') {
        this.eidtFrameContractList.signDate = formatDate(this.eidtFrameContractList.signDate);
      }
      if (this.eidtFrameContractList.dateBegin && (typeof this.eidtFrameContractList.dateBegin) == 'object') {
        this.eidtFrameContractList.dateBegin = formatDate(this.eidtFrameContractList.dateBegin);
      }
      if (this.eidtFrameContractList.dateEnd && (typeof this.eidtFrameContractList.dateEnd) == 'object') {
        this.eidtFrameContractList.dateEnd = formatDate(this.eidtFrameContractList.dateEnd);
      }
    },
    handleUploadFile() {
      var file = document.getElementById('tbFileName');
      this.attachmentList.push(file.files[0]);
      if (file.value !== '') {
        let oMyForm = new FormData()
        oMyForm.append('file', this.attachmentList[0]);
        //   console.log(oMyForm)
        fileUpload(oMyForm).then(res => {
          if (res.data.result) {
            console.log("上传1");
            this.eidtFrameContractList.attachment = res.data.url;
            document.getElementById('fileNameBox').innerHTML = getNameFile(file.value, "\\");
          }
        }).catch(err => {
          this.$message.error(err)
        })
      } 
    },
  }
}
</script>
<style lang="less" scoped>
.addFrameContract {
  #select_file {
    position: relative;
    #tbFileName {
      opacity: 0;
      filter: alpha(opacity=0);
      width: 88px;
      height: 36px;
      vertical-align: top; // cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .fileInfoBox {
      position: absolute;
      left: 0;
      top: 0;
      #fileNameBox {
        display: inline-block;
      }
    }
  }
}
</style>
