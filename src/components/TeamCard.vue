<script setup lang="ts">

import {UserType} from "../models/user";

const props = defineProps<{
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string,
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
    userList?: UserType[];
    userId: string;
    hasJoin: string;
}>()
import {ref, watch} from 'vue';
import MyAxios from "../plugins/myAxios.ts";
import {showConfirmDialog} from "vant";
import useUserStore from "../pinia/userStore.ts";

const isModalVisible = ref(false);
const verificationCode = ref('');
const addNum=ref();

addNum.value=props.hasJoinNum+"/"+props.maxNum+" 已加入人数"
const userStore=useUserStore()

const showVerificationModal=()=> {
    console.log("开始了")
    console.log(props.hasJoin)
    if(props.hasJoin.toString()==="false"){
        if (props.status === 2) {
            isModalVisible.value = true;
        }
        if (props.status === 0) {
            showConfirmDialog({
                title: '是否加入该队伍',
                message:'求求了加入吧,群主愿意变成🐱孃被米娜桑jue一绝'

            })
                .then(async () => {
                    const params = {
                        teamId: props.id,
                        withCredentials: true
                    }
                    const res = await MyAxios.post("/team/join", params);
                    if (res.data.code!==40000) {
                        userStore.setIsLoading(true);
                        alert('欢迎加入!!！');
                        addNum.value=props.hasJoinNum+1+"/"+props.maxNum+" 已加入人数"
                        closeModal();
                    } else {
                        alert(res.data.description);
                    }
                })
                .catch(() => {
                    // on cancel
                });
        }
    }else{
        alert("已经加入过了,不能加入");
    }

}
const submitVerification=async () => {
    console.log(verificationCode.value)
    // 这里可以添加验证验证码的逻辑
    const params= {
        teamId:props.id,
        password:verificationCode.value,
        withCredentials: true
    }
    const res = await MyAxios.post("/team/join", params);
    console.log(props.password)
    console.log(res)
    if (res.data.code!==40000) {
        alert('欢迎加入!!！');
        addNum.value=props.hasJoinNum+1+"/"+props.maxNum+" 已加入人数"
        userStore.setIsLoading(true);
        closeModal();
    } else {
        alert(res.data.description);
    }
}
const quit=async () => {
    showConfirmDialog({
        title: '是否加入该队伍',
        message:'确定要退出吗'
    })
        .then(async () => {
            const params= {
                teamId:props.id,
                withCredentials: true
            }
            const res = await MyAxios.post("/team/quit", params);
            if (res.data.code!==40000) {
                alert("退出成功");
                userStore.setIsLoading(true);
                addNum.value=props.hasJoinNum-1+"/"+props.maxNum+" 已加入人数"
                closeModal();
            } else {
                alert(res.data.description);
            }
        })
        .catch(() => {
            // on cancel
        });
}
const closeModal=()=> {
    isModalVisible.value = false;
}

</script>
<template>
    <div id="card-out">
        <div id="TeamShowBox">
            <div id="avatar">
                <img src="../assets/img/head.jpg" alt="">
            </div>
            <div id="name">
                {{ name }}
            </div>
            <div>
                {{ description }}
            </div>
            <div id="addNum">
                {{ addNum }}
            </div>
        </div>
        <div id="read-more-box" v-if=!hasJoin>
            <button @click="showVerificationModal" class="btn-open-modal">加入我吧</button>
        </div>
        <div id="quit-box" v-if=hasJoin>
            <button @click="quit" class="btn-open-modal">我要退出</button>
        </div>
        <transition name="bubble">
            <div v-if="isModalVisible" class="modal">
                <div class="modal-content">
                    <h4 class="modal-title">请输入验证码</h4>
                    <input type="text" v-model.trim="verificationCode" placeholder="请输入验证码"/>
                    <button @click="submitVerification" class="btn-submit">提交</button>
                    <button @click="closeModal" class="btn-close">关闭</button>
                </div>
            </div>
        </transition>
    </div>
</template>


<style >

@font-face {
    font-family: Lexend;
    src: url(../assets/Lexend/Lexend-VariableFont_wght.ttf);
}

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

#TeamShowBox {
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

    .btn-open-modal {
        background-color: rgba(225, 225, 225, 0);
        border: none; /* 取消按钮边框 */
        color: #FFFFFF;
    }
}
#quit-box {
    position: absolute;
    bottom: -5px; /* 距离底部的距离 */
    left: -5px; /* 距离右侧的距离 */
    background: linear-gradient(120deg, #9ebbf7 0%, #ffbbf4 100%); /* 阅读全文盒子的背景颜色 */
    padding: 10px; /* 阅读全文盒子的内边距 */
    border-radius:  0 20px 0 20px; /* 左上和右下角为弧形 */

    .btn-open-modal {
        background-color: rgba(225, 225, 225, 0);
        border: none; /* 取消按钮边框 */
        color: #FFFFFF;
    }
}

#addNum {
    margin-top: 30px;
    text-align: left;
    font-size: 12px;
    color: rgba(120, 120, 120);
    font-weight: 500;
}

</style>