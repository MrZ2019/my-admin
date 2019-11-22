<style>
.image-list {

}
.image-list img {
    width: 80px;
    margin: 4px;
}
.item {
    margin: 8px;
}
.el-tree-node__content {
    height: auto;
}
.is-current {
    color: darkblue;
}
.label {
    
    min-width: 100px;
    display: inline-block;
}
</style>

<template>
<div class="page-folder content">

    

    <div class="toolbar">
        <el-button type="primary" size="mini" @click="selectFolder">添加目录</el-button>
    </div>

    <el-row>

        <el-col :span="7">

            <div class="folder-list ">
                <!-- <ul>
                    <li v-for="dir in folderList">{{dir}}</li>
                </ul> -->
                <el-tree :data="folderList" :render-content="render" @node-click="onFolderClick"></el-tree>
            </div>
        </el-col>

        <el-col :span="17">
            <div class="image-list">
                <img :src="i" alt="" v-for="i in curImgList" @click="previewImg(i)">
            </div>
        </el-col>
    </el-row>


    <el-dialog :visible.sync="showPreview">

        <img :src="curImg" alt="">
    </el-dialog>
</div>
</div>
</template>

<script>
var self

/*------ SCRIPT_START ------*/
var SCRIPT_START_X;
/*------ ------- ------*/

import '../utils'
import config from '../config';


export default {
    name: "Folder",
    data() {
        return {
            folderList: [],

            curImgList: [],

            curImg: '',
            showPreview: false
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

            let filepath = options.path + window.SEP + element
            
            let newItem = {
                name: element,
                filepath: filepath,
                folder: options.path,

            };

            newList.push(newItem);
            }
            
            frame1.postMessage(
            {
                type: "scanDirectory",
                data: newList
            },
            "*"
            );
        });
        },
        
        initSelectFolder() {
            electron.ipcRenderer.on('selectedFolder', (e, p) => {
                frame1.postMessage({
                        type: "getFolder",
                        data: p
                    },
                    "*"
                );
            })
        },
        getImages(query) {
            window.utils.scan(query.path, function (list) {
                let newList = []
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    
                }
            })
        },
        selectFolder() {
            var call = function () {
                console.log('test')
                var res = electron.dialog.showOpenDialog({
                    properties: ["openDirectory"]
                })
                res.then((res)=> {
                    if (res.filePaths.length) {
                        event.sender.send("selectedFolder", res.filePaths[0])
                    }
                })
            }
            var str = window._genCall(call)
            electron.ipcRenderer.send("select-dialog", str)
        }
    },
    created() {
        
        this.folderList = appData.folderList
    },
    mounted() {
        if (!window.mountedMap[this.name]) {
            execute("initSelectFolder")
            window.mountedMap[this.name] = true
        }
        self = this

        
        
    },
    methods: {

        previewImg(img) {
            self.curImg = img

            self.showPreview = true
        },
        selectFolder() {
            execute("selectFolder")
        },
        deleteFolder(node, data) {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex((v) => {
                return v.id == data.id
            })

            children.splice(index, 1)

            saveData()
        },
        onFolderClick(data, node, tree) {
            var path = data.path

            execute("scanDirectory", {
                path: path
            })
        },

        render(h, {
            node,
            data,
            store
        }) {
            // debugger
            return (
<div class="item">
                <span class="label">{data.label.match(/\/([^\/]+$)/)[1]}</span>
                <span>
                <el-button size = "mini" on-click={() => this.deleteFolder(node, data)}>Delete</el-button>
                </span>
                </div>
                )
            }
        },

        callbacks: {
            getFolder(data) {
                self.folderList.push({
                    id: new Date() - 0,
                    path: data,
                    label: data
                })

                saveData()
            },
            scanDirectory(data) {
                self.curImgList = data.map((v)=> {
                    return getNetUrl(v.filepath)
                })

                self.curImgList = self.curImgList.slice(0, config.maxImage)

            }
        }
    }
</script>
