<template>
  <div class="keepFile">
    <el-form ref="ruleForm" :rules="rules" :model="formData" label-width="140px">
      <el-form-item label="存档时间：" prop="ArchiveDate">
        <el-date-picker type="date" placeholder="请选择" v-model="formData.ArchiveDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="附件上传：" prop="ArchiveAttachment">
        </el-upload>
        <form id="select_file">
          <div class="fileInfoBox">
              <el-button>选择文件</el-button>
              <div id="fileNameBox">未选择任何文件</div>
          </div>
          <input type="file" id="tbFileName" name="tbFileName" @change="handleFile" />
        </form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancle">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { GetArchive, EditArchive } from '@/api/contractManagement'
import { fileUpload } from '@/api/fileUpload'
import { formatDate, getNameFile } from '@/utils/handleData'
export default {
  data() {
      return {
        formData: {
            ArchiveAttachment: "",
            ArchiveDate: "",
        },
        rules: {
          ArchiveAttachment: [{ required: true, message: '请上传附件', trigger: 'change'}],
          ArchiveDate: [{ required: true, message: '请选择存档时间', trigger: 'blur'}],
        },
        contractId: 0
      }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.contractId = this.$route.params.pid;
      GetArchive({ID: this.contractId}).then(res => {
        if(res.data.Result) {
          this.formData = res.data;
          if(this.formData.ArchiveAttachment) {
            document.getElementById('fileNameBox').innerHTML = getNameFile(this.formData.ArchiveAttachment, '_');
          }
        } else {
          this.$message.error(res.data.Message);
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
     //选择文件上传
    handleFile() {
      var file = document.getElementById('tbFileName');
      if(file.value !== '') {
        let MyForm = new FormData()
        MyForm.append('file', file.files[0]);
        fileUpload(MyForm).then(res => {
            if(res.data.result) {
                this.formData.ArchiveAttachment = res.data.url;
                document.getElementById('fileNameBox').innerHTML = getNameFile(file.value, '\\');
            } else {
              this.$message.error(res.data.Message);
            }
        }).catch(err => {
            this.$message.error(err)
        })
      } 
    },
    handleSubmit() {
       if(this.formData.ArchiveDate && (typeof this.formData.ArchiveDate) == 'object'){
            this.formData.ArchiveDate = formatDate(this.formData.ArchiveDate);
        }
      this.$refs.ruleForm.validate((valid) => {
        if(valid) {
          this.formData.ID = this.contractId;
          EditArchive(this.formData).then(res => {
            console.log(res)
            if(res.data.Result) {
              this.$message({
                  message: '修改成功!',
                  type: 'success'
              });
              this.$router.push({name: '项目合同'})
            } else {
                this.$message.error(res.data.Message);
            }
          }).catch(err => {
              this.$message.error(err)
          })
        } else {
            console.log('error submit!!');
            return false;
        }
      })
    },
    handleCancle() {
      this.$router.push({name: '项目合同'})
    },
  }
}
</script>

<style lang="less" scoped>

</style>
