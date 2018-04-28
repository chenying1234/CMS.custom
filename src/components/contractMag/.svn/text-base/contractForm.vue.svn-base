<template>
    <el-form :model="contractFormData" :rules="rules" ref="contractFormData" label-width="150px" class="ruleForm">
      <el-form-item label="合同类型：" prop="ContractType">
        <el-select v-model="contractFormData.ContractType" clearable placeholder="请选择">
          <el-option label="项目合同" value="项目合同"></el-option>
          <el-option label="Purchase Order" value="Purchase Order"></el-option>
          <el-option label="无合同" value="无合同"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同名称：" prop="ContractName">
        <el-input v-model="contractFormData.ContractName" placeholder="合同名称"></el-input>
      </el-form-item>
      <el-form-item label="合同编号：" prop="ContractNo">
        <el-input v-model="contractFormData.ContractNo" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item label="所属框架合同：">
         <el-select v-model="contractFormData.FrameworkContract" clearable placeholder="所属框架合同">
          <el-option v-for="item in FrameContractOption" :key="item.ID" :label="item.fkcName" :value="item.fkcName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户公司名称：" prop="CustomerCompanyName">
         <el-select v-model="contractFormData.CustomerCompanyName" clearable placeholder="请选择" @change="changeComName">
          <el-option v-for="item in CCNameOption" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户部门名称：" prop="CustomerDeptmentName">
         <el-select v-model="contractFormData.CustomerDeptmentName" clearable placeholder="请选择">
          <el-option v-for="item in CDNameOption" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签约公司：">
         <el-input v-model="contractFormData.SignCompany" placeholder="签约公司"></el-input>
      </el-form-item>
      <el-form-item label="签署日期：" prop="SignDate">
        <el-date-picker type="date" v-model="contractFormData.SignDate" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同生效日起：" prop="ContractEffectiveDateBegin">
        <el-date-picker type="date" v-model="contractFormData.ContractEffectiveDateBegin" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同生效日止：" prop="ContractEffectiveDateEnd">
        <el-date-picker type="date" v-model="contractFormData.ContractEffectiveDateEnd" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同验收方式：" prop="ContractAccpetance">
        <el-radio-group v-model="contractFormData.ContractAccpetance">
          <el-radio label="邮件方式">邮件方式</el-radio>
          <el-radio label="纸质书面方式">纸质书面方式</el-radio>
          <el-radio label="正式发布/上线即为验收">正式发布/上线即为验收</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同含税价：" prop="FaxPrice">
        <el-input v-model="contractFormData.FaxPrice" placeholder="合同含税价"></el-input>
      </el-form-item>
      <el-form-item label="风险评估：">
        <el-checkbox-group v-model="contractFormData.Risk">
          <el-checkbox label="设计可控"></el-checkbox>
          <el-checkbox label="技术实现难度可控"></el-checkbox>
          <el-checkbox label="项目计划时间进度合理"></el-checkbox>
          <el-checkbox label="有工期表" ></el-checkbox>
          <el-checkbox label="有报价单" ></el-checkbox>
          <el-checkbox label="有需求文档" ></el-checkbox>
          <el-checkbox label="服务内容生产部门是否核实" ></el-checkbox>
          <el-checkbox label="生产部门人力资源是否核实" ></el-checkbox>
          <el-checkbox label="知识产权界定是否清晰" ></el-checkbox>
          <el-checkbox label="服务内容是否界定清晰" ></el-checkbox>
          <el-checkbox label="付款时间和验收条件是否界定清晰" ></el-checkbox>
          <el-checkbox label="程序项目开发和运行环境是否界定" ></el-checkbox>
          <el-checkbox label="客户原因工期延期责任及处理方法是否明晰" ></el-checkbox>
          <el-checkbox label="甲方要求加班条款费用界定" ></el-checkbox>
          <el-checkbox label="是否有违约赔偿条款" ></el-checkbox>
          <el-checkbox label="违约金条款是否甲乙双方对等且有上限" ></el-checkbox>
          <el-checkbox label="是否单独报税费" ></el-checkbox>
          <el-checkbox label="是否明确甲方对已确定需求变更另计费" ></el-checkbox>
          <el-checkbox label="是否界定甲方原因中止项目，按乙方实际完成工作结算" ></el-checkbox>
          <el-checkbox label="CMS是否界定适用的网址" ></el-checkbox>
          <el-checkbox label="图片、音频、软件等第三方购买及版权界定否" ></el-checkbox>
          <el-checkbox label="第三方软件代购是否界定了版本和环境" ></el-checkbox>
          <el-checkbox label="如果有技术支持和培训费用，是否界定了地点" ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="合同附件上传：" prop="ContractAttachment">
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
import { fileUpload } from '@/api/fileUpload'
import { FKCDDList } from '@/api/framewordContractManagement'
import { customerDepDDList } from '@/api/clientManagement'
import { contractEdit, contractAdd } from '@/api/contractManagement'
import { formatDate, getNameFile } from '@/utils/handleData'
export default {
  props: ['editBtn', 'addBtn', 'contractFormData', 'fileName'],
  data() {
    const validFaxPrice = (rule, value, callback) => {
        let reg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/;
        if(!value){
            callback(new Error('请输入合同含税价'));
        } else if(!reg.test(value)){
            callback(new Error('请输入数字，最多带两位小数'));
        } else {
            callback();
        }
    }
    return {
        rules: {
            ContractType: [{ required: true, message: '请选择合同类型', trigger: 'change'}],
            ContractName: [{ required: true, message: '请输入合同名称', trigger: 'blur'}],
            ContractNo: [{ required: true, message: '请输入合同编号', trigger: 'blur'}],
            CustomerCompanyName: [{ required: true, message: '请选择客户公司名称', trigger: 'change'}],
            CustomerDeptmentName: [{ required: true, message: '请选择客户部门名称', trigger: 'change'}],
            SignDate: [{ required: true, message: '请选择签署日期', trigger: 'blur'}],
            ContractEffectiveDateBegin: [{ required: true, message: '请选择合同生效期起', trigger: 'blur'}],
            ContractEffectiveDateEnd: [{ required: true, message: '请选择合同生效期止', trigger: 'blur'}],
            ContractAccpetance: [{ required: true, message: '请选择合同验收方式', trigger: 'blur'}],
            FaxPrice: [{ required: true, trigger: 'blur', validator: validFaxPrice}],
            ContractAttachment: [{ required: true, message: '请上传框架合同附件', trigger: 'change'}],
        },
        FrameContractOption: [],
        CCNameOption: [],
        CDNameOption: [],
        companyAndDepartment_data: [],
        changeCount: 0
    }
  },
  created() {
      this.getSelectData();
      this.getCompanySelectData();
  },
  methods: {
    //选择文件上传
    handleFile() {
      var file = document.getElementById('tbFileName');
      if(file.value !== '') {
        console.log(file.value)
        let MyForm = new FormData()
        MyForm.append('file', file.files[0]);
        fileUpload(MyForm).then(res => {
            if(res.data.result) {
                this.contractFormData.ContractAttachment = res.data.url;
                document.getElementById('fileNameBox').innerHTML = getNameFile(file.value, '\\');
            }
        }).catch(err => {
            this.$message.error(err)
        })
      } 
    },
    formatAllData() {
        if(this.contractFormData.SignDate && (typeof this.contractFormData.SignDate) == 'object'){
            this.contractFormData.SignDate = formatDate(this.contractFormData.SignDate);
        }
        
        if (this.contractFormData.ContractEffectiveDateBegin > this.contractFormData.ContractEffectiveDateEnd & this.contractFormData.ContractEffectiveDateBegin !== '' & this.contractFormData.ContractEffectiveDateEnd !== '') {
            this.$message.error("结束时间必须大于或等于开始时间");
            return false;
        } 
        if(this.contractFormData.ContractEffectiveDateBegin && (typeof this.contractFormData.ContractEffectiveDateBegin) == 'object'){
            this.contractFormData.ContractEffectiveDateBegin = formatDate(this.contractFormData.ContractEffectiveDateBegin);
        }
        if(this.contractFormData.ContractEffectiveDateEnd && (typeof this.contractFormData.ContractEffectiveDateEnd) == 'object'){
            this.contractFormData.ContractEffectiveDateEnd = formatDate(this.contractFormData.ContractEffectiveDateEnd);
        }
    },
    //加载所属框架下拉数据
    getSelectData() {
        FKCDDList().then(res => {
            if(res.data.Result) {
                this.FrameContractOption = res.data.cust_area;
            } else {
                this.$message.error(res.data.Message)
            }
        }).catch(err => {
            this.$message.error(err)
        });
    },
    //加载客户公司下拉数据
    getCompanySelectData() {
        customerDepDDList().then(res => {
            if(res.data.Result) {
                this.companyAndDepartment_data = res.data.data;
              
                for(var i = 0; i < this.companyAndDepartment_data.length; i++) {
                    if(this.companyAndDepartment_data[i].PId == 0) {
                        this.CCNameOption.push(this.companyAndDepartment_data[i]);
                    }
                }
            } else {
                this.$message.error(res.data.Message)
            }
        }).catch(err => {
            this.$message.error(err)
        });
    },
    //生成客户部分下拉列表，获取框架合同附件
    changeComName(value) {
       
        if(this.changeCount < 3) {
            this.changeCount++;
        }
        if(this.changeCount !== 1) {
            this.CDNameOption = [];
            this.contractFormData.CustomerDeptmentName = '';
        } else {
            //获取框架合同附件
            if(this.fileName) {
                document.getElementById('fileNameBox').innerHTML = this.fileName;
            }
        }
        let ccNameId = null;

        // //客户公司没有数据时加载数据
        // if(this.CCNameOption.length == 0) {
        //     console.log(99)
        //     this.getCompanySelectData();
        // }
        //通过公司名称找公司的id
        for(var i = 0; i < this.CCNameOption.length; i++) {
            if(this.CCNameOption[i].Name == value) {
            console.log(this.CCNameOption)
                ccNameId = this.CCNameOption[i].Id;
            }
        }
        // console.log(value)
        //通过公司的id找公司部门的信息
        for(var i = 0; i < this.companyAndDepartment_data.length; i++) {
            if(this.companyAndDepartment_data[i].PId == ccNameId) {
                this.CDNameOption.push(this.companyAndDepartment_data[i]);
            }
        }
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push({name: '项目合同'})
    },
    //修改合同
    changeForm() {
        this.formatAllData();
        let params = this.contractFormData;
        params.ID = Number(this.$route.params.id);
        // console.log(params)
        this.$refs.contractFormData.validate((valid) => {
            if(valid) {
                contractEdit(params).then(res => {
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
    //添加合同
    submitForm() {
        this.formatAllData();
        this.$refs.contractFormData.validate((valid) => {
            if(valid) {
                contractAdd(this.contractFormData).then(res => {
                    if(res.data.Result) {
                        this.$message({
                            message: '添加成功!',
                            type: 'success'
                        });
                        this.$router.push({name: '项目合同'})
                    } else {
                        this.$message.error(res.data.Message);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                console.log(this.contractFormData)
                console.log('error submit!!');
                return false;
            }
        })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
<style lang="less">
.ruleForm{
    .el-checkbox{
        margin-right: 15px;
    }
    .el-checkbox+.el-checkbox{
        margin-left: 0;
    }
    .el-select, .el-date-editor.el-input{
        width: 100%;
    }
}
</style>
