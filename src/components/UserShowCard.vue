<script setup lang="ts">

import useUserStore from "../pinia/userStore.ts";
import {useRouter} from "vue-router";

const userStore = useUserStore();
console.log(userStore.userInfo.tag)
const router=useRouter();
const showUserInfo=()=>{
    router.push("/user/userInfo")
}
</script>
<template>
    <div id="userShowBox">
        <button id="avatar" @click="showUserInfo">
            <img :src= userStore.userInfo.avatarUrl alt="">
        </button>
        <div id="name">
            {{userStore.userInfo.username}}
        </div>
        <div>
            <div v-for="item in JSON.parse(userStore.userInfo.tag)" class="tag">{{ item }}</div>
        </div>
    </div>
</template>

<style>

.tag {
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#userShowBox {
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 20px #d9d9d990;
    border-style: none;
    border-radius: 20px;
    text-align: center;
    top: 20vh;
    width: 85%;
}
#avatar{
    border: none;
    /* 移除背景 */
    background: none;
    cursor: pointer;
    transition: transform 0.2s;
}

#avatar img {
    overflow-clip-margin: content-box;
    overflow: clip;
    border-radius: 50%;
    height: 140px;
    box-shadow: 0 0 20px #d9d9d99d;
}
#avatar:active img {
    /* 缩小按钮大小 */
    transform: scale(1.05);
}
#name {
    font-size: 16px;
    font-weight: bold;
    margin: 20px auto;
    font-family: Lexend, 黑体, sans-serif
}
</style>