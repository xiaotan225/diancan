import Http from './http'

// http.require({ api: '/user.json', params: params, method: "POST" }) */

// export var getuser =  ()=>{http.required({api:'/user.json'})} 
/* 用户 */
export const getuser = () => Http().request({ api: '/user.json'});
export const reqRegister = (params)=> Http().request({api:'/user.json',params:params,method:'POST'})

/* 订单 */
export const apiGetOrder = ()=> Http().request({api:'/order.json'})  
export const apiAddOrder = (params)=> Http().request({api:'/order.json',params:params,method:'POST'})
export const apiAddOrderNum = (has,params)=> Http().request({api:'/order/' +has + '.json',params:params,method:'PUT'})
export const apiSubmitOrder = (params) => Http().request({api:'/submit.json',params:params,method:"POST"})
export const apiOrderDel = (has,params)=> Http().request({api:'/order/' +has + '.json',params:params,method:'delete'})
export const apiOrderCls = ()=> Http().request({api:'/order.json',method:'delete'})  

/* 菜单 */
export const apiGreens = ()=> Http().request({api:'/greens.json'})


/* 管理 */
export const apiAddGreens = (params) => Http().request({api:'/greens.json',params:params,method:"POST"})
export const apiGreensDel = (id)=> Http().request({api:'/greens/' +id + '.json',method:'delete'})

