<template>
    <div class="superClassagencydetail">
        <!-- <div class="popover2">
            <h3 v-show="add">添加客户</h3>
            <h3 v-show="modify">修改客户</h3>
            <div class="formContainer">
                <div class="Container">
                    <div v-show="modify || add" class="addEdit">
                        <el-input v-model="addmodify.CompanyName" placeholder="客户公司名称" class="_input" :maxlength='120'></el-input>
                        <el-input v-model="addmodify.DepartmentName" placeholder="客户部门名称" class="_input" :maxlength='100'></el-input>
                    </div>
                    <div class="buttongroup" v-show="bottonshow">
                         <el-button type="primary" @click="submitForm()">提交</el-button>
                          <el-button type="primary" @click="resetForm()">重置</el-button>
                           <el-button type="primary" @click="showPop()">取消</el-button>
                    </div>
                </div>
            </div>
        </div> -->
         <el-form class="ruleForm" v-show="modify || add" label-width="150px">
              <el-form-item label="客户公司名称：">
                <el-input v-model="addmodify.CompanyName" placeholder="客户公司名称"></el-input>
              </el-form-item>
              <el-form-item label="客户部门名称：">
                <el-input v-model="addmodify.DepartmentName" placeholder="客户部门名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm"  v-show="modify">修改</el-button>
                <el-button type="primary" @click="submitForm"  v-show="add">添加</el-button>
                <el-button type="primary" @click="showPop()">关闭</el-button>
              </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { addList, editList, getDetail } from "../../api/clientManagement";
import _ from "lodash";
export default {
  data() {
    return {
      add: false,
      modify: false,
      //添加和修改使用列表
      addmodify: {
        ID: "",
        CompanyName: "",
        DepartmentName: ""
      },
      submitFlge: 0
    };
  },
  created() {
    let flag = this.$route.params.flag;
    console.log(flag);
    console.log(typeof this.$route.params.obj);
    if (flag == 0) {
      this.add = true;
      this.addmodify.ID = 0;
    }
    if (flag == 1) {
      this.modify = true;
      this.getModifyListFilter({ ID: this.$route.params.obj });
      this.addmodify.ID = 0;
    }
  },
  methods: {
    showPop() {
      this.$router.push({ path: "/clientMag/index" });
    },
    //提交
    submitForm() {
      let input = document.querySelectorAll(
        ".ruleForm input"
      );
      // console.log(input);
      for (let i = 0; i < input.length; i++) {
        if (input[i].value.trim() == "") {
          // console.log(i);
          this.$message.error(input[i].getAttribute("placeholder") + "不能为空");
          input[i].focus();
          this.submitFlge = 0;
          return false;
        } else {
          this.submitFlge = 1;
        }
      }
      console.log(this.submitFlge);
      if (this.submitFlge == 1) {
        console.log(this.addmodify);
        console.log("add:" + this.add);
        console.log("modify:" + this.modify);
        if (this.add) {
          console.log(111);
          this.addclientFilter(this.addmodify);
        }
        if (this.modify) {
          this.clientEditFilter(this.addmodify);
        }
      }
    },
    //添加
    addclientFilter(obj) {
      addList(obj).then(res => {
        if (res.status == 200) {
          if (res.data.flag == true) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ path: "/clientMag/index" });
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },

    //修改
    clientEditFilter(obj) {
      console.log("很好ggggg");
      console.log(obj);
      editList(obj).then(res => {
        console.log(obj);
        if (res.status == 200) {
          if (res.data.flag == true) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.push({ path: "/clientMag/index" });
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    //获得修改列表字段
    getModifyListFilter(params) {
      getDetail(params).then(res => {
        if (res.status == 200) {
          console.log("哈哈xixixi哈哈");
          this.addmodify.ID = res.data.customer_return.ID;
          this.addmodify.CompanyName =
            res.data.customer_return.CustomerCompanyName;
          this.addmodify.DepartmentName =
            res.data.customer_return.CustomerDepartmentName;
          console.log(this.addmodify.ID);
          console.log(this.addmodify.CompanyName);
          console.log(this.addmodify.DepartmentName);
        }
      });
    }
  }
};
</script>