<template>
  <el-form :model="formData" :rules="rules" ref="rulesForm" label-width="180px">
      <el-form-item label="预计支出项目：">
        <el-select v-model="formData.ExpectCostID" clearable placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in ProjectedPayDL" :key="item.ID" :label="item.Name" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商名称：" prop="SupplierName">
        <!-- <el-input v-model="formData.SupplierName" placeholder="供应商名称"></el-input> -->
        <el-select v-model="formData.SupplierName" clearable placeholder="请选择" style="width: 100%;" @change="getSupplierData">
          <el-option v-for="item in SupplierDL" :key="item.ID" :label="item.Name" :value="item.Name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商联系人姓名：" prop="SupplierContactName">
          <el-input v-model="formData.SupplierContactName" placeholder="供应商联系人姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="供应商联系人电话：" prop="SupplierContactPhone">
          <el-input v-model="formData.SupplierContactPhone" placeholder="供应商联系人电话" disabled></el-input>
      </el-form-item>
      <el-form-item label="供应商联系人Email：" prop="SupplierContactEmail">
          <el-input v-model="formData.SupplierContactEmail" placeholder="供应商联系人Email" disabled></el-input>
      </el-form-item>
      <el-form-item label="供应商类型：" prop="SupplierType">
          <el-checkbox-group v-model="formData.SupplierType">
              <el-checkbox label="企业" disabled></el-checkbox>
              <el-checkbox label="个人" disabled></el-checkbox>
              <el-checkbox label="外包" disabled></el-checkbox>
              <el-checkbox label="代付" disabled></el-checkbox>
          </el-checkbox-group>
      </el-form-item>
      <el-form-item label="项目负责人：" prop="ProjectOwner">
          <el-input v-model="formData.ProjectOwner" placeholder="项目负责人"></el-input>
      </el-form-item>
      <el-form-item label="对供应商联系人：" prop="SupplierOwner">
          <el-input v-model="formData.SupplierOwner" placeholder="对供应商联系人"></el-input>
      </el-form-item>
      <el-form-item label="服务类别：" prop="ServiceType">
          <el-input v-model="formData.ServiceType" placeholder="服务类别"></el-input>
      </el-form-item>
      <el-form-item label="服务内容：" prop="ServiceContent">
          <el-input v-model="formData.ServiceContent" placeholder="服务内容"></el-input>
      </el-form-item>
      <el-form-item label="服务开始时间：" prop="ServiceStartTime">
          <el-date-picker type="date" v-model="formData.ServiceStartTime" placeholder="请选择" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="服务结束时间：" prop="ServiceEndTime">
          <el-date-picker type="date" v-model="formData.ServiceEndTime" placeholder="请选择" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="支出方式：" prop="PaidWay">
        <el-radio-group v-model="formData.PaidWay">
          <el-radio label="支票">支票</el-radio>
          <el-radio label="现金">现金</el-radio>
          <el-radio label="转账">转账</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发票类型：" prop="InvoiceType">
        <el-radio-group v-model="formData.InvoiceType">
          <el-radio label="服务业发票">服务业发票</el-radio>
          <el-radio label="增值税专用发票（17%）">增值税专用发票（17%）</el-radio>
          <el-radio label="增值税专用发票（6%）">增值税专用发票（6%）</el-radio>
          <el-radio label="增值税普通发票">增值税普通发票</el-radio>
          <el-radio label="费用报销票据">费用报销票据</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="Remark">
        <el-input type="textarea" v-model="formData.Remark" placeholder="请填写"></el-input>
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
import { fileUpload } from '@/api/fileUpload'
import { GetCostApplyData, CostApplyEdit, CostApplyAdd, ExpectCostNameDDL } from '@/api/payManagement'
import { supplierDepDDList } from '@/api/supplierManagement'
export default {
  data() {
    return {
      formData: {
        ContractID: 0,
        ExpectCostID: 0,
        InvoiceType: "",
        PaidWay: "",
        ProjectOwner: "",
        Remark: "",
        ServiceContent: "",
        ServiceEndTime: "",
        ServiceStartTime: "",
        ServiceType: "",
        SupplierContactEmail: "",
        SupplierContactName: "",
        SupplierContactPhone: "",
        SupplierName: "",
        SupplierOwner: "",
        SupplierType: []
      },
      rules: {
        SupplierName: [{ required: true, message: "请输入供应商名称", trigger: "blur" }],
        SupplierContactName: [{ required: true, message: "请输入供应商联系人姓名", trigger: "blur" }],
        SupplierContactPhone: [{ required: true, message: "请输入供应商联系人电话", trigger: "blur" }],
        SupplierContactEmail: [{ required: true, message: "请输入供应商联系人Email", trigger: "blur" }],
        SupplierType: [{ type: 'array', required: true, message: "请选择供应商类型", trigger: "change" }],
        ProjectOwner: [{ required: true, message: "请输入项目负责人", trigger: "blur" }],
        SupplierOwner: [{ required: true, message: "请输入对供应商联系人", trigger: "blur" }],
        ServiceType: [{ required: true, message: "请输入服务类别", trigger: "blur" }],
        ServiceContent: [{ required: true, message: "请输入服务内容", trigger: "blur" }],
        ServiceStartTime: [{ required: true, message: "请选择服务开始时间", trigger: "blur" }],
        ServiceEndTime: [{ required: true, message: "请选择服务结束时间", trigger: "blur" }],
        PaidWay: [{ required: true, message: "请选择支出方式", trigger: "change" }],
        InvoiceType: [{ required: true, message: "请选择发票类型", trigger: "change" }],
        Remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      ProjectedPayDL: [],
      SupplierDL: [],
      editBtn: false,
      addBtn: false
    };
  },
  created() {
    if(this.$route.params.flag == 'add'){
      this.addBtn = true;
      this.formData.ContractID = this.$route.params.pid;
      if(this.$route.params.id != 0) {
        this.formData.ExpectCostID = parseInt(this.$route.params.id);
      } else {
        this.formData.ExpectCostID = null;
      }
    }
    this.getProjectedPayDL();
    this.getSupplierList();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  methods: {
    // 获取预计支出项目下拉列表数据
    getProjectedPayDL() {
      let ContractID = this.$route.params.pid;
      // console.log(this.$route.params.pid)
      ExpectCostNameDDL({ ContractID: ContractID }).then(res => {
        if(res.data.flag) {
          this.ProjectedPayDL = res.data.List;
          
          if(this.$route.params.flag == 'edit') {
            this.editBtn = true;
            if(this.ProjectedPayDL.length != 0 && this.SupplierDL.length != 0){
              this.getEditData();
            }
          }
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    //获取供应商信息
    getSupplierList() {
      supplierDepDDList().then(res => {
        console.log(res)
        if(res.data.flag) {
          this.SupplierDL = res.data.supplier_out;
          if(this.$route.params.flag == 'edit') {
            this.editBtn = true;
            if(this.ProjectedPayDL.length != 0 && this.SupplierDL.length != 0){
              this.getEditData();
            }
          }
        }
      }).catch(err => {
          this.$message.error(err)
      });
    },
    //联动供应商信息
    getSupplierData(val) {
      for(let i = 0; i < this.SupplierDL.length; i++) {
        if(this.SupplierDL[i].Name == val) {
          this.formData.SupplierContactName = this.SupplierDL[i].ContactName;
          this.formData.SupplierContactPhone = this.SupplierDL[i].ContactPhone;
          this.formData.SupplierContactEmail = this.SupplierDL[i].ContactEmail;
          this.formData.SupplierType = this.SupplierDL[i].Type;
          // console.log('成功')
        }
      }
    },

    // 获取需要修改的数据
    getEditData() {
      GetCostApplyData({ID: this.$route.params.id}).then(res => {
        if(res.data.flag) {
          this.formData = res.data.costApply_return;
          console.log(this.formData)
          if(this.formData.ExpectCostID == 0) {
            this.formData.ExpectCostID = null;
          }
        } 
      }).catch(err => {
        this.$message.error(err);
      })
    },
    formatAllData() {
        if (this.formData.ServiceStartTime > this.formData.ServiceEndTime & this.formData.ServiceStartTime !== '' & this.formData.ServiceEndTime !== '') {
            this.$message.error("结束时间必须大于或等于开始时间");
            return false;
        } 
        if(this.formData.ServiceStartTime && (typeof this.formData.ServiceStartTime) == 'object'){
            this.formData.ServiceStartTime = formatDate(this.formData.ServiceStartTime);
        }
        if(this.formData.ServiceEndTime && (typeof this.formData.ServiceEndTime) == 'object'){
            this.formData.ServiceEndTime = formatDate(this.formData.ServiceEndTime);
        }
    },
    //点击关闭按钮
    cancelAdd() {
      this.$router.push("/contract/payContract/detail/" + this.$route.params.pid);
    },
    //修改支出申请
    changeForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          if(!this.formData.ExpectCostID) {
            this.formData.ExpectCostID = 0;
          }
          CostApplyEdit(this.formData)
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
    //添加支出申请
    submitForm() {
      this.formatAllData();
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          if(!this.formData.ExpectCostID) {
            this.formData.ExpectCostID = 0;
          }
                // console.log(this.formData)
          CostApplyAdd(this.formData)
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