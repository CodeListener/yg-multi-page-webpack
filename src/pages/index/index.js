import './index.less'
import lodash from 'lodash'
import axios from 'axios'

console.log(lodash)
document.getElementById('btn').addEventListener('click', () => {
  import('./test').then((res) => {
    res.default.test()
  })
})

axios
  .get('/user', {})
  .then((res) => {
    console.log(res)
  })
  .catch((res) => {
    console.log(res)
  })
