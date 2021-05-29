import _ from 'lodash'
function component(){
  aaa
  let el = document.createElement('div')
  el.innerHTML = _.join(['hello', 'world'], ' ')
  return el
}

document.body.appendChild(component())