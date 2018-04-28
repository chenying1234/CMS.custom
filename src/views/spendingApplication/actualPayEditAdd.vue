<template>
    <div class="actualPayAdd">
        <el-form ref="actualPayList" :rules="rules" :model="actualPayList" label-width="180px">
            <el-form-item label="实际支出金额：" prop="actualCostPrice">
                <el-input v-model="actualPayList.actualCostPrice"></el-input>
            </el-form-item>
            <el-form-item label="实际支出凭证：" prop="actualCostAttachment">
                <form id="select_file">
                    <div class="fileInfoBox">
                        <el-button>选择文件</el-button>
                        <div id="fileNameBox">未选择任何文件</div>
                    </div>
                    <input type="file" id="tbFileName" name="tbFileName" @change="handleUploadFile" />
                </form>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleActualPayAdd" v-if="addBtn">添加</el-button>
                <el-button type="primary" @click="handleActualPayEdit" v-if="editBtn">修改</el-button>
                <el-button @click="handleCancleActualPayAdd">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { fileUpload } from '@/api/fileUpload'
import { ActualCostAdd, ActualCostEdit, GetactualCostData } from '@/api/payManagement.js'
import { getNameFile } from '@/utils/handleData'
export default {
    data() {
        return {
            actualPayList: {
                actualCostPrice: "",
                actualCostAttachment: "",
                contractID: "",
                expectCostID: "",
                CostApplyID: ""
            },
            addBtn: false,
            editBtn: false,
            rules: {
                actualCostPrice: [{ required: true, message: '请输入实际支出金额', trigger: 'blur' }],
                actualCostAttachment: [{ required: true, message: '请上传实际支出凭证', trigger: 'change' }]
            },
        }
    },
    created() {
        let isFlag = this.$route.params.flag;
        if (isFlag == "add") {
            this.actualPayList.contractID = this.$route.params.pid;
            this.actualPayList.expectCostID = this.$route.params.ECid;
            this.actualPayList.CostApplyID = this.$route.params.CAid;
            this.addBtn = true;
        }
        if (isFlag == "edit") {
            console.log("edit");
            this.editBtn = true;
            this.getEditData();
        }
    },
    methods: {
        handleActualPayAdd() {
            console.log('添加实际支出');
            this.$refs.actualPayList.validate((valid) => {
                if (valid) {
                    ActualCostAdd(this.actualPayList).then(res => {
                        console.log(this.actualPayList);
                        if (res.data.flag) {
                            this.$message.success('实际支出添加成功！');
                            this.$router.push("/spendingApplication/index");
                           // this.$router.push("/contract/project/detail/" + this.$route.params.pid);
                        } else {
                            this.$message.error(res.data.Message);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    });
                } else {
                    console.log('前端验证失败!');
                }
            })
        },
        handleCancleActualPayAdd() {
            console.log('取消添加实际支出');
             this.$router.push("/spendingApplication/index");
         //   this.$router.push("/contract/project/detail/" + this.$route.params.pid);
        },
        // 获取需要修改的数据
        getEditData() {
            GetactualCostData({ ID: this.$route.params.id }).then(res => {
                if (res.data.flag) {
                    console.log(res.data);
                    this.actualPayList = res.data.actualCost_return;
                    document.getElementById('fileNameBox').innerHTML = getNameFile(this.actualPayList.actualCostAttachment,'\_');
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        // 修改实际支出
        handleActualPayEdit(){
            this.$refs.actualPayList.validate((valid) => {
                if (valid) {
                    ActualCostEdit(this.actualPayList).then(res => {
                        if (res.data.flag) {
                            this.$message.success('实际支出修改成功！');
                             this.$router.push("/spendingApplication/index");
                           // this.$router.push("/contract/project/detail/" + this.$route.params.pid);
                        } else {
                            this.$message.error(res.data.Message);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    });
                } else {
                    console.log('前端验证失败!');
                }
            })
        },
        handleUploadFile() {
            var file = document.getElementById('tbFileName');
            if (file.value !== '') {
                let oMyForm = new FormData()
                oMyForm.append('file', file.files[0]);
                //   console.log(oMyForm)
                fileUpload(oMyForm).then(res => {
                    if (res.data.result) {
                        this.actualPayList.actualCostAttachment = res.data.url;
                        document.getElementById('fileNameBox').innerHTML = getNameFile(file.value,'\\');
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
.actualPayAdd {
    width: 60%;
    #select_file {
        position: relative;
        #tbFileName {
            opacity: 0;
            filter: alpha(opacity=0);
            width: 88px;
            height: 36px;
            vertical-align: top; // cursor: pointer;
            &:focus {
                outline: none;
            }
        }
        .fileInfoBox {
            position: absolute;
            left: 0;
            top: 0;
            #fileNameBox {
                display: inline-block;
            }
        }
    }
}
</style>
