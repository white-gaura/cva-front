<template>
    <div class="out">
        <Menu class="acv"></Menu>

        <div class="form">
            <div class="form-title">注册</div>
            <van-form @submit="onSubmit">
                <van-cell-group inset class="custom">
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.userAccount"
                            label="账号"
                            placeholder="账号长度在2-6之间"
                            :rules="[{ validator: validatorMessageFour }]"
                    />

                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.userPassword"
                            type="password"
                            label="密码"
                            placeholder="密码长度在8-16之间"
                            :rules="[{ validator: validatorMessageTwo }]"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.checkPassword"
                            type="password"
                            label="确认密码"
                            placeholder="请保持输入一致"
                            :rules="[{ validator: validatorMessageThree }]"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.username"
                            label="用户昵称"
                            placeholder="用户昵称"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.phone"
                            label="手机号"
                            placeholder="请输入正确的手机号"
                            :rules="[{ validator: validatorMessageOne }]"
                    />

                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.email"
                            label="邮箱"
                            placeholder="请输入合法邮箱"
                            :rules="[{ validator: validatorMessageFive }]"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.gender"
                            label="性别"
                            placeholder="请输入合法性别"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.avatarUrl"
                            label="头像的url"
                            placeholder="请输入头像的url"
                    />
                    <van-field
                            class="custom-input"
                            clearable
                            v-model="addUserData.tag"
                            label="tag"
                            placeholder="请输入tag"
                    />
                </van-cell-group>
                <div style="margin: 16px">
                    <van-button round block type="primary" native-type="submit">
                        确认注册
                    </van-button>
                </div>
                <div class="null"></div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from "../components/Menu.vue";
import myAxios from "../plugins/myAxios";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";

//表单校验
const special = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/; //匹配特殊字符的正则表达式
const validatorMessageOne = (val: string) => {
    if (val.trim() == "") {
        return "手机号不能为空";
    }
    if (special.test(val)) {
        return "手机号不能包含特殊字符";
    }
    var check = /^1[3-9]\d{9}$/;
    if (!check.test(val)) {
        return "手机号格式错误";
    }
};
const validatorMessageTwo = (val: string) => {
    if (val.trim() == "") {
        return "密码不能为空";
    }
    if (val.length < 8 || val.length > 16) {
        return "密码长度必须在8-16位之间";
    }
    // if (!val.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
    //   return "密码必须只包含数字和字母";
    // }
    if (special.test(val)) {
        return "密码不能包含特殊字符";
    }
};
const validatorMessageThree = (val: string) => {
    if (val != addUserData.value.userPassword) {
        return "两次输入的密码不一致";
    }
};
const validatorMessageFour = (val: string) => {
    if (val.trim() == "") {
        return "账号不能为空";
    }
    if (val.length < 1 || val.length > 6) {
        return "账号长度必须在1-6位之间";
    }
    if (special.test(val)) {
        return "账号不能包含特殊字符";
    }
};
const validatorMessageFive = (val: string) => {
    if (val.trim() == "") {
        return "邮箱不能为空";
    }
    const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTest.test(val)) {
        return "邮箱格式错误";
    }
};


const initFormData = {
    phone: "",
    userPassword: "",
    checkPassword: "",
    userAccount: "",
    email: "",
    gender: "",
    avatarUrl: "",
    tag: "",
    username: "",
};
const addUserData = ref({...initFormData}); //用户注册表单
const router = useRouter();
const onSubmit = async () => {
    const postData = {
        ...addUserData.value,
    };

    const res = await myAxios.post("/user/register", postData);
    if (res.data.code === 0 && res.data) {
        Toast.success("注册成功!");
        //发起登录请求，自动登录
        const login = await myAxios.post("/user/login", {});
        if (login.data.code === 50001 && login.data) {
            // window.location.href = "/";
            await router.push({
                path: "/",
                replace: true,
            });
        } else {
            await router.push({
                path: "/user/login",
            });
        }
    } else {
        Toast.fail("注册失败!");
    }
};
</script>

<style>
.out {
    background-image: url("../assets/img/pic.jpg");
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    z-index: -99999;
    background-repeat: no-repeat;
    background-size: cover;

    .custom {
        background-color: rgba(255, 255, 255, 0.7)
    }

    .custom-input {
        background-color: rgba(255, 255, 255, 0)
    }
}

.form {
    box-shadow: 0 0 20px #d9d9d990;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 15vh auto;
    text-align: center;
    border-radius: 20px;

    .form-title {
        padding: 20px;
        font-size: 30px;
        font-weight: bold;
    }

    .null {
        padding: 5px;
    }
}



</style>