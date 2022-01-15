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
  
  // alert(v)
  var result;
  console.log(window.isWindows)

  // debugger
  if (window.isWindows) {
    // alert(v);
    var driver = v.substring(0, 2);
    result = "http://" + config.maps[driver] + v.slice(2);
    // alert(result)
  } else {


    console.log(v)
    
    console.log(123)
    // var root = v.match(/^(\\[^\\]+)/)[1]
    result = "http://" + config.maps[root] + v.slice(root.length);

    console.log('r: '+ result);
  }

  return result;
};
