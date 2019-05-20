window.COMMANDS = {

}
window.ElectronCallbacks = {

}

let isConnected = true
window.execute = function (command, params, success) {

    try {
        let str = `var params = ${JSON.stringify(params)};var ${command} = ` + COMMANDS[command].toString() + ` ;${command}(params)`
        var parent = isConnected ? window.parent : window;

        parent.postMessage(str, '*')
    } catch (e) {
        alert(e)
    }
}


window.addEventListener('message', function (e) {
    try {
        var set = e.data;
        if (!set) {
            return;
        }
        //   if (set.type == 'list') {
        //       // $Mp3List.list = set.data.slice(0,100)
        //       let list = set.data.sort(function() {
        //           return Math.random() - 0.5
        //       })

        //       $Mp3List.list = list.slice(0,50) 
        //   } 
        let callback = window.ElectronCallbacks[set.type]
        callback && callback.call(null, set.data)
    } catch (e) {
        alert(e)
    }
}) 