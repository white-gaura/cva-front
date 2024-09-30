<template>
    <div class="menuu">
        <Menu class="acv"></Menu>
    </div>
    <div id="userInfo-out">
        <van-cell title="当前用户" >{{username}}</van-cell>
        <van-cell title="修改信息" is-link to="/user/update"/>
        <van-cell title="我创建的队伍" is-link to="/team/create"/>
        <van-cell title="我加入的队伍" is-link to="/team/join"/>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import Menu from "../components/Menu.vue";
import useUserStore from "../pinia/userStore.ts";

const username = ref();
// const router = useRouter();
const userStore = useUserStore();
username.value=userStore.userInfo.username

console.log(username.value)
</script>

<style scoped>
#userInfo-out{
        box-shadow: 0 0 20px #d9d9d990;
        background-color: rgba(255, 255, 255, 0.5);
        margin: 30vh auto;
        border-radius: 20px;
        width: 80vw;
}
</style>
