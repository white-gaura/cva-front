<script setup lang="ts">

import {useRouter} from "vue-router";

const props = defineProps<{
    id: number;
    username: string;
    userAccount: string;
    gender: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tag: string;
    avatarUrl: string;
}>()
const router = useRouter()
const sendId = () => {
    router.push({
        path: '/chat',
        query: {id: props.id}
    })

}


</script>
<template>
    <div id="card-out">
        <div id="userShowBox">
            <div id="avatar">
                <img src="../assets/img/head.jpg" alt="">
            </div>
            <div id="name">
                {{ username }}
            </div>
            <div>
                <div v-for="item in JSON.parse(tag)" class="tag">{{ item }}</div>
            </div>
        </div>
        <div id="read-more-box">
            <button @click=sendId class="read-more">点我一下</button>
        </div>
    </div>
</template>
<style>


#avatar img {
    overflow-clip-margin: content-box;
    overflow: clip;
    border-radius: 50%;
    height: 140px;
    box-shadow: 0 0 20px #d9d9d99d;
}

#card-out {
    padding: 20px;
    margin: 0 0 30px 0;
    max-width: 80%;
    background-color: #ffffff;
    box-shadow: 0 0 20px #d9d9d990;
    border-style: none;
    border-radius: 20px;
    position: relative;
    text-align: center;
    transition: box-shadow 0.25s, transform 0.25s;
    overflow-wrap: break-word;
}

#card-out:hover {
    transform: translate(-5px, -5px);
    box-shadow: 0 0 20px #d9d9d9;
    background-color: #ffffff;
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


#avatar img {
    overflow-clip-margin: content-box;
    overflow: clip;
    border-radius: 50%;
    height: 140px;
    box-shadow: 0 0 20px #d9d9d99d;
}

#name {
    font-size: 16px;
    font-weight: bold;
    margin: 20px auto;
    font-family: Lexend, 黑体, sans-serif
}

.card-content p {
    white-space: pre-line;
    line-height: 3; /* 设置行间距为 1.5 倍文字的高度 */
}


#read-more-box {
    position: absolute;
    bottom: -5px; /* 距离底部的距离 */
    right: -5px; /* 距离右侧的距离 */
    background: linear-gradient(120deg, #9ebbf7 0%, #ffbbf4 100%); /* 阅读全文盒子的背景颜色 */
    padding: 10px; /* 阅读全文盒子的内边距 */
    border-radius: 20px 0 20px 0; /* 左上和右下角为弧形 */

    .read-more {
        font-weight: bold;
        font-size: 15px;
    }
}


</style>