
<style lang='scss'>
    .content {
        padding: 8px;
    }

    .el-table__row {
        user-select: none;
    }

    video {
      width: 600px;
      margin: 48px auto;
      display: block;
    }

    .el-button {
      &.selected {
        pointer-events: none;
      }
    }
</style>

<template>
  <div class="content">
      
      <div>
          <el-button @click="changeView('list')"
          :type="curView == 'list' ? 'success' : '' ">浏览</el-button>
          <el-button @click="changeView('play')"
          :type="curView != 'list' ? 'success' : '' ">播放</el-button>
      </div>
    <div class="file-box" v-show="curView == 'list'">
      <el-table :data="tableData" style="width:100%" @row-dblclick="handleDoubleClick">
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
    </div>

    <div class="play-box"  v-show="curView == 'play'">
      <video :src="curPlaySrc" controls ref="myVideo"></video>
    </div>
  </div>
</template>

<script>
let self;


let path = "D:\\CloudMusic\\MV\\"

import config from "./config"

export default {

  mounted() {
    self = this;
    self.scan(path)

    self.curView = window.metadata2.curView || self.curView
    self.curPlaySrc = window.metadata2.curPlaySrc || self.curPlaySrc
  },
  data() {
    return {
      curView: 'list',  
      tableData: [],
      curFolder: "",


      curPlaySrc: "",
    };
  },
  methods: {
      changeView(mode) {
        self.curView = mode

        if (mode == "list") {
          self.$refs.myVideo.pause()
        }

        window.metadata2.curView = mode
      },
      scan(path) {
        self.curFolder = path
        execute("scanDirectory", {
            path: path
        })


      },
      handleDoubleClick(row, e) {
        //   debugger
        let elm = $(e.currentTarget)
        
        if (row) {
          let src = row.filepath


          for(let k in config.maps) {
            let val = config.maps[k]

            if (src.indexOf(k) != -1) {
              src = src.replace(k, val)
              break;
            }
          }
          self.curPlaySrc = config.protocal + src
          window.metadata2.curPlaySrc = self.curPlaySrc
          self.changeView("play ")
        }else {

          self.scan(self.curFolder + row.name + "\\")
        }
      }
  },
  commands: {
    scanDirectory(options) {
      //   let fs = _require("fs");

      //   alert(fs);
      window.utils.scan(options.path, function(list) {
        let newList = []
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          console.log(element)

          let filepath = options.path + element
          let info = fs.statSync(filepath)
          // debugger
          let type = info.isFile()
          let typeName = info.isFile() ? "文件": "目录"
          let newItem = {
            name: element,
            filepath: filepath,
            folder: options.path,
            type: type,
            typeName: typeName,
          };

          newList.push(newItem);
        }

        newList.unshift({
            name: "..",
            type: ""
        })
        frame1.postMessage(
          {
            type: "scanDirectory",
            data: newList
          },
          "*"
        );
      });
    }
  },

  callbacks: {
    scanDirectory(data) {
      self.tableData = data;
    }
  }
};
</script>

