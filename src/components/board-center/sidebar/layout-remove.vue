/* 
 *侧边栏--删除
 */
<template>
  <board-toast :config="moveData" @cancel="close" @sure="save">
     <div class="layout-remove">
          是否确定删除？
     </div>
  </board-toast>
</template>
<script>
export default {
  data() {
    return {
      moveData: {
        title: "删除确定", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "500px", //弹窗宽
        btnData: ["cancel", "sure"]
      },
      currData: {},
      baseData: []
    };
  },
  methods: {
    show(baseData, data) {
      this.baseData = baseData;
      this.currData = data;
      this.moveData.dialogVisible = true;
    },
    close() {
      this.moveData.dialogVisible = false;
    },
    save() {
      let index = this.baseData.findIndex(item => {
        return item.id === this.currData.id;
      });
      this.baseData.splice(index, 1);
      this.close();
    }
  }
};
</script>
<style lang="less">
.layout-remove {
  line-height: 80px;
  text-align: center;
  font-size: 16px;
}
</style>
