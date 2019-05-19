
export default {
    created() {

        let commands = this.$options.commands

        for (let index in commands) {
            const item = commands[index];
            
            window.COMMANDS[index] = item
        }

        let callbacks = this.$options.callbacks

        for (let index in callbacks) {
            const item = callbacks[index];
            
            window.ElectronCallbacks[index] = item
        }
    }
}