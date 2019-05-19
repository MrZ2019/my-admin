

window.COMMANDS = {

}
window.ElectronCallbacks = {

}

let isConnected = true
window.execute = function (command, params, success) {

    try {
        let str = `var ${command} = ` + COMMANDS[command].toString() + ` ;${command}()`

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
        callback && calllback.call()
    } catch (e) {
        alert(e)
    }
})