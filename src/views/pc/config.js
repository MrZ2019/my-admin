var env = "MSI";
var env = "MAC";
window.os = require('os').platform();
window.isMac = os == "darwin"
window.isWindows = os == "windows"

if (isMac) {
  window.SEP = '/'
} else if(isWindows) {
  window.SEP = '\\'
}
var def = {
  protocal: "http://",
  appKey: "mars-",
  maxImage: 20
};

let MSI = {
  maps: {
    "D:": "localhost:6001",
    "E:": "localhost:6001"
  },
  folder: "E:\\Video\\网易云\\MV\\"
};
let MAC = {
  protocal: "http://",
  maps: {
    "/zac": "localhost:6001",
  },
  folder: "/zac/video"
};

const MAPS = {
  MSI: MSI,
  MAC: MAC
};

window.mountedMap = {};
export default $.extend(MAPS[env], def);

window.PlayHistory = {
  "2018-02-13": [],
  "2018-01-13": [],
  "2019-01-13": []
  // '2019-05-24':
  // [
  //     {
  //         filename: "",
  //         md5: "",
  //         filepath: "",
  //         lastPlayPosition: 0
  //     }
  // ]
};
