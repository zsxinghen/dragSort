/* 
 *侧边栏--复制
 */
<template>
  <board-toast :config="moveData" @cancel="close" @sure="save">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="布局名称" prop="name">
          <el-col :span="20">
              <el-input v-model="ruleForm.name" placeholder="请输入复制后名称"></el-input>
          </el-col>
      </el-form-item>
    </el-form>
  </board-toast>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入布局名称"));
      } else {
        let index = this.baseData.findIndex(item => {
          return item.name === value;
        });
        if (index !== -1) {
          return callback(new Error("改文件夹下已存在该名称"));
        }
        callback();
      }
    };
    return {
      moveData: {
        title: "布局复制前确定", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "500px", //弹窗宽
        btnData: ["cancel", "sure"]
      },
      currData: {},
      baseData: [],
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      ruleForm: {
        name: ""
      }
    };
  },
  methods: {
    show(baseData, data) {
      this.baseData = baseData;
      this.currData = data;
      this.moveData.dialogVisible = true;
      setTimeout(() => {
        this.$refs["ruleForm"].resetFields();
      }, 0);
    },
    close() {
      this.moveData.dialogVisible = false;
    },
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let newE = JSON.parse(JSON.stringify(this.currData));
          newE.name = this.ruleForm.name;
          this.baseData.push(newE);
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.layout-copy {
  line-height: 80px;
  text-align: center;
  font-size: 16px;
}
</style>
