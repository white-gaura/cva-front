<template>
    <div class="menuu">
        <Menu class="acv"></Menu>
    </div>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="addTeamData.title"
                    name="name"
                    label="博客名"
                    placeholder="请输入博客名"
                    :rules="[{ required: true, message: '请输入博客名' }]"
                />
                <van-field
                    v-model="addTeamData.blogDescription"
                    rows="4"
                    autosize
                    label="博客简介"
                    type="textarea"
                    placeholder="请输入博客简介"
                />
                <van-field
                    v-model="addTeamData.content"
                    rows="4"
                    autosize
                    label="博客正文"
                    type="textarea"
                    placeholder="请输入博客正文"
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
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import Menu from "../components/Menu.vue";

const router = useRouter();



// 需要用户填写的表单数据
const addTeamData = ref({})

// 提交
const onSubmit = async () => {
    console.log(addTeamData.value)
    const postData = addTeamData.value
    console.log("到这里了")
    console.log(postData)
    // todo 前端参数校验
    const res = await myAxios.post("/blog/add", postData);
    if (res.data.code === 0 && res.data.data){
        Toast.success('添加成功');
    } else {
        Toast.success('添加失败');
    }
}
</script>

<style scoped>
#teamAddPage {
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
