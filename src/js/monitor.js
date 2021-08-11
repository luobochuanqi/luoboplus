/*
 * @Author: your name
 * @Date: 2021-08-07 17:56:06
 * @LastEditTime: 2021-08-09 10:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \luoboplus\src\js\monitor.js
 */
import { Client } from "zerorpc";
const client = new Client();
client.connect("tcp://127.0.0.1:4242");

let name = document.querySelector('#name')
let result = document.querySelector('#result')
name.addEventListener('input', () => {
  client.invoke("hello", name.value, (error, res) => {
    if(error) {
        console.error(error)
    } else {
        result.textContent = res
    }
  })
})
name.dispatchEvent(new Event('input'))