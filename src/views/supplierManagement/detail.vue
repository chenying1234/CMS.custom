<template>
    <div class="superClassagencydetail">
         <el-form :model="addmodify" class="ruleForm" :rules="rules" ref="rulesForm" label-width="150px">
              <el-form-item label="供应商名称：" prop="SupplierName">
                <el-input v-model="addmodify.SupplierName" placeholder="供应商名称"></el-input>
              </el-form-item>
               <el-form-item label="供应商联系人姓名：" prop="SupplierContactName">
                <el-input v-model="addmodify.SupplierContactName" placeholder="供应商联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="供应商电话：" prop="SupplierContactPhone">
                <el-input v-model="addmodify.SupplierContactPhone" placeholder="供应商电话"></el-input>
              </el-form-item>
               <el-form-item label="供应商Email：" prop="SupplierContactEmail">
                <el-input v-model="addmodify.SupplierContactEmail" placeholder="供应商Email"></el-input>
              </el-form-item>
              <el-form-item label="供应商类型：" prop="SupplierType">
                  <el-checkbox-group v-model="addmodify.SupplierType">
                      <el-checkbox label="企业"></el-checkbox>
                      <el-checkbox label="个人"></el-checkbox>
                      <el-checkbox label="外包"></el-checkbox>
                      <el-checkbox label="代付"></el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                 <el-button type="primary" @click="changeForm" v-if="editBtn">修改</el-button>
                 <el-button type="primary" @click="submitForm" v-if="addBtn">添加</el-button>
                <el-button type="primary" @click="showPop()">关闭</el-button>
              </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { addList, editList, getDetail } from "../../api/supplierManagement";
import _ from "lodash";
export default {
  data() {
    const validPhone = (rule, value, callback) => {
      let reg = /(^1\d{10}$)/g;
      if (!value) {
        callback(new Error("请输入供应商联系人电话"));
      } else if (!reg.test(value)) {
        callback(new Error("供应商联系人电话格式不正确"));
      } else {
        callback();
      }
    };
    const validEmail = (rule, value, callback) => {
      let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g;
      if (!value) {
        callback(new Error("请输入供应商联系人邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("供应商联系人邮箱格式不正确"));
      } else {
        callback();
      }
    };
    return {
      editBtn: false,
      addBtn: false,
      //添加和修改使用列表
      addmodify: {
        ID: 0,
        SupplierName: "",
        SupplierContactName: "",
        SupplierContactPhone: "",
        SupplierContactEmail: "",
        SupplierType: []
      },
      rules: {
        SupplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" }
        ],
        SupplierContactName: [
          { required: true, message: "请输入供应商联系人姓名", trigger: "blur" }
        ],
        SupplierContactPhone: [
          { required: true, trigger: "blur", validator: validPhone }
        ],
        SupplierContactEmail: [
          { required: true, trigger: "blur", validator: validEmail }
        ],
        SupplierType: [
          {
            type: "array",
            required: true,
            message: "请选择供应商类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    let pageFlag = this.$route.params.flag;
    if (pageFlag == 0) {
      this.addBtn = true;
    }
    if (pageFlag == 1) {
      this.getEditData();
      this.editBtn = true;
    }
  },
  methods: {
    //关闭
    showPop() {
      this.$router.push({ path: "/supplierMag/index" });
    },
    //添加
    submitForm() {
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          addList(this.addmodify)
            .then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "添加成功!",
                  type: "success"
                });
                this.$router.push({ path: "/supplierMag/index" });
              } else {
                this.$message.error(res.data.message);
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
    //修改
    changeForm() {
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          editList(this.addmodify)
            .then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "修改成功!",
                  type: "success"
                });
                this.$router.push({ path: "/supplierMag/index" });
              } else {
                this.$message.error(res.data.message);
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
    // 获取需要修改的数据
    getEditData() {
      getDetail({ ID: this.$route.params.obj })
        .then(res => {
          if (res.status == 200) {
            this.addmodify = res.data.Supplier_return;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>