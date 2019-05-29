
export default {
    protocal: 'http://',
    maps: {
        "D:": "localhost:6001"
    }
}

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