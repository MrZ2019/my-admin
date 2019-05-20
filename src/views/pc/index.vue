
<style>
    .content {
        padding: 8px;
    }

    .el-table__row {
        user-select: none;
    }
</style>

<template>
  <div class="content">

      <div>
          <el-button>浏览</el-button>
          <el-button>播放</el-button>
      </div>
    <div class="file-box">
      <el-table :data="tableData" style="width:100%" @row-dblclick="handleDoubleClick">
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
    </div>

    <div class="play-box"></div>
  </div>
</template>

<script>
let self;

let path = "E:\\Video\\mv\\"


export default {
  mounted() {
    self = this;

    self.scan(path)
  },
  data() {
    return {
      tableData: [],
      curFolder: ""
    };
  },
  methods: {
      scan(path) {
        self.curFolder = path
        execute("scanDirectory", {
            path: path
        })


      },
      handleDoubleClick(row, e) {
        //   debugger
        let elm = $(e.currentTarget)
        
        self.scan(self.curFolder + row.name + "\\")
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
            debugger
          let type = window.stat.isFile(options.path + element) ? "文件": "目录"
          let newItem = {
            name: element,
            type: type
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

