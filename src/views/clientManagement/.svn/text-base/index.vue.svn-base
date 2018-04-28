<template>
    <div class="superClass">
        <el-form :inline="true" class="el-form-inline">
              <el-form-item label="客户公司名称：">
                <el-input v-model="CompanyName" placeholder="客户公司名称"></el-input>
              </el-form-item>
              <el-form-item label="客户部门名称：">
                <el-input v-model="DepartmentName" placeholder="客户部门名称"></el-input>
              </el-form-item>
              <el-button type="primary" @click="searchItem()">查询</el-button>
            <el-button type="primary" @click="addItem(0)">添加客户</el-button>
        </el-form>
        <div class="tableContainer">
           <el-table :data="dataArr" v-loading="loading" element-loading-text="拼命加载中" border stripe style="width: 100%">
              <el-table-column prop="CustomerCompanyName" label="客户公司名称" min-width="220"></el-table-column>
              <el-table-column prop="CustomerDepartmentName" label="客户部门名称" min-width="140"></el-table-column>
              <el-table-column prop="InputDate" label="添加时间" min-width="170"></el-table-column>
              <el-table-column prop="InputUser" label="添加人" min-width="170"></el-table-column>
              <el-table-column label="管理列" min-width="160">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">修改</el-button>
                <el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
              </template>
             </el-table-column>
           </el-table>
            <div v-show="totalPage>pageSize" class="paginationW">
              <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage"  :page-size="pageSize" :total="totalPage" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getList, deleteList } from "../../api/clientManagement";
export default {
  data() {
    return {
      CompanyName: "",
      DepartmentName: "",
      pageIndex: 1,
      dataArr: [],
      pageSize: 0,
      // 当前页
      currentPage: 1,
      // 分页
      loading: false,
      totalPage: 0,
      splitPage: {
        pageIndex: 1,
        CompanyName: "",
        DepartmentName: ""
      }
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    handleCurrentChange(val) {
      this.splitPage.pageIndex = val;
      this.getItemList();
    },
    //添加
    addItem() {
      console.log(this.$router);
      let perId = "add";
      this.$router.push({ name: "添加客户", params: { obj: perId, flag: 0 } });
    },
    //修改
    edit(row) {
      this.$router.push({ name: "修改客户", params: { obj: row.ID, flag: 1 } });
    },
    // 获取页面客户列表
    getItemList() {
      this.loading = true;
      let params = {
        companyName: this.CompanyName,
        departmentName: this.DepartmentName,
        pageIndex: this.currentPage
      };
      getList(params)
        .then(res => {
          this.loading = false;
          console.log(res);
          if (res.status == 200) {
            let { data } = res;
            this.dataArr = data.List;
            this.totalPage = data.Total;
            this.pageSize = data.pageSize;
            this.lastPage =
              data.Total % data.pageSize == 0
                ? data.Total / data.pageSize
                : Math.floor(data.Total / data.pageSize) + 1;
            for (var i = 0; i < res.data.List.length; i++) {
              //格式化后台返回的 “添加时间”
              let myInputDate = this.dataArr[i].InputDate;
              let myStr = myInputDate.substr(0, 10);
              this.dataArr[i].InputDate = myStr;
            }
          } else{
             this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    deleteItem(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteList({ ID: row.ID })
            .then(res => {
              if (res.data.flag) {
                this.$message.success("删除成功！");
                this.getItemList();
              } else {
                // this.$message({
                //   type: "info",
                //   message: "删除失败"
                // });
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 搜索
    searchItem() {
      this.getItemList();
      // this.currentPage = 1;
      // this.splitPage.pageIndex = 1;
      // this.splitPage.CompanyName = this.CompanyName;
      // this.splitPage.DepartmentName = this.DepartmentName;
    }
  }
};
</script>

<style lang="less">
.superClass {
  .topContainer {
    // display: flex;
    //width: 880px;
    margin: 0 35px;
    //justify-content: space-between;
    height: 38px;
    margin-bottom: 20px;
    .el-input,
    .el-input__inner {
      width: 200px;
      display: inline-block;
    }
    .el-input__inner {
      width: 200px;
      height: 38px;
      display: inline-block;
      font-size: 13px;
      color: rgba(118, 118, 118, 0.6);
      border-radius: 2px;
      border: 1px solid #bfcbd9;
    }
    .el-input__inner::-webkit-input-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .el-input__inner:-moz-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .el-input__inner::-moz-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .el-input__inner:-ms-input-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }

    .key_box {
      min-width: 200px;
      margin-right: 9px;
      vertical-align: top;
    }
    .input::-webkit-input-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .input:-moz-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .input::-moz-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
    .input:-ms-input-placeholder {
      color: rgba(118, 118, 118, 0.6);
    }
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>
<<style lang="less">
    .el-table th>.cell {
    text-align: center;
}
</style>

