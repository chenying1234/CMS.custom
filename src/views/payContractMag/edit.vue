<template>
  <div>
    <pay-contract editBtn="true" :contractFormData="editForm" :fileName="fileName"></pay-contract>
  </div>
</template>
 
<script>
import payContract from '@/components/contractMag/payContract'
import { contractDetail } from '@/api/contractManagement'
export default {
  components: { payContract },
  data() {
      return {
        editForm: {
          // ContractType: '',
          // ContractName: '',
          // ContractNo: '',
          // FrameworkContract: '',
          // CustomerCompanyName: '',
          // CustomerDeptmentName: '',
          // SignDate: '',
          // ContractEffectiveDateBegin: '',
          // ContractEffectiveDateEnd: '',
          // ContractAccpetance: '',
          // FaxPrice: '',
          // Risk: [],
          // ContractAttachment: ''
        },
        Id: null,
        fileName: ''
      }
  },
  created() {
    this.getData();
  },
  methods: {  
    // 截取文件名字
    getNameFile(str) {
      let pos = str.lastIndexOf("\_");
      return str.substring(pos + 1)
    },
    getData() {
      this.Id = this.$route.params.id;
      contractDetail({ID: this.Id}).then(res => {
        if(res.data.Result) {
          this.editForm = res.data;
            // console.log(this.editForm)
          if(this.editForm.ContractAttachment) {
            this.fileName = this.getNameFile(this.editForm.ContractAttachment);
          }
        } else {
          this.$message.error(res.data.Message);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
