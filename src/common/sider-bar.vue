<template>
  <div class="sider-bar">
    <div class="sider-bar-body">
      <div class="sider-bar-head">
        <div class="sbh-title">
          {{title}}
        </div>
        <div class="sbh-operation">
          <el-input placeholder="请输入内容" v-model.trim="searchData" v-show="isSearch" @blur="searchEnterFun($event,'blur')" @keyup.enter.native="searchEnterFun($event,'keyup')" size="mini" style="width:100px">
          </el-input>
          <i class="iconfont icon-chaxun" @click="isSearch=!isSearch"></i>
          <i class="iconfont icon-xinzeng-" @click="addFile"></i>
          <slot></slot>
        </div>
      </div>
      <!-- 文件夹 -->
      <div class="sider-bar-list">
        <div class="sbl-item" v-for="(data,index) in sidbarData" :key="data.id" @dragover.prevent @drop.prevent="dragend($event,data)"
          @dragenter.prevent="dragenter($event,data)" @dragleave.prevent="dragleave($event,data)">
          <div class="sbl-item-header">
            <div class="sbl-l-item-left" @click="setOpenState(data,index)">
              <i :class="setFileIcon(data)"></i>
              <span>{{data.name}}</span>
            </div>
            <div class="sbl-l-item-right" v-show="openIndex==index&&data.isOpen" @click="operation($event,data,data)">
              <i class="iconfont icon-xinzeng"></i>
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-shanchu"></i>
            </div>
          </div>
          <!-- 看板 -->
          <div class="sbl-items-list" v-show="data.isOpen">
            <div class="sbl-l-item" v-for="(item,$index) in data.children" :key="item.id" :class="{'active-bar':activeBar.id===item.id}"
              @drop.prevent="dragend($event,data,item)" @dragleave.prevent="dragleave($event,data,item,$index)"
              @dragenter.prevent="dragenter($event,data,item)">
              <div class="sbl-l-item-left" @click="setActiveBar(item)" draggable="true" @dragstart="dragstart($event,item,data)">
                <i class="iconfont icon-kanbanmiaoshu"></i>
                <span :title="item.name">{{item.name}}</span>
              </div>
              <div class="sbl-l-item-right" v-show="item.isActive" @click="operation($event,data.children,item)">
                <i class="iconfont icon-bianji"></i>
                <i class="iconfont icon-fuzhi"></i>
                <i class="iconfont icon-shanchu"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 布局相关 -->
    <layout-add-file ref="layoutAddFile" :title="title"></layout-add-file>
    <layout-add ref="layoutAdd"></layout-add>
    <layout-eidt ref="layoutEidt"></layout-eidt>
    <layout-remove ref="layoutRemove"></layout-remove>
  </div>
</template>
<script>
import layoutAddFile from "../components/board-center/sidebar/layout-addFile";
import layoutEidt from "../components/board-center/sidebar/layout-eidt";
import layoutAdd from "../components/board-center/sidebar/layout-add";
import layoutRemove from "../components/board-center/sidebar/layout-remove";
import {default as api} from "../api/public.js";
import { default as urls} from "../api/urls/layout-center.js";
export default {
  data() {
    return {
      isSearch: false,
      searchData: "",
      openIndex: -1, //默认展开参数
      activeBar: {
        // isActive: false, //看板是否选中，
        // isOpen: false //文件夹是否展开
      },
      dragNode: {
        // 拖拽节点
        dragParentId: null, // 被拖拽父节点id
        dragData: null, //被拖拽点数据,
        lastParentId: null, // 拖拽经过的上一个节点
        dragParentNode: null // 被拖拽父节点
      }
    };
  },
  props: {
    sidbarData: {
      type: Array,
      default: () => [],
      require: false
    },
    title: {
      type: String,
      default: () => "",
      require: false
    }
  },
  created() {},
  methods: {
    /*
     *文件夹图标切换
     */
    setFileIcon(data) {
      return [
        {
          "iconfont icon-wenjianjia": data.isOpen == false || !data.isOpen,
          "iconfont icon-wenjianjia-zhankai": data.isOpen == true
        }
      ];
    },
    /*
     *isOpen  文件夹开关参数
     */
    setOpenState(data, index) {
      this.openIndex = index;
      if (data.isOpen) {
        this.$set(data, "isOpen", false);
      } else {
        this.$set(data, "isOpen", true);
      }
    },
    /*
     *isActive  看板选中参数
     */
    setActiveBar(data) {
      this.$set(this.activeBar, "isActive", false);
      this.activeBar = data;
      this.$set(data, "isActive", true);
    },
    /*
     *按钮操作
     */
    operation($event, parent, data) {
      let key = $event.target.classList[1];
      switch (key) {
        case "icon-xinzeng": //新增
          this.add(parent, data);
          break;
        case "icon-bianji": //编辑
          this.edit(parent, data);
          break;
        case "icon-fuzhi": //复制
          this.copy(parent, data);
          break;
        case "icon-shanchu": //删除
          this.remove(parent, data);
          break;
        default:
          //不知道干嘛
          break;
      }
    },
    /*
     * 查询事件
     */
    searchEnterFun(e, type) {
      if (type == "blur") {
        //失去焦点
        this.filterData();
      } else {
        //当回车键按下
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.filterData();
        }
      }
    },
    // 查询接口
    filterData() {
      let param = this.searchData ? { alias: this.searchData } : {};
      api.fetchPost(urls.sideBar.search, { params: param }).then(res => {
          

      });
    },
    addFile() {
      this.$refs.layoutAddFile.show(this.sidbarData);
    },
    add(baseData, data) {
      this.$refs.layoutAdd.show(baseData, data);
    },
    edit(baseData, data) {
      this.$refs.layoutEidt.show(baseData, data);
    },
    copy(parent, data) {},
    remove(baseData, data) {
      // this.$refs.layoutRemove.show(baseData, data);
    },
    /*
     *拖拽操作，默认只能拖拽看板节点到其他文件夹
     */
    dragstart(e, node, parent) {
      this.dragNode = {
        dragData: node, //保存被拖拽节点数据与父文件夹
        dragParentId: parent.id,
        lastParentId: parent.id,
        dragParentNode: parent
      };
    },
    // 拖拽进入中
    dragenter(e, parent, node) {
      if (
        e.target.className == "sbl-item-header" ||
        e.target.className == "sbl-l-item"
      ) {
        e.target.style["border-bottom"] = "1px solid #409eff"; //目标节点边框底色变色
      }
      if (this.dragNode.lastParentId != parent.id) {
        this.$set(parent, "isOpen", true); //展开文件夹
      }
    },
    // 拖拽离开目标节点
    dragleave(e, parent, node, $index) {
      if (
        e.target.className == "sbl-item-header" ||
        e.target.className == "sbl-l-item"
      ) {
        e.target.style["border-bottom"] = "1px solid #fff"; //目标节点边框底色恢复
      }
      this.dragNode.lastParentId = parent.id;
    },
    // 拖拽结束
    dragend(e, parent, node) {
      let i = this.dragNode.dragParentNode.children.findIndex(
        val => val.id == this.dragNode.dragData.id
      ); //找到旧节点
      if (e.target.className == "sbl-item-header") {
        if (i != -1) {
          this.dragNode.dragParentNode.children.splice(i, 1); //先删除旧节点
        }
        parent.children.unshift(this.dragNode.dragData); // 插入新节点
      } else if (e.target.className == "sbl-l-item" && node) {
        if (i != -1) {
          this.dragNode.dragParentNode.children.splice(i, 1);
        }
        let index = parent.children.findIndex(val => val.id == node.id); //先删除旧节点
        parent.children.splice(index + 1, 0, this.dragNode.dragData); // 插入新节点
      }

      e.target.style["border-bottom"] = "1px solid #fff"; //目标节点边框底色恢复
    }
  },
  components: {
    layoutEidt,
    layoutRemove,
    layoutAdd,
    layoutAddFile
  }
};
</script>
<style lang="less">
@import url("../assets/less/sidebar.less");
</style>
