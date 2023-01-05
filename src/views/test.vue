<template>
    <div class="container">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="学号"
          prop="school_id"
        >
          <el-input
            v-model="ruleForm.school_id"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
  
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
  
        <!-- <el-form-item
          label="Age"
          prop="age"
        >
          <el-input v-model.number="ruleForm.age" />
        </el-form-item> -->
  
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >登录
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
  
      </el-form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { UserFilled } from "@element-plus/icons-vue";
  import { reactive, ref } from "vue";
  import type { FormInstance } from "element-plus";
  import { ElNotification } from "element-plus";
  import "element-plus/theme-chalk/el-notification.css";
  import axios from "axios";
  
  // 使用axios将当前的表单数据发送到后端
  const Post = (url: string, data: any) => {
    return axios.post(url, data);
  };
  
  const seccess = () => {
    ElNotification({
      title: "Success",
      message: "This is a success message",
      type: "success",
    });
  };
  
  const ruleFormRef = ref<FormInstance>();
  
  const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("Please input the age"));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error("Please input digits"));
      } else {
        if (value < 18) {
          callback(new Error("Age must be greater than 18"));
        } else {
          callback();
        }
      }
    }, 1000);
  };
  
  const validatePass = (rule: any, value: any, callback: any) => {
    console.log(ruleFormRef.value);
    if (value === "") {
      callback(new Error("请输入学号"));
    } else {
      if (ruleForm.password !== "") {
        if (!ruleFormRef.value) return;
        ruleFormRef.value.validateField("password", () => null);
      }
      callback();
    }
  };
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    }
    //   else if (value !== ruleForm.pass) {
    //     callback(new Error("Two inputs don't match!"));
    //   }
    else {
      callback();
    }
  };
  
  const ruleForm = reactive({
    school_id: "",
    password: "",
  });
  
  const rules = reactive({
    pass: [{ validator: validatePass, trigger: "blur" }],
    checkPass: [{ validator: validatePass2, trigger: "blur" }],
    age: [{ validator: checkAge, trigger: "blur" }],
  });
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log("submit!");
        console.log(ruleForm);
  
        axios.post("http://112.74.110.0:5555/login", ruleForm).then((res) => {
          console.log("!!!!!", res.data);
          // 如果res.status为200，说明登录成功,跳转到首页
          if (res.status === 200) {
            console.log("登录成功");
            seccess();
            // 跳转到首页
            window.location.href = "/getcrouse";
            //将res.data中的数据存储到sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(res.data));
          }
        });
      } else {
        console.log("error submit!");
        return false;
      }
    });
  };
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    width: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 100px;
    bottom: 0;
  }
  </style>
  