// 工具js文件 公共函数

/* ====================== 时间格式处理函数 =========================================== */
// 时间补零函数
export let getZero = (num) => {
    return num < 10 ? "0" + num : num;
}

// 时间格式处理函数
export let timeHandle = (UTCtime) => {
    let date = (typeof UTCtime == "string" ? new Date(UTCtime) : UTCtime);
    let year = date.getFullYear();
    let month = getZero(date.getMonth() + 1);
    let day = getZero(date.getDate());
    let hours = getZero(date.getHours());
    let minutes = getZero(date.getMinutes());
    let secondes = getZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;
}