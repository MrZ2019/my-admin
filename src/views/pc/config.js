
let env = 'MSI'

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

