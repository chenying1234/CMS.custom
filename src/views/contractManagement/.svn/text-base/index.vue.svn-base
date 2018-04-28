<template>
  <div class="contractList">
    <el-form :inline="true" :model="searchList" class="el-form-inline">
      <el-form-item label="合同名称：">
        <el-input v-model="searchList.ContractName" placeholder="合同名称"></el-input>
      </el-form-item>
      <el-form-item label="合同编号：">
        <el-input v-model="searchList.ContractNo" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item label="合同类型：">
        <el-select v-model="searchList.ContractType" clearable placeholder="请选择" style="width: 150px;">
          <el-option label="项目合同" value="项目合同"></el-option>
          <el-option label="Purchase Order" value="Purchase Order"></el-option>
          <el-option label="无合同" value="无合同"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户公司名称：">
        <el-input v-model="searchList.CustomerCompanyName" placeholder="客户公司名称"></el-input>
      </el-form-item>
      <el-form-item label="框架合同名称：">
        <el-input v-model="searchList.FrameworkContract" placeholder="框架合同名称"></el-input>
      </el-form-item>
      <el-form-item label="是否存档：">
        <el-select v-model="searchList.isArchive" clearable placeholder="请选择" style="width: 100px;">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initPage">查询</el-button>
        <el-button type="primary" @click="addNewContract" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">添加合同</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="contractInfo" v-loading="loading" element-loading-text="拼命加载中" border stripe style="width: 100%">
      <el-table-column prop="ContractType" label="合同类型" min-width="160"></el-table-column>
      <el-table-column prop="ContractName" label="合同名称" min-width="160"></el-table-column>
      <el-table-column prop="DateBegin" label="合同生效日起" min-width="140"></el-table-column>
      <el-table-column prop="DateEnd" label="合同生效日止" min-width="140"></el-table-column>
      <el-table-column prop="InputData" label="添加时间" min-width="140"></el-table-column>
      <el-table-column label="存档" min-width="80" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">
        <template slot-scope="scope">
          <div v-if="scope.row.ArchiveAttachmentUrl">
            <el-button type="text" style="cursor: default;">已存档</el-button>
            <el-button type="text" @click="downloadArchive(scope.row)" style="margin-left: 0;">下载</el-button>
          </div>
          <el-button type="text" v-else style="cursor: default;">未存档</el-button>
        </template>
      </el-table-column>
      <el-table-column label="管理列" min-width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="editContract(scope.row)" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">修改</el-button>
          <el-button type="text" @click="deleteContract(scope.row)" v-if="roles[0]=='管理员' || roles[0]=='销售经理'">删除</el-button>
          <el-button type="text" @click="showDetailContract(scope.row)">详情</el-button>
          <el-button type="text" @click="downloadAttachment(scope.row)">附件下载</el-button>
          <el-button type="text" @click="keepFile(scope.row)">存档</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="TotalCount>PageSize" class="paginationW">
      <el-pagination @current-change="handleCurrentChange" :current-page="searchList.PageNum" :page-size="PageSize" :total="TotalCount" layout="total, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'

import { contractList, contractDelete } from '@/api/contractManagement.js'
export default {
  data() {
      return {
        searchList: {
          ContractName: '',
          ContractNo: '',
          ContractType: '',
          CustomerCompanyName: '',
          FrameworkContract: '',
          isArchive: '',
          PageNum: 1,
        },
        contractInfo: [],
        loading: false,
        PageSize: 0,
        TotalCount: 0,
      }
  },
  created() {
      if(this.$route.params.obj != undefined) {
        this.searchList.FrameworkContract = this.$route.params.obj;
      }
    this.initPage();
  },
  computed: {
    ...mapGetters([
          'roles'
      ])
  },
  methods: {
    initPage() {
      this.loading = true;
      contractList(this.searchList).then(res => {
        this.loading = false;
        if(res.data.Result){
          this.contractInfo = res.data.data;
          this.PageSize = res.data.PageSize;
          this.TotalCount = res.data.TotalCount;
          // console.log(res)
        } else {
          this.$message.error(res.data.Message);
        }
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
    },
      // 截取文件名字
    getNameFile(str, tag) {
      let pos = str.indexOf(tag);
      return str.substring(pos)
    },
    // 附件下载
    downloadAttachment(row) {
      window.open(this.getNameFile(row.ContractAttachmentUrl, '\/'));
    },
    // 存档下载
    downloadArchive(row) {
      window.open(this.getNameFile(row.ArchiveAttachmentUrl, '\/'));
    },
    handleCurrentChange(val) {
      this.searchList.PageNum = val;
      this.initPage();
    },
    addNewContract() {
      this.$router.push({name: '项目合同添加'});
    },
    editContract(row) {
      this.$router.push({name: '项目合同修改', params: { id: row.Id}});
    },
    deleteContract(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(() => {
        contractDelete({ID : row.Id}).then(res => {
          if(res.data.Result) {
            this.$message.success('删除成功！');
            this.initPage();
          } else {
            this.$message.error(res.data.Message);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }).catch(() => {
        this.$message.info('已取消删除！');
      })
    },
    showDetailContract(row) {
      this.$router.push({name: '项目合同详情', params: { pid: row.Id}});
    },
    keepFile(row) {
      this.$router.push({name: '项目合同存档', params: { pid: row.Id}});
    }
  }
}
</script>

<style lang="less" scoped>
.contractList{
  .el-form-inline{
    .el-form-item{
      &:last-child{
        float: right;
      }
      .el-input{
        width: 150px;
      }
    }
  }
}
</style>
<style lang="less">
.contractList{
  .el-form-inline{
    .el-form-item{
      label{
        padding-right: 0;
      }
    }
  }
}
</style>
