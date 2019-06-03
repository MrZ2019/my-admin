
var env = 'MSI'
var env = 'HEHUI'

var def = {
  protocal: "http://",
  appKey: 'mars-'
}

let MSI = {
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
export default $.extend(MAPS[env], def)

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
