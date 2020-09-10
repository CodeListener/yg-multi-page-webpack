import "./index.less";
// import a from '@/index/a'
import lodash from 'lodash'

console.log(lodash)
document.getElementById("btn").addEventListener("click", () => {
    console.log(1211)
    import("./test").then((res) => {
        res.default.test();
      });
});
