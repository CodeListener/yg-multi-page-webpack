import { getBanner } from '@/apis/user'
import './index.less'

getBanner().then((res) => {
  console.log(res)
})
