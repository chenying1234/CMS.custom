
import fetch from '@/utils/fetch';

//框架合同列表
export function FrameContractList(params){
    return fetch({
        url: '/api/FKContract/GetAllFKContractList',
        method: 'get',
        params
    })
}
//客户名称下拉选项
export function CustomerDDList(){
    return fetch({
        url: '/api/CustomerManagement/CustomerDDList',
        method: 'get',
    })
}
//框架合同 添加
export function addFKContract(data){
    return fetch({
        url: '/api/FKContract/FKCPost',
        method: 'post',
        data
    })
}
//框架合同 详情
export function detailFKContract(params){
    return fetch({
        url: '/api/FKContract/GetFKContractData',
        method: 'get',
        params
    })
}
//框架合同 修改
export function editFKContract(data){
    return fetch({
        url: '/api/FKContract/FKCEdit',
        method: 'put',
        data
    })
}
//框架合同 删除
export function deleteFKContract(params){
    return fetch({
        url: '/api/FKContract/FKCDelete',
        method: 'delete',
        params
    })
}

export function FKCDDList(){
    return fetch({
        url: '/api/FKContract/FKCDDList',
        method: 'get',
    })
}

