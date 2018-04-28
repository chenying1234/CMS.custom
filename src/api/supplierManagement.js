import fetch from '@/utils/fetch';
//获取供应商列表

export function getList(params) {
  return fetch({
    url: '/api/SupplierManagement/GetAllSupplierList',
    method: 'get',
    params
  });
}
//获取详情
export function getDetail(params) {
  return fetch({
    url: '/api/SupplierManagement/GetSupplierData',
    method: 'get',
    params
  });
}
//供应商删除
export function deleteList(params) {
  return fetch({
    url: '/api/SupplierManagement/SupplierDelete',
    method: 'delete',
    params
  });
}
//供应商添加
export function addList(params) {
  return fetch({
    url: '/api/SupplierManagement/SupplierPost',
    method: 'post',
    data:params
  });
}
//供应商修改
export function editList(params) {
  return fetch({
    url: '/api/SupplierManagement/SupplierEdit',
    method: 'put',
    data:params
  });
}

//供应商下拉列表
export function supplierDepDDList() {
  return fetch({
    url: '/api/SupplierManagement/SupplierDDList',
    method: 'get',
  });
}