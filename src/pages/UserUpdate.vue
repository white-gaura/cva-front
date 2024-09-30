<template>
    <div class="menuu">
        <Menu class="acv"></Menu>
    </div>
    <div id="page">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                        v-model="data.username"
                        name="name"
                        label="用户名"
                        :placeholder=userInfo.username
                />
                <van-field
                        v-model="data.tag"
                        rows="4"
                        autosize
                        label="用户标签"
                        type="textarea"
                        :placeholder=userInfo.tag
                />
                <van-field
                        v-model="data.avatarUrl"
                        rows="4"
                        autosize
                        label="用户头像url"
                        type="textarea"
                        :placeholder=userInfo.avatarUrl
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <div class="null"></div>
    </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import Menu from "../components/Menu.vue";
import useUserStore from "../pinia/userStore.ts";

const router = useRouter();
const userStore=useUserStore();
// 需要用户填写的表单数据
const data = ref({})
const userInfo=ref({})
onMounted(()=>{
    userInfo.value=userStore.userInfo
})
// 提交
const onSubmit = async () => {
    console.log(data.value)
    const postData = data.value
    console.log("到这里了")
    console.log(postData)
    // todo 前端参数校验
   const res= await userStore.updateUserInfo(postData)
    if (res.data.code === 0 && res.data.data){
        Toast.success('添加成功');
    } else {
        Toast.success('添加失败');
    }
}
</script>

<style scoped>
#page {
    box-shadow: 0 0 20px #d9d9d990;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 30vh auto;
    text-align: center;
    border-radius: 20px;
    width: 80vw;
}
.null{
    padding: 5px;
}
</style>
