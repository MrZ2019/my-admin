var env = "MSI";
var env = "MAC";
var env = "PC";
window.os = require('os').platform();
window.isMac = os == "darwin"
window.isWindows = os == "browser"

// alert(os)

if (isMac) {
  window.SEP = '/'
} else if(isWindows) {
  window.SEP = '\\'
}

window.SEP = '\\'
var def = {
  protocal: "http://",
  appKey: "mars-",
  maxImage: 20
};

let PC = {
  maps: {
    "C:": "localhost:6001",
    "D:": "localhost:6001",
    "E:": "localhost:6001"
  },
  folder: "C:\\Users\\2021\\Documents\\WeChat Files\\wxid_z2glckvtpwp622\\FileStorage\\Video\\2021-10\\"
};
let MAC = {
  protocal: "http://",
  maps: {
    "/zac": "localhost:6001",
  },
  folder: "/zac/video"
};

const MAPS = {
  PC: PC,
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
