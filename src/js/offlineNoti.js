var WIFI_noti = {
    title:'提醒',
    body:'在不联网情况下,许多功能或字体将可能无法使用'
}
if (navigator.onLine==false) {
    new window.Notification(WIFI_noti.title,WIFI_noti)
}