<template>
  <div class="superLayout">
    <grid-layout  v-if="config" 
                  :layout="config.layout" 
                  :col-num="100" 
                  :row-height="config.rowHeight" 
                  :is-draggable="config.isDraggable"
                  :is-resizable="config.isResizable" 
                  :vertical-compact="true" :margin="[10,10]" 
                  :use-css-transforms="true">
      <grid-item class="effect" :class="['effect'+item.i]" v-for="item in config.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
        :i="item.i" @girdItemBack="girdItemBack">
        <!-- 背景 -->
        <div class="bg"  @mouseenter="setDraggable(true)"></div>
        <div class="grid-item-body" @mouseenter="setDraggable(false)">
          <!--图标-->
          <!-- 待添加 -->
        </div>
        <!--工具 -->
        <div class="toolbar" v-if="!isToolbar" @mousedown.stop @mousemove.stop @click.stop> 
          <svg class="icon" aria-hidden="true"  @click="editLayoutItem(item.i)">
              <use xlink:href="#icon-edit"></use>
          </svg>
          <svg  class="icon-size icon" aria-hidden="true"  @click="refreshLayoutItem()">
              <use xlink:href="#icon-refresh"></use>
          </svg>
          <svg  class="icon-size icon" aria-hidden="true">
              <use xlink:href="#icon-details"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zoom"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more"></use>
          </svg>
          <!-- <span class="el-icon-edit" @click.stop="editLayoutItem(item.i)" @mousedown.stop></span>
          <span class="el-icon-refresh" @click.stop="refreshLayoutItem()" @mousedown.stop></span>
          <span class="el-icon-circle-close" @click.stop="removeLayoutItem(item)" @mousedown.stop></span> -->
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import GridLayout from "./grid-layout/GridLayout";
import GridItem from "./grid-layout/GridItem";

export default {
  props: [
    "config",
    "isToolbar"
  ],
  data() {
    return {
    };
  },
  mounted() {
   
  },
  methods: {
    setDraggable(flag) {
      this.config.isDraggable = flag;
    },
    girdItemBack() {//

    },
    refreshLayoutItem() {
      //刷新
      this.$emit("refreshLayoutItem");

    },
    editLayoutItem(id) {

    },
    removeLayoutItem(data) {
      //删除布局
      // let index = this.config.layout.findIndex(item => {
      //   return item.i === data.i;
      // });

      // this.$confirm("删除, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.config.layout.splice(index, 1);
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });

    },
    addLine(data) {
      //添加行
      let line = this.config.line++;
      this.createdLine({...data,line});
    },
    createdLine(data) {
      debugger
      let clearance = 0;
      let nextWidth = [];
      //创建行
      for (let i = 0; i < data.span; i++) {
        let width = data.ws[i]||((100-data.all)/(data.span-data.ws.length));
            nextWidth.push(width);
            if(i>0){
             clearance += nextWidth[i-1];
            }
        this.config.layout.push({
          x: clearance,
          y: data.line,
          w: width,
          h: 1,
          i: "_" + (new Date().getTime() + i) + "_",
          flag: true
        });
        console.log(this.config.layout)
      }
    },
    createdLayout(id) {
      //创建布局
      return {
        //布局位置
        layoutId: id,
        layout: [],
        line: 0, //行
        rowHeight: 200, //行高
        isDraggable: true, //是否支持推拽
        isResizable: true //是否支持改变大小
      };
    }
  },
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      configData: {}
    };
  }

};
</script>
<style lang="less">
.superLayout {
  width: 100%;
  .vue-grid-item.vue-grid-placeholder {
    background-color: #000;
  }
  .toolbar {
    cursor: auto;
    padding: 5px 5px;
    border-radius: 20px;
    line-height: 1;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    white-space: nowrap;
    svg{
      font-size: 14px;
      color: #B0B1C0;
      margin-left:5px;
      cursor: pointer;
    }
    .icon-size{
      font-size: 16px;
    }
  }
}

.bg {
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
  left: 0;
}

// .myChart {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   width: 100%;
//   box-sizing: border-box;
// }
.effect {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  padding-top: 25px;
  box-sizing: border-box;
  background-color: white;
}
.grid-item-body {
  width: 100%;
  height: 100%;
  position: relative;
}

.effectActive {
  border: 3px solid #00c1ff;
}

.effect:after,
.effect:before {
  content: "";
  position: absolute;
  top: 50%;
  bottom: 0px;
  left: 20px;
  right: 20px;
  border-radius: 100px/10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: -2;
}
</style>
