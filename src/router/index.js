import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Err404 from '@/views/404'
import Layout from '@/views/layout/Layout'


//客户管理 模块
import clientMag from '@/views/clientManagement/index'
import clientDetail from '@/views/clientManagement/detail'

// 框架合同管理 模块
import framewordConMag from '@/views/framewordContractMag/index'
import addFrameContract from '@/views/framewordContractMag/addFrameContract'
import editFrameContract from '@/views/framewordContractMag/editFrameContract'
import detailFrameContract from '@/views/framewordContractMag/detailFrameContract'


// 项目合同管理 模块
import contractMag from '@/views/contractManagement/index'
import contractAdd from '@/views/contractManagement/add'
import contractEdit from '@/views/contractManagement/edit'
import contractDetail from '@/views/contractManagement/detail'
import projectKeepFile from '@/views/contractManagement/keepFile'


// 支出合同 模块
import payContractMag from '@/views/payContractMag/index'
import payContractAdd from '@/views/payContractMag/add'
import payContractEdit from '@/views/payContractMag/edit'
import payContractDetail from '@/views/payContractMag/detail'
import payConKeepFile from '@/views/payContractMag/keepFile'

// 支出管理 模块
import payMag from '@/views/payManagement/index'
import projectedPayEditAdd from '@/views/payManagement/projectedPayEditAdd'
import payApplyEditAdd from '@/views/payManagement/payApplyEditAdd'
import actualPayEditAdd from '@/views/payManagement/actualPayEditAdd'
import payApplyAudit from '@/views/payManagement/payApplyAudit'


// 收入管理模块
import incomeMag from '@/views/incomeManagement/index'
import ProjectedIncomeEditAdd from '@/views/incomeManagement/ProjectedIncomeEditAdd'
import actualIncomeEditAdd from '@/views/incomeManagement/actualIncomeEditAdd'
import incomeApplyEditAdd from '@/views/incomeManagement/incomeApplyEditAdd'
import incomeApplyAudit from '@/views/incomeManagement/incomeApplyAudit'
// 收入分配模块
import incomeDist from '@/views/incomeManagement/incomeDistribution'

//供应商管理 模块
import supplierMag from '@/views/supplierManagement/index'
import supplierDetail from '@/views/supplierManagement/detail'

//发票开具
import invoiceIssued from '@/views/invoiceIssued/index'
import invoiceIssuedEditAdd from '@/views/invoiceIssued/invoiceIssuedEditAdd'
import incomeApplyAuditkaiju from '@/views/invoiceIssued/incomeApplyAudit'
import incomeDistkaiju from '@/views/invoiceIssued/incomeDistribution'
import InactualIncomeEditAdd from '@/views/invoiceIssued/actualIncomeEditAdd'

//支出申请
import spendingApplication from '@/views/spendingApplication/index'
import spendingApplicationEditAdd from '@/views/spendingApplication/spendingApplicationEditAdd'
import payApplyAuditzhichu from '@/views/spendingApplication/payApplyAudit'
//import incomeDistkaiju from '@/views/spendingApplication/incomeDistribution'
import SpactualIncomeEditAdd from '@/views/spendingApplication/actualPayEditAdd'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  }, 
  {
    path: '/404',
    component: Err404,
    hidden: true
  },
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    name: '',
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: Home,
        name: '首页',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      },
    ]  
  },
];

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/contract',
    component: Layout,
    redirect: '/index',
    icon: 'fa fa-file-text-o',
    name: '合同签署',
    role: ['管理员', '总经理', '主管','销售经理', '会计'],
    children: [
      {
        path: 'frame/index',
        component: framewordConMag,
        name: '框架合同',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      }, 
      {
        path: 'project/index',
        component: contractMag,
        name: '项目合同',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      },
      {
        path: 'payContract/index',
        component: payContractMag,
        name: '支出合同',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      }
    ]
  },
  {
    path: '/invoiceIssued',
    component: Layout,
    redirect: '/invoiceIssued/index',
    icon: 'fa fa-credit-card',
    name: '发票开具',
    role: ['管理员', '总经理', '主管', '销售经理','会计'],
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: invoiceIssued,
        name: '发票开具',
        meta: {
          role:  ['管理员', '总经理', '主管', '销售经理','会计']
        }
      }
      , {
        path: 'invoiceIssued/:pid/:flag/:id',
        component: invoiceIssuedEditAdd,
        name: '发票申请添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'invoiceIssued/:pid/:flag/:id',
        component: invoiceIssuedEditAdd,
        name: '发票申请修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      },
       {
        path: 'invoiceIssued/:pid/:id',
        component: incomeApplyAuditkaiju,
        name: '发票申请审批',
        meta: {
          role: ['管理员', '主管']
        }
      }, 
       {
        path: 'invoiceIssued/:pid',
        component: incomeDistkaiju,
        name: '发票收入分配',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'invoiceIssued/:pid/:flag/:id/:caid',
        component: InactualIncomeEditAdd,
        name: '发票实际收入添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }
    ]
  },
  {
    path: '/spendingApplication',
    component: Layout,
    redirect: '/spendingApplication/index',
    icon: 'fa fa-file-text-o',
    name: '支出申请',
    role: ['管理员', '总经理', '主管', '销售经理','会计'],
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: spendingApplication,
        name: '支出申请',
        meta: {
          role:  ['管理员', '总经理', '主管', '销售经理','会计']
        }
      }
      , {
        path: 'spendingApplication/:pid/:flag/:id',
        component: spendingApplicationEditAdd,
        name: '支出申请的添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'spendingApplication/:pid/:flag/:id',
        component: spendingApplicationEditAdd,
        name: '支出申请的修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      },
       {
        path: 'spendingApplication/:pid/:id',
        component: payApplyAuditzhichu,
        name: '支出申请的审批',
        meta: {
          role: ['管理员', '主管']
        }
      }, 
       {
        path: 'spendingApplication/:pid/:flag/:ECid/:CAid',
        component: SpactualIncomeEditAdd,
        name: '支出实际支出添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }
    ]
  },
  {
    path: '/clientMag',
    component: Layout,
    redirect: '/clientMag/index',
    icon: 'fa fa-user-circle',
    name: '客户管理',
    role: ['管理员'],
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: clientMag,
        name: '客户列表',
        meta: {
          role: ['管理员']
        }
      },
        {
          path: 'detail/:obj/:flag',
          component: clientDetail,
          name: '客户详情',
          meta: {
            role: ['管理员']
          }
      },
      {
          path: 'edit/:obj/:flag',
          component: clientDetail,
          name: '修改客户',
          meta: {
            role: ['管理员']
          }
      },
      {
          path: 'add/:obj/:flag',
          component: clientDetail,
          name: '添加客户',
          meta: {
            role: ['管理员']
          }
      },
    ]
  },
  {
    path: '/supplierMag',
    component: Layout,
    redirect: '/supplierMag/index',
    icon: 'fa fa-tasks',
    name: '供应商管理',
    role: ['管理员'],
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: supplierMag,
        name: '供应商列表',
        meta: {
          role: ['管理员']
        }
      },
      {
          path: 'edit/:obj/:flag',
          component: supplierDetail,
          name: '修改供应商',
          meta: {
            role: ['管理员']
          }
      },
      {
          path: 'add/:obj/:flag',
          component: supplierDetail,
          name: '添加供应商',
          meta: {
            role: ['管理员']
          }
      },
    ]
  },
  {
    path: '/contract/frame',
    component: Layout,
    redirect: '/contract/frame/index',
    icon: 'fa fa-tasks',
    name: '框架合同',
    role: ['管理员', '总经理', '主管','销售经理', '会计'],
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: framewordConMag,
        name: '框架合同列表',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      },{
        path: 'add',
        component: addFrameContract,
        name: '框架合同添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'edit/:obj',
        component: editFrameContract,
        name: '框架合同修改',
        params:{},
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'detailFrameContract/:Fid',
        component: detailFrameContract,
        name: '框架合同详情',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理']
        }
      },
    ]
  },
  {
    path: '/contract/project',
    component: Layout,
    redirect: '/contract/project/index',
    icon: 'fa fa-file-text-o',
    name: '项目合同',
    role: ['管理员', '总经理', '主管', '销售经理', '会计'],
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: contractMag,
        name: '项目合同列表',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      },{
        path: 'add',
        component: contractAdd,
        name: '项目合同添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'edit/:id',
        component: contractEdit,
        name: '项目合同修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'detail/:pid',
        component: contractDetail,
        name: '项目合同详情',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理']
        }
      },{
        path: 'keepFile/:pid',
        component: projectKeepFile,
        name: '项目合同存档',
        meta: {
          role: ['管理员', '销售经理']
        }
      },
    ]
  },
  {
    path: '/contract/payContract',
    component: Layout,
    redirect: '/contract/payContract/index',
    icon: 'fa fa-file-text-o',
    name: '支出合同',
    role: ['管理员', '总经理', '主管', '销售经理', '会计'],
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: payContractMag,
        name: '支出合同列表',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      },{
        path: 'add',
        component: payContractAdd,
        name: '支出合同添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'edit/:id',
        component: payContractEdit,
        name: '支出合同修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      },{
        path: 'detail/:pid',
        component: payContractDetail,
        name: '支出合同详情',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理']
        }
      },{
        path: 'keepFile/:pid',
        component: payConKeepFile,
        name: '支出合同存档',
        meta: {
          role: ['管理员', '销售经理']
        }
      }
    ]
  },
  {
    path: '/payMag',
    component: Layout,
    redirect: '/payMag/index',
    icon: 'fa fa-file-text-o',
    name: '支出管理',
    role: ['管理员', '总经理', '主管', '销售经理', '会计'],
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: payMag,
        name: '支出列表',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理', '会计']
        }
      }, {
        path: 'projectedPay/:pid/:flag',
        component: projectedPayEditAdd,
        name: '预计支出添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'projectedPay/:pid/:flag/:id',
        component: projectedPayEditAdd,
        name: '预计支出修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'payApply/:pid/:flag/:id',
        component: payApplyEditAdd,
        name: '支出申请添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'payApply/:pid/:flag/:id',
        component: payApplyEditAdd,
        name: '支出申请修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'actualPay/:pid/:flag/:ECid/:CAid',
        component: actualPayEditAdd,
        name: '实际支出添加',
        meta: {
          role: ['管理员', '会计']
        }
      }, {
        path: 'actualPay/:pid/:flag/:id',
        component: actualPayEditAdd,
        name: '实际支出修改',
        meta: {
          role: ['管理员', '会计']
        }
      }, {
        path: 'payApplyAudit/:pid/:id',
        component: payApplyAudit,
        name: '支出申请审批',
        meta: {
          role: ['管理员', '总经理', '主管']
        }
      }
    ]
  },
  {
    path: '/incomeMag',
    component: Layout,
    redirect: '/incomeMag/index',
    icon: 'fa fa-file-text-o',
    name: '收入管理',
    role: ['管理员', '总经理', '主管', '销售经理'],
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        component: incomeMag,
        name: '收入列表',
        meta: {
          role: ['管理员', '总经理', '主管', '销售经理']
        }
      }, {
        path: 'projectedIncome/:pid/:flag',
        component: ProjectedIncomeEditAdd,
        name: '预计收款添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'projectedIncome/:pid/:flag/:id',
        component: ProjectedIncomeEditAdd,
        name: '预计收款修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'IncomeApply/:pid/:flag/:id',
        component: incomeApplyEditAdd,
        name: '收款申请添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'IncomeApply/:pid/:flag/:id',
        component: incomeApplyEditAdd,
        name: '收款申请修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'actualIncome/:pid/:flag/:id/:caid',
        component: actualIncomeEditAdd,
        name: '实际收入添加',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'actualIncome/:pid/:flag/:id',
        component: actualIncomeEditAdd,
        name: '实际收入修改',
        meta: {
          role: ['管理员', '销售经理']
        }
      }, {
        path: 'IncomeApplyAudit/:pid/:id',
        component: incomeApplyAudit,
        name: '收款申请审批',
        meta: {
          role: ['管理员', '主管']
        }

      }, 
       {
        path: 'incomeDist/:pid/:id',
        component: incomeDist,
        name: '收入分配',
        meta: {
          role: ['管理员', '销售经理']
        }
      }
    ]
  },
  // {
  //   path: '/incomeDist',
  //   component: Layout,
  //   redirect: '/incomeDist/edit',
  //   icon: 'fa fa-file-text-o',
  //   name: '收入分配',
  //   role: ['管理员', '销售经理'],
  //   noDropdown: true,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'edit/:pid',
  //       component: incomeDist,
  //       name: '修改收入分配',
  //       meta: {
  //         role: ['管理员', '销售经理']
  //       }
  //     }
  //   ]
  // },
  
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]