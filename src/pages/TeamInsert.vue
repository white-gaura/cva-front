<template>
    <div class="menuu">
        <Menu class="acv"></Menu>
    </div>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="addTeamData.name"
                    name="name"
                    label="队伍名"
                    placeholder="请输入队伍名"
                    :rules="[{ required: true, message: '请输入队伍名' }]"
                />
                <van-field
                    v-model="addTeamData.description"
                    rows="4"
                    autosize
                    label="队伍描述"
                    type="textarea"
                    placeholder="请输入队伍描述"
                />
                <van-field
                    is-link
                    readonly
                    name="datePicker"
                    label="过期时间"
                    :placeholder="Time  ??'点击选择过期时间'"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-date-picker
                        v-model="Time"
                        @confirm="showPicker = false"
                        type="datetime"
                        title="请选择过期时间"
                        :min-date="minDate"
                    />
                </van-popup>
                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
                    </template>
                </van-field>
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-if="Number(addTeamData.status) === 2"
                    v-model="addTeamData.password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="请输入队伍密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
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
// 展示日期选择器
const showPicker = ref(false);
const Time=ref();
const minDate = new Date();

// 需要用户填写的表单数据
const addTeamData = ref({})

// 提交
const onSubmit = async () => {
    addTeamData.value.expireTime=new Date(Time.value)
    const postData = {
        ...addTeamData.value,
    }
    console.log(postData)
//    todo 前端参数校验
    const res = await myAxios.post("/team/add", postData);
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
