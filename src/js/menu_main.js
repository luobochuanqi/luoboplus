/*
 * @Author: luobochuanqi
 * @Date: 2021-08-09 11:36:29
 * @LastEditTime: 2021-08-09 11:44:05
 * @FilePath: \luoboplus\src\js\menu_main.js
 */
const { Menu } = require('electron')
//
var template = [
    {
        label: '程序',
        submenu: [
            {
                label: '退出',
                accelerator: 'ctrl+q',//快捷键
                role: 'quit'
            }
        ]
    },
    {
        label: '执行',
        submenu: [
            {
                label: '重载窗口',
                role: 'reload'
            },
            {
                label: '关闭窗口',
                role: 'close'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
]

var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)