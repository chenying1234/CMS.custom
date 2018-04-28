<template>
  <div class="frameContract">
    <el-form 
      :inline="true" 
      :model="searchList" 
      class="el-form-inline">
      <el-form-item label="框架合同名称：">
        <el-input v-model="searchList.fkName"  placeholder="框架合同名称"></el-input>
      </el-form-item>
      <el-form-item label="框架合同编号：">
        <el-input v-model="searchList.fkNo" placeholder="框架合同编号"></el-input>
      </el-form-item>
      <el-form-item label="客户公司名称：">
        <el-input v-model="searchList.customer" placeholder="客户公司名称"></el-input>
      </el-form-item>
      <el-form-item label="合同状态：">
        <el-select v-model="searchList.status" clearable placeholder="请选择">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="primary" @click="addFrameContract" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加框架合同</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="frameContractList" v-loading="loading" element-loading-text="拼命加载中" border style="width: 100%">
        <el-table-column prop="FrameworkContractName" label="框架合同名称" width="250">
        </el-table-column>
        <el-table-column prop="CustomerCompanyName" label="客户公司名称" width="220">
        </el-table-column>
        <el-table-column prop="InputDate" label="添加时间" width="160">
        </el-table-column>
        <el-table-column prop="DateBegin" label="合同生效日期" width="160">
        </el-table-column>
        <el-table-column prop="DateEnd" label="合同截止日期" width="160">
        </el-table-column>
        <el-table-column label="管理列" min-width="320">
          <template slot-scope="scope">
            <el-button @click="editFrameContract(scope.row)" type="text" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">修改</el-button>
            <el-button @click="deleteFrameContract(scope.row)" type="text" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">删除</el-button>
            <el-button @click="detailFrameContract(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="relatedContract(scope.$index,frameContractList)" type="text" size="small">相关合同</el-button>
            <el-button @click="downloadAttachment(scope.row)" type="text" size="small">附件下载</el-button>
            <el-button @click="keepFile(scope.row)" type="text" v-if="roles[0]=='管理员' || roles[0]=='销售经理'" >存档</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div v-if="TotalCount > PageSize" class="paginationW">
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="searchList.pageIndex" 
      :page-size="PageSize" 
      :total="TotalCount" layout="total, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import {
  FrameContractList,
  deleteFKContract
} from "@/api/framewordContractManagement.js";
export default {
  data() {
    return {
      searchList: {
        fkName: "",
        fkNo: "",
        customer: "",
        status: "",
        pageIndex: 1
      },
      frameContractList: [],
      statusOptions: [
        {
          value: "生效",
          label: "生效"
        },
        {
          value: "无效",
          label: "无效"
        }
      ],
      loading: false,
      PageSize: 0,
      TotalCount: 0
    };
  },
  created() {
    this.initFrameContractList();
  },
  computed: {
    ...mapGetters(["roles"])
  },
  methods: {
    initFrameContractList() {
      this.loading = true;
      FrameContractList(this.searchList)
        .then(res => {
          if (res.data.flag) {
            this.frameContractList = res.data.List;
            this.PageSize = res.data.pageSize;
            this.TotalCount = res.data.Total;
            for (var i = 0; i < res.data.List.length; i++) {
              //格式化后台返回的 “添加时间”
              let myInputDate = this.frameContractList[i].InputDate;
              let myStr = myInputDate.substr(0, 10);
              this.frameContractList[i].InputDate = myStr;
            }
            this.loading = false;
          } else {
            this.$message.error(res.Message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch() {
      console.log("按条件查询");
      this.initFrameContractList();
    },
    addFrameContract() {
      console.log("添加框架合同");
      this.$router.push({
        name: "框架合同添加",
        params: { obj: 0 }
      });
    },
    editFrameContract(row) {
      console.log("修改框架合同");
      // var _this = this;
      // let oldData = tabData[i].ID;
      // console.log(oldData);
      this.$router.push({
        name: "框架合同修改",
        params: { obj: row.ID, flag: arguments[0] }
      });
    },
    deleteFrameContract(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFKContract({ ID: row.ID })
            .then(res => {
              if (res.data.flag) {
                this.$message.success("删除成功！");
                this.initFrameContractList();
              } else {
                this.$message.error(res.Message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
    detailFrameContract(row){
      console.log('详情');
      console.log(row.ID);
      this.$router.push({name: '框架合同详情', params: { Fid: row.ID}});
    },
    relatedContract(i, tabData) {
      console.log("相关合同");
      let myNFrameContractName = tabData[i].FrameworkContractName;
      // console.log(myNFrameContractName);
      this.$router.push({
        name: "项目合同",
        params: { obj: myNFrameContractName, flag: arguments[0] }
      });
    },
    // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos);
    },
    downloadAttachment(row) {
      console.log("附件下载");
      var attachmentDownloadUrl = this.getNameFile(row.ContractAttachment, "/");
      console.log(attachmentDownloadUrl);
      window.open(attachmentDownloadUrl);
    },
    keepFile(){
      console.log('存档');
    },
    handleSizeChange(val) {
      console.log(val);
      this.searchList.pageIndex = val;
      this.initFrameContractList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.searchList.pageIndex = val;
      this.initFrameContractList();
    }
  }
};
</script>
<style lang="less" scoped>
.frameContract {
  .el-form-inline {
    .el-form-item {
      &:last-child {
        float: right;
      }
    }
  }
}
</style>
