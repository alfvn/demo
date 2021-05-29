'use strict';

function Vue(){

}
Vue.prototype.$mount = function (){
  console.log('instance define $mount');
};

let mount = Vue.prototype.$mount;
Vue.prototype.$mount = function(){
  console.log('define core $mounted');
  mount.call(this);
};

new Vue({}).$mount();
