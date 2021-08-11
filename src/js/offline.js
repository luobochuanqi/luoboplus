//WIFI测试的弹窗
var WIFI_online = {
    title:'网络检测',
    body:'您已连接上网络'
}
  
var WIFI_offline = {
    title:'网络检测',
    body:'网络连接断开,许多功能或字体可能无法使用'
}
  
window.addEventListener('online',function(){//上线事件监测
    new window.Notification(WIFI_online.title,WIFI_online)
})
      
window.addEventListener('offline',function(){//下线
    new window.Notification(WIFI_offline.title,WIFI_offline)
})