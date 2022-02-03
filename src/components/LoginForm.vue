<template>
  <el-form
      ref="ruleFormRef"
      :model="formData"
      label-position="top"
      class="loginBox"
      :rules="rules"
  >
    <el-form-item label="用户名" prop="phoneNumber">
      <el-input
          v-model="formData.phoneNumber"
          class="formInput"
          placeholder="请输入手机号"
          autocomplete="off"
      />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
          v-model="formData.password"
          class="formInput"
          type="password"
          show-password
          placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register(ruleFormRef)">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { DoLogin, DoRegister } from '@/request/login';

type FormInstance = InstanceType<typeof ElForm>

const formData = reactive({
  phoneNumber: '',
  password: ''
});

const rules = reactive({
  phoneNumber: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur',
  }, {
    max: 11,
    min: 11,
    message: '请输入长度为11位的手机号',
    trigger: 'blur',
  }, {
    pattern: new RegExp(/^1[0-9]{10}$/),
    message: '手机号仅为11位纯数字',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  }, {
    max: 16,
    min: 6,
    message: '密码长度是6-16位',
    trigger: 'blur',
  }]
});

const ruleFormRef = ref<FormInstance>()

const submitForm = (formEle: FormInstance) => {
  if(!formEle) {
    return;
  }
  formEle.validate((valid) => {
    if (valid) {
      DoLogin(formData.phoneNumber, formData.password).then((resp) => {
        console.log(resp);
        if (resp.code === 0) {
          ElMessage.success('登录成功');
          // TODO redirect to Main page
        } else {
          ElMessage.error('登录失败，请核对用户名密码');
        }
      }).catch((err: ErrorEvent) =>{
        console.log(err)
        ElMessage.error('服务器异常');
      })
    } else {
      return false
    }
  })
}

const register = (formEle: FormInstance) => {
  formEle.validate((valid) => {
    if (valid) {
      DoRegister(formData.phoneNumber, formData.password).then((resp) => {
        if (resp.code === 0) {
          ElMessage.success('注册成功，请登录');
        } else if(resp.code === 1001) {
          ElMessage.error('用户已存在，请登录');
        }
      }).catch((err: ErrorEvent) =>{
        console.log(err);
        ElMessage.success('注册失败');
      })
    } else {
      return false
    }
  })
}

</script>

<style scoped>

.loginBox {
  width: 350px;
  height: 500px;
  margin: 50px auto 0;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

/*.formInput{*/
/*  width: 80%;*/
/*}*/
</style>