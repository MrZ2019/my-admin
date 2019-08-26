

window.fs = require('fs')
window.stat = new fs.Stats()


window.utils = {
    scan: function(path, callback) {
        fs.readdir(path, function(err, list) {
            callback && callback(list)
        })
    },

    selectFolder() {
        alert(ipcRenderer)
    }
}


window._genCall = (api) => {
    return 'var api = ' + api.toString() + `;api();`
}
