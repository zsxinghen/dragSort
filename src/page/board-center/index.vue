/*
*看板中心右边看板部分
*/
<template>
  <div class="board-center">
    <!-- 侧边栏 -->
    <sider-bar :sidbarData="sidbarData" title="看板库">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="iconfont icon-gengduo"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>看板授权</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sider-bar>
    <!-- 布局展示 -->
    <div class="board-display">
      <div class="board-display-body">
        <div class="board-display-header">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-shezhi"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>标题设置</el-dropdown-item>
              <el-dropdown-item>布局设置</el-dropdown-item>
              <el-dropdown-item>背景设置</el-dropdown-item>
              <el-dropdown-item>共享参数</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <super-layout :config="configData" ref="superLayout"></super-layout>
      </div>
    </div>
  </div>
</template>
<script>
import siderBar from "../../common/sider-bar";
import superLayout from "../../common/superLayout";
export default {
  data() {
    return {
      configData: {
        layout: [
          {
            x: 0,
            y: 0,
            w: 20,
            h: 1,
            i: "0"
          },
          {
            x: 20,
            y: 0,
            w: 20,
            h: 1,
            i: "1"
          },
          {
            x: 40,
            y: 0,
            w: 20,
            h: 1,
            i: "2"
          },
          {
            x: 60,
            y: 0,
            w: 20,
            h: 1,
            i: "3"
          },
          {
            x: 80,
            y: 0,
            w: 20,
            h: 1,
            i: "4"
          },
          {
            x: 0,
            y: 0,
            w: 20,
            h: 1,
            i: "5"
          }
        ],
        rowHeight: 200,
        isDraggable: true,
        isResizable: true,
        line: 1
      },
      sidbarData: [
        {
          name: "报表库A",
          id: 1,
          children: [
            {
              name: "报表界面1",
              id: 11
            },
            {
              name: "报表界面2",
              id: 12
            },
            {
              name: "报表界面3",
              id: 13
            },
            {
              name: "报表界面4",
              id: 14
            }
          ]
        },
        {
          name: "报表库B",
          id: 2,
          children: [
            {
              name: "报表界面1",
              id: 21
            },
            {
              name: "报表界面2",
              id: 22
            }
          ]
        },
          {
          name: "报表库B",
          id: 3,
          children: [
            {
              name: "报表界面1",
              id: 31
            },
            {
              name: "报表界面2",
              id: 32
            }
          ]
        }
      ]
    };
  },
  methods: {},
  components: {
    siderBar,
    superLayout
  }
};
</script>
<style lang="less">
.board-center {
  display: flex;
  justify-content: space-between;

  .board-display {
    flex: 1;
    padding: 10px 10px 0 0;
    height: 100%;
    box-sizing: border-box;

    .board-display-body {
      width: 100%;
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0px 2px 5px 0px rgba(24, 27, 45, 0.14);
      height: 100%;
      box-sizing: border-box;
      overflow: auto;

      .board-display-header {
        width: 100%;
        box-sizing: border-box;
      }

      .layout-display-body::-webkit-scrollbar {
        display: none;
      }
    }

    .boar-display-body::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
