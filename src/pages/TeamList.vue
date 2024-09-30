<script setup lang="ts">

import UserShowCard from '../components/UserShowCard.vue'
import Menu from "../components/Menu.vue";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import TeamCard from "../components/TeamCard.vue";
import MyAxios from "../plugins/myAxios.ts";
import {TeamType} from "../models/team";
import {useRouter} from "vue-router";
import useUserStore from "../pinia/userStore.ts";


const TeamList=ref<{}[]>([])
const router= useRouter();
const isMatch = async () => {
    const res = await MyAxios.get("/team/list", {
        params: {
            num: 10
        }, withCredentials: true
    });
    const teams = res.data.data;
    teams.forEach((team: TeamType) => {
        TeamList.value.push(team)
    })}

const isCardHidden = ref(false);
onMounted(() => {
    const windowWidth = window.innerWidth;
    isCardHidden.value = windowWidth < 1200;
    window.addEventListener('resize', handleResize);
    isMatch()
})
onBeforeUnmount(() => {
    // 在组件销毁前，移除窗口大小变化的事件监听器
    window.removeEventListener('resize', handleResize);
});
const handleResize = () => {
    const windowWidth = window.innerWidth;
    isCardHidden.value = windowWidth < 1000;
}

const add=()=>{
    router.push("/team/insert")
}

const userStore=useUserStore()
watch(
    ()=>userStore.setIsLoading,
    (newLoad,oldLoad)=>{
        console.log("监听到了加载")
        if(newLoad){
            console.log("监听到了加载")
            isMatch()
            userStore.setIsLoading(false)
        }
    },{deep:true})
</script>

<template>
    <div id="main">
        <div id="menu">
            <Menu :color="'white'"/>
        </div>
        <div id="home-head">
            <div id="home-background"></div>
        </div>
        <div id="home">
            <div id="home-post">
                <div id="cardList">
                    <div class="team" v-for="(team, index) in TeamList" :key="index">
                        <team-card v-bind="team"></team-card>
                    </div>
                </div>
                <div id="userShow" :class="{'card-hidden':isCardHidden}">
                    <user-show-card>
                    </user-show-card>
                    <div class="btn">
                        <button @click="add" class="add">添加队伍</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

body {
    width: 100%;
    background-color: #fff0ff;
}

#menu {
    width: 100%;
}


#home-background {
    display: flex;
    flex-direction: column;
    background-position: center;
    background-image: url(../assets/img/pic.jpg);
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

    .team {
        width: 50%; /* Adjust width as needed */
        margin-bottom: 20px; /* Optional: Add margin between cards */
    }

    @media screen and (max-width: 1000px) {
        .team {
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

        .add {
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