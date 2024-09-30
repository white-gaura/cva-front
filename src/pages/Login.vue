<template>
    <div class="out">
        <Menu class="acv"></Menu>
        <div class="form">
            <div class="form-title">注册</div>
            <van-form @submit="onSubmit">
                <van-cell-group inset class="custom">
                    <van-field
                            class="custom-input"
                            v-model="userAccount"
                            name="userAccount"
                            label="账号"
                            placeholder="请输入账号"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                            class="custom-input"
                            v-model="userPassword"
                            type="password"
                            name="userPassword"
                            label="密码"
                            placeholder="请输入密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" size="small">
                        提交
                    </van-button>
                    <br>
                    <router-link to="/user/register">
                        <van-button round block type="primary" size="small">
                            注册
                        </van-button>
                    </router-link>
                </div>
                <div class="null"></div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import Menu from "../components/Menu.vue";
import userStore from "../pinia/userStore.ts";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const useStore = userStore()

const onSubmit = async () => {
    await useStore.loginUser(userAccount.value,userPassword.value)
};
</script>

<style scoped>
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
}

.form {
    box-shadow: 0 0 20px #d9d9d990;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 30vh auto;
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