<template>
  <div class="addFrameContract">
    <el-form ref="addFrameContractList" :rules="rules" :model="addFrameContractList" label-width="180px">
      <el-form-item label="框架合同名称：" prop="fkcName">
        <el-input v-model="addFrameContractList.fkcName"></el-input>
      </el-form-item>
      <el-form-item label="框架合同编号：" prop="fkcNo">
        <el-input v-model="addFrameContractList.fkcNo"></el-input>
      </el-form-item>
      <el-form-item label="客户公司名称：" prop="companyName">
        <el-select v-model="addFrameContractList.companyName" placeholder="请选择" clearable style="width: 100%;">
          <el-option v-for="item in companyNameList" :key="item.key" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签署日期：" prop="signDate">
        <el-col>
          <el-date-picker type="date" placeholder="请选择" v-model="addFrameContractList.signDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="框架合同生效日起：" prop="dateBegin">
        <el-date-picker type="date" placeholder="请选择" v-model="addFrameContractList.dateBegin" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="框架合同生效日止：" prop="dateEnd">
        <el-date-picker type="date" placeholder="请选择" v-model="addFrameContractList.dateEnd" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="框架合同附件上传：" prop="attachment">
        </el-upload>
        <form id="select_file">
          <div class="fileInfoBox">
              <el-button>选择文件</el-button>
              <div id="fileNameBox">未选择任何文件</div>
          </div>
          <input type="file" id="tbFileName" name="tbFileName" @change="handleUploadFile" />
        </form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddFrameContract">添加</el-button>
        <el-button @click="handleCancleAddFrameContract">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { fileUpload } from '@/api/fileUpload'
import { CustomerDDList, addFKContract } from '@/api/framewordContractManagement.js'
import { formatDate, getNameFile } from '@/utils/handleData'
export default {
  data() {
    return {
      addFrameContractList: {
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
  },
  methods: {
    getCompanyName() {
      console.log('获取客户公司名称下拉选项');
      CustomerDDList().then(res => {
        if (res.data.flag) {
          this.companyNameList = res.data.cust_area;
          console.log(this.companyNameList);
        } else {
          console.log('没数据返回false');
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        this.$message.error(err)
      });

    },
    handleAddFrameContract() {
      console.log('添加框架合同');
      this.formatAllData();
      this.$refs.addFrameContractList.validate((valid) => {
        if (valid) {
          console.log(this.addFrameContractList);
          addFKContract(this.addFrameContractList).then(res => {
            if (res.data.flag) {
              this.$message.success('框架合同添加成功！');
              this.$router.push({
                name: "框架合同列表",
                params: { obj: 0, flag: arguments[0] }
              });
              console.log("添加Yes");
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(err => {
            this.$message.error(err)
          });
        } else {
          console.log('前端验证不能通过!');
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
      if (this.addFrameContractList.signDate && (typeof this.addFrameContractList.signDate) == 'object') {
        this.addFrameContractList.signDate = formatDate(this.addFrameContractList.signDate);
      }
      if (this.addFrameContractList.dateBegin > this.addFrameContractList.dateEnd & this.addFrameContractList.dateBegin !== '' & this.addFrameContractList.dateEnd !== '') {
          this.$message.error("结束时间必须大于或等于开始时间");
          return false;
      } 
      if (this.addFrameContractList.dateBegin && (typeof this.addFrameContractList.dateBegin) == 'object') {
        this.addFrameContractList.dateBegin = formatDate(this.addFrameContractList.dateBegin);
      }
      if (this.addFrameContractList.dateEnd && (typeof this.addFrameContractList.dateEnd) == 'object') {
        this.addFrameContractList.dateEnd = formatDate(this.addFrameContractList.dateEnd);
      }
    },
    handleUploadFile() {
      var file = document.getElementById('tbFileName');
      this.attachmentList.push(file.files[0])

      if(file.value !== '') {
        let oMyForm = new FormData()
        oMyForm.append('file', this.attachmentList[0]);
        //   console.log(oMyForm)
        fileUpload(oMyForm).then(res => {
          if(res.data.result) {
            this.addFrameContractList.attachment = res.data.url;
            document.getElementById('fileNameBox').innerHTML = getNameFile(file.value, '\\');
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
</style>
