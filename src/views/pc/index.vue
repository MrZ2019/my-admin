
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
          :type="curView == 'play' ? 'success' : '' ">播放</el-button>
          <el-button @click="changeView('history')"
          :type="curView == 'history' ? 'success' : '' ">历史</el-button>
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
    <div class="history-box"  v-show="curView == 'history'">
      <el-table :data="historyData" style="width:100%" @row-dblclick="handleDoubleClick">
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column label="进度">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percentage"></el-progress>
          </template>
        </el-table-column>
      </el-table>      
    </div>

  </div>
</template>

<script>
let self;

let timer

import config from "./config"
import {listenEle} from './utils'
export default {

  mounted() {
    self = this;
    window.p = self
    self.scan(config.folder)

    self.curView = window.metadata2.curView || self.curView
    self.curPlaySrc = window.metadata2.curPlaySrc || self.curPlaySrc
    self.curRow = window.metadata2.curRow || self.curRow
    self.historyData = window.metadata2.historyData || self.historyData


    //

    for (const key in self.$refs) {
      window[key] = self.$refs[key]
    }

    listenEle(myVideo, {
      play: ()=> {
        self.startTimer()
      },
      pause: ()=> {
        self.stopTimer()
      }
    })
  },
  data() {
    return {
      curView: 'list',  
      tableData: [],
      curFolder: "",
      curRow: "",


      curPlaySrc: "",
      historyData: []
    };
  },
  methods: {
    onTimerRecord() {
          // console.log(myVideo.currentTime)

          let newRecord = {
            name:  self.curRow.name,
            filepath:  self.curRow.filepath,
            folder:  self.curRow.folder,
            position: parseInt(myVideo.currentTime),
            date: today,
            percentage: parseInt(myVideo.currentTime / myVideo.duration * 100),
          }

          let index = _.findIndex(todayHistory, {filepath: self.curRow.filepath})

          if (index != -1) {
            todayHistory.splice(index, 1)
          }
          todayHistory.unshift(newRecord)

          self.generateHistoryData()
    },
    generateHistoryData() {
      let list = []
      let dates = []
      for (const key in PlayHistory) {
        if (PlayHistory.hasOwnProperty(key)) {
          const day = PlayHistory[key];
          
          dates.push(key)
        }
      }

      dates.sort(function(a,b) {
        return a > b
      })

      for (let index = 0; index < dates.length; index++) {
        const element = dates[index];
        
        list = list.concat(PlayHistory[element])
      }

      self.historyData = JSON.parse(JSON.stringify(list))

      window.metadata2.historyData = self.historyData
    },
      startTimer() {

        if (timer) {
          clearInterval(timer)
        }
        timer = setInterval(self.onTimerRecord, 1000)
      },
      stopTimer() {
        clearInterval(timer)
      },
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

          self.curRow = row
          window.metadata2.curRow = row
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
          self.changeView("play")
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

