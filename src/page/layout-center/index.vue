<template>
  <div class="layout-center">
    <!-- 侧边栏 -->
    <sider-bar :sidbarData="sidbarData" title="布局库">
          <i class="iconfont icon-gengduo" :index='3'></i>
    </sider-bar>
    <!-- 布局展示 -->
    <div class="layout-display">

    </div>
    <!-- 布局设置 -->
    <layout-setting @addline="addline"></layout-setting>
  </div>
</template>
<script>
import siderBar from "../../common/sider-bar";
import layoutSetting from "./layout-setting";

export default {
  data() {
    return {
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
        }
      ]
    };
  },
  methods: {
    addline(data) {
      this.$refs.superLayout.addLine(data);
    }
  },
  components: {
    siderBar,
    layoutSetting
    // superLayout
  }
};
</script>
<style lang="less">
.layout-center {
  display: flex;
  justify-content: space-between;

  .layout-display {
    flex: 1;
    padding: 10px 0 0;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
