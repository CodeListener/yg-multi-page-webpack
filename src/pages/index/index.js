import "./index.less";
import lodash from 'lodash'
import axios from 'axios'

console.log(lodash)
document.getElementById("btn").addEventListener("click", () => {
    console.log(1211)
    import("./test").then((res) => {
        res.default.test();
      });
});

axios.get('/api/common/banners', {
}).then((res) => {
  console.log(res)
}).catch((res) => {
  console.log(res)
})

