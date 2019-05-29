
var env = 'MSI'
var env = 'HEHUI'

let MSI = {
    protocal: 'http://',
    maps: {
        "D:": "localhost:6001",
        "E:": "localhost:6001"
    },
    folder: "E:\\Video\\网易云\\MV\\"
}
let HEHUI = {
    protocal: 'http://',
    maps: {
        "D:": "localhost:6001",
    },
    folder: "D:\\CloudMusic\\MV\\"
}

const MAPS = {
    MSI: MSI,
    HEHUI: HEHUI
}
export default MAPS[env]

window.PlayHistory = {
    '2018-02-13': [],
    '2018-01-13': [],
    '2019-01-13': [],
    // '2019-05-24': 
    // [
    //     {
    //         filename: "",
    //         md5: "",
    //         filepath: "",
    //         lastPlayPosition: 0
    //     }
    // ]
}

window.today = moment().format("YYYY-MM-DD")

window.todayHistory = window.PlayHistory[today] = []