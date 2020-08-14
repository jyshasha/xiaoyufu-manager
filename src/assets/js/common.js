// 时间补零函数
export let getZero = (num) => {
    return num < 10 ? '0'+num : num
}

// 时间格式处理函数
export let timeHandle = time => {
    let newtime = new Date(time)
    let year = newtime.getUTCFullYear()
    let month = getZero(newtime.getMonth() + 1)
    let day = getZero(newtime.getDate())
    let hours = getZero(newtime.getUTCHours())
    let minutes = getZero(newtime.getUTCMinutes())
    let secondes = getZero(newtime.getUTCSeconds())
    return  `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`
}