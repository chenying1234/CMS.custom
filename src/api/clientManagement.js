import fetch from '@/utils/fetch';
//获取用户列表

export function getList(params) {
  return fetch({
    url: '/api/CustomerManagement/GetAllCustmerList',
    method: 'get',
    params
  });
}
//获取详情
export function getDetail(params) {
  return fetch({
    url: '/api/CustomerManagement/GetCustomerData',
    method: 'get',
    params
  });
}
//客户删除
export function deleteList(params) {
  return fetch({
    url: '/api/CustomerManagement/CustomerDelete',
    method: 'delete',
    params
  });
}
//客户添加
export function addList(params) {
  return fetch({
    url: '/api/CustomerManagement/CustomerPost',
    method: 'post',
    data:params
  });
}
//客户修改
export function editList(params) {
  return fetch({
    url: '/api/CustomerManagement/CustomerEdit',
    method: 'put',
    data:params
  });
}

//客户部门下拉列表
export function customerDepDDList() {
  return fetch({
    url: '/api/CustomerManagement/CustomerDepartmentDDList',
    method: 'get',
  });
}