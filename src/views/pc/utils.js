export function listenEle(elm, events) {
  if (events instanceof Array)
    for (let index = 0; index < events.length; index++) {
      let eventName = events[index];

      elm.addEventListener(eventName, function () {
        console.log(eventName);
      });
    }
  else {
    for (const key in events) {
      let callback = events[key];

      elm.addEventListener(key, callback);
    }
  }
}
import config from "./config";

window.getNetUrl = function (v) {
  

  var result;

  if (window.isWindows) {
    var driver = v.substring(0, 2);
    result = "http://" + config.maps[driver] + v.slice(2);
  } else {
    
    var root = v.match(/^(\/[^\/]+)/)[1]
    result = "http://" + config.maps[root] + v.slice(root.length);
  }

  return result;
};
