/*
 * @Author: luobochuanqi
 * @Date: 2021-08-11 22:28:05
 * @LastEditTime: 2021-08-11 23:21:09
 * @FilePath: \luoboplus\src\js\reader.js
 */

var path = require("path");
var fs = require("fs");
const internal = require("stream");
 
var pathName = "E:/test";
fs.readdir(pathName, (err, files) => {
    var dirs = [];
    (function iterator(i){
      if(i == files.length) {
        console.log(dirs);
        return ;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){     
        if(data.isFile()){
            dirs.push(files[i]);
            // console.log(dirs)
        }
        iterator(i+1);
       });   
    })(0);
});