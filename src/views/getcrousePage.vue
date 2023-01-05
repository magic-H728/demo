<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="学期">
        <el-select
          v-model="form.xnxq01id"
          placeholder="请选择要查询的学期"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="Update(item.value)"
          />

        </el-select>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.start_date"
            type="date"
            value-format="YYYYMMDD"
            placeholder="请选择开始日期"
            style="width: 250%"
            @update:model-value="Update"
          />
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts" >
import { ElNotification } from "element-plus";
import "element-plus/theme-chalk/el-notification.css";
import axios from "axios";
import { ref } from "vue";
import { reactive } from "vue";
// 创建form对象
const form = reactive({
  school_id: "",
  xnxq01id: "",
  start_date: "",
});

// 类型“string | null”的参数不能赋给类型“string”的参数。
// 类型“null”的参数不能赋给类型“string”的参数。
// 解决办法：使用类型断言
const user = JSON.parse(sessionStorage.getItem("user") as string);
// const user = JSON.parse(sessionStorage.getItem("user"));

export default {
  created: function () {
    //去除options中的第一个元素
    this.options.shift();
    // const user = JSON.parse(sessionStorage.getItem("user"));
    //将user中的school_id属性赋值给form中的school_id属性
    form.school_id = user.school_id;

    //获取user中的第一个属性
    let firstKey = Object.keys(user)[0];
    //将user中的第一个key赋值给form中的xnxq01id属性
    // this.form.xnxq01id = firstKey;
    form.xnxq01id = firstKey;
    //将user中的第一个value赋值给form中的start_date属性
    // this.form.start_date = user[firstKey];
    form.start_date = user[firstKey];

    //删除user中的school_id属性
    delete user.school_id;
    //将user中的每个属性赋值给options
    for (let key in user) {
      this.options.push({
        value: key,
        label: key,
      });
    }
    console.log("form:", form);
    // this.userInfo = user;
    // console.log(this.userInfo);
    if (user == null) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit: () => {
      console.log("submit!");

      //输出data中的form
      console.log(form);
      axios.post("/api/getcrouse", form).then((res) => {
        // 如果res.status为200，说明登录成功,跳转到首页
        if (res.status === 200) {
          console.log("成功");
          //调用seccess方法
          //   console.log("!!!!!", res.data);
          //将res.data写入ics文件
          const blob = new Blob([res.data], {
            type: "text/calendar;charset=utf-8",
          });
          //   function saveAs(obj: any, fileName: string) {
          //     var a = document.createElement("a");
          //     a.download = fileName;
          //     a.href = URL.createObjectURL(obj);
          //     a.click();
          //     URL.revokeObjectURL(obj);
          //   }
          //   saveAs(blob, form.xnxq01id + "课程表.ics");
          const aEle = document.createElement("a"); // 创建a标签
          const href = window.URL.createObjectURL(blob); // 创建下载的链接
          aEle.href = href;
          aEle.download = form.xnxq01id + "课程表.ics";
          document.body.appendChild(aEle);
          aEle.click();
          document.body.removeChild(aEle);
          window.URL.revokeObjectURL(href);
        } else {
          console.log("失败");
        }
      });
    },
    seccess: () => {
      ElNotification({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    },

    Update: (xnxqid: string | number) => {
      console.log("update!");
      console.log("xnxqid", xnxqid);
      console.log(form);
      //将xnxqid赋值给form中的xnxq01id属性
      form.start_date = user[xnxqid];
      console.log("user", user[xnxqid]);
    },
  },
  data() {
    return {
      //   userInfo: {},
      size: "default",
      value: null,
      options: [
        {
          value: "",
          label: "",
        },
      ],
      //将form对象赋值给data中的form
      form,
      user,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
  