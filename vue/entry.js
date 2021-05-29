import Vue from './instance'

let mount = Vue.prototype.$mount
Vue.prototype.$mount = function(){
  console.log('define core $mounted')
  mount.call(this)
}

export default Vue