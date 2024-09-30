<script setup lang="ts">

import UserShowCard from '../components/UserShowCard.vue'
import Menu from "../components/Menu.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import UserCard from "../components/UserCard.vue";
import MyAxios from "../plugins/myAxios.ts";
import {UserType} from "../models/user";


const userList = ref<{}[]>([]);
const pageSize = ref<{}>();
const pageNum = ref<{}>();
const isRequesting = ref(true);

pageSize.value = 10;
pageNum.value = 1;


const getUserList = async () => {
    if (isRequesting.value) {
        const res = await MyAxios.get("/user/recommend", {
            params: {
                pageSize: pageSize.value,
                pageNum: pageNum.value,
            }, withCredentials: true
        });
        const users = res.data.data.records
        if (users.length !== 0) {
            users.forEach((user: UserType) => {
                userList.value.push(user)
            })
        } else {
            console.log('没有更多数据了')
            isRequesting.value = false
        }
    }


}

const isCardHidden = ref(false);
onMounted(() => {
    const windowWidth = window.innerWidth;
    isCardHidden.value = windowWidth < 1200;
    window.addEventListener('scroll', handleScroll);
    getUserList()

})
onBeforeUnmount(() => {
    // 在组件销毁前，移除窗口大小变化的事件监听器
    window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    const scrollObserver = document.querySelector('.scroll-observer');
    if (scrollObserver) {
        const rect = scrollObserver.getBoundingClientRect();
        console.log(rect.bottom)
        const isAtBottom = rect.bottom < window.innerHeight;

        if (isAtBottom) {
            pageNum.value++
            getUserList();
        }
    }
};
const isMatch = async () => {
    const res = await MyAxios.get("/user/match", {
        params: {
            num: 10
        }, withCredentials: true
    });
    const users = res.data.data;
    userList.value = [];
    users.forEach((user: UserType) => {
        userList.value.push(user)
    })
}


</script>

<template>
    <div id="main">
        <div id="menu">
            <Menu/>
        </div>
        <div id="home-head">
            <div id="home-background"></div>
        </div>
        <div id="home">
            <div id="home-post">
                <div id="cardList">
                    <div class="user" v-for="(user, index) in userList" :key="index">
                        <user-card v-bind="user"></user-card>
                    </div>
                    <div class="scroll-observer" style="height: 10px;background: red"></div>
                </div>
                <div id="userShow" :class="{'card-hidden':isCardHidden}">
                    <user-show-card></user-show-card>
                    <div class="btn">
                        <button @click="isMatch" class="match">心动模式</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#menu {
    width: 100%;
}

#home-background {
    display: flex;
    flex-direction: column;
    background-position: center;
    background-image: url(../assets/img/123.png);
    height: 100vh;
    width: 100%;
    z-index: -99999;
    background-repeat: no-repeat;
    background-size: cover;
}

#home {
    margin-right: 11%;
    margin-left: 11%;
}

#home-post {
    display: flex;
    place-items: start;
    position: relative;
    padding: 20px;
    top: 0;
}

#cardList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Optional: Adjust alignment */
    width: 80%;

    .user {
        width: calc(50% - 10px); /* Adjust width as needed */
        margin-bottom: 20px; /* Optional: Add margin between cards */
    }

    @media screen and (max-width: 1000px) {
        .user {
            width: 100%; /* 一列显示一个卡片 */
        }
    }
}

.card-hidden {
    display: none;
}

#userShow {
    width: 25%;
    position: sticky;
    top: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%; /* 确保容器充满整个视口 */
    .btn {
        float: right;
        margin:10px 0 0 0;
        padding: 10px;
        border: 2px solid #000;
        border-radius: 4px;
        background-color: #92cafa;

        .match {
            border: none; /* 去掉点击输入框时的默认边框 */
            background-color: rgba(225, 225, 225, 0);
            font-weight: bold;
            color: #000;
            cursor: pointer;
        }
    }
    .btn:active {
        /* 缩小按钮大小 */
        transform: scale(0.95);
    }
}
</style>