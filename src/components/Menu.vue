<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {showConfirmDialog} from "vant";
import useUserStore from "../pinia/userStore.ts";
import axios from "axios";
import MyAxios from "../plugins/myAxios.ts";


const isMenuHidden = ref(false);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
let lastScrollY = 0;
const isTitleColorChanged = ref(false);
const handleScroll = () => {
    const scrollY = window.scrollY;

    // 调整这里的阈值，可以根据需要设置不同的值
    const scrollThreshold = 20;

    if (scrollY > lastScrollY + scrollThreshold) {
        // 向下滚动，隐藏菜单栏
        isMenuHidden.value = true;
    } else if (scrollY < lastScrollY - scrollThreshold) {
        // 向上滚动，显示菜单栏
        isMenuHidden.value = false;
    }
    isTitleColorChanged.value = scrollY > 500;
    lastScrollY = scrollY;
};
const userStore = useUserStore();
const isLogout = () => {
    showConfirmDialog({
        title: '提示',
        message: '确定要注销吗？',
    }).then(async () => {
        // 用户点击确定时发送注销请求
        await userStore.logoutUser()
    }).catch(() => {
        // 用户点击取消，不执行任何操作
    });
};
const startChat=async()=>{
    await MyAxios.get("/chat/start")
}
</script>

<template>
    <div>
        <div class="title" :class="{ 'hidden': isMenuHidden ,'color-changed': isTitleColorChanged}">

            <ul class="nav">
                <li id="name">
                    White (^_^) Crow~
                </li>
                <li class=normal>
                    <router-link to="/">主页</router-link>
                </li>
                <li class=normal>
                    <router-link to="/blog">博客</router-link>
                </li>
                <li class=normal>
                    <router-link to="/chat" @click="startChat">聊天</router-link>
                </li>
                <li class=normal>
                    <router-link to="/teamList" style=" ">队伍</router-link>
                </li>
                <li class=normal>
                    <router-link to="/userList" @click="startChat">一群人</router-link>
                </li>
                <li class=n-normal>
                    <router-link to="/user/login">登录</router-link>
                </li>
                <li class=n-normal>
                    <router-link to="/user/register">注册</router-link>
                </li>
                <li class=n-normal>
                    <div class="logout" @click="isLogout">注销</div>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.acv .title {
    background-color: #92cafa;
}

.title {
    background-color: rgba(160, 160, 160, 0.3);
    width: 100vw;
    transition: top 0.3s;
    position: fixed;
    top: 0;
    z-index: 2;
}

.color-changed {
    background-color: #92cafa;

    .normal a {
        color: #555555;

    }

    .nav #name {
        color: #555555;

    }
}

.hidden {
    top: -80px;
}

.nav {
    list-style: none;
    overflow: hidden;

    #name {
        color: #ffffff;
        float: left;
        margin: 20px 40px;
    }
}


.nav a {
    color: #ffffff;
    text-decoration: none;
}


.nav .n-normal {
    float: right;
    margin-right: 4%;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;

    li {

        color: #ffffff;
        line-height: 50px;
    }
}

.nav .normal {
    margin-left: 4%;
    float: left;
    margin-top: 20px;
    font-weight: bold;

    li {
        color: #ffffff;
        line-height: 50px;
    }
}

#name {
    margin-left: 5%;
}

.logout {
    color: white;
    cursor: pointer;
}
</style>