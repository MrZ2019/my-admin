
<template>
  <div>
    <div class="filelist"></div>

    <div class="play-box"></div>
  </div>
</template>

<script>
export default {
  mounted() {

      execute("scanDirectory")
  },

  commands: {
    scanDirectory(folder) {
      let fs = _require("fs");

      alert(fs);
    }
  },

  callbacks: {
      CScanDirectory() {
          alert('callback')
      }
  }
};
</script>

