<template>

    <div id="out">
        <Menu/>
        <div id="chat-out">
            <div id="talking" style="overflow-y:scroll">
                <div id="null"></div>
                <div class="get-message" v-for="(message, i) in messageList" :key="i">
                    <chat-bubble v-bind="message"></chat-bubble>
                </div>
            </div>
            <div id="send-message">
                <div class="input-container">
                    <input type="text" v-model="chatting" class="input-field" placeholder="请输入内容"
                           @keyup.enter="sending"/>
                </div>
                <div class="btn">
                    <button class="sending" @click="sending">发送消息</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import Menu from "../components/Menu.vue";
import {onUnmounted, ref, watch} from "vue";
import ChatBubble from "../components/ChatBubble.vue";
import {useWebSocket} from "../webSocket/webSocket.ts";
import {useRoute} from "vue-router";
import useUserStore from "../pinia/userStore.ts";

const messageList = ref<{}[]>([]);
const chatting = ref('');
const jsonChat = {
    id: '',
    toId: '',
    message: ''
};
const route = useRoute();
const userStore = useUserStore();
const toUserId = ref(route.query.id)
const userId = ref(userStore.userInfo.id)
console.log("userID"+userId.value);
console.log(userStore.userInfo)
watch(() => route.query.id,
    async newId => {
    if(newId!==''){
        console.log('监听到了:'+newId)
        toUserId.value=newId;
        userId.value = userStore.userInfo.id
        connect();
    }
    })
console.log(userId)
console.log(toUserId)
const {messages, inputMessage, connect, send, close} = useWebSocket('ws://127.0.0.1:8080/ws'); // WebSocket服务器地址


const sending = () => {
    jsonChat.message = chatting.value
    jsonChat.id = userId.value.toString();
    jsonChat.toId = toUserId.value.toString();
    console.log(jsonChat)
    inputMessage.value = jsonChat  // 将输入的消息赋值给响应式数据用于展示

    if (chatting.value !== '') {
        send()
        chatting.value = ''
    }
    onUnmounted(close);

};
watch(messages, (newMessage) => {
        console.log("监听到消息了")
        // const msg=newMessage.toString()
        messageList.value.push(newMessage)
        console.log(messageList.value)
    }
);

</script>

<style>
#out {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    z-index: -99999;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../assets/img/pic.jpg");
}
#null{
    margin: 10px;
}
#chat-out {
    margin: 10vh 20vw;
    width: 60%;
    height: 560px;
    background-color: rgba(225, 225, 225, 0.6);
    border-radius: 5px;
    border: 2px solid #ccc;


    #talking {
        margin: 20px auto;
        width: 90%;
        height: 460px;
        border: 2px solid #000;
        border-radius: 4px;
        outline: none; /* 去掉点击输入框时的默认边框 */
        font-size: 16px;
        resize: none;
        background-color: rgba(225, 225, 225, 0.3);

    }
}


#send-message {
    .input-container {
        margin-bottom: 25px;
        margin-left: 2.8vw;
        position: relative;
        width: 60%; /* 可根据需要调整宽度 */
        float: left;
    }

    .input-field {
        width: 100%;
        padding: 10px;
        border: 2px solid #000;
        border-radius: 4px;
        outline: none; /* 去掉点击输入框时的默认边框 */
        font-size: 16px;
        background-color: rgba(225, 225, 225, 0.3);
    }

    .input-field::placeholder {
        color: #000;
    }

    .btn {

        float: right;
        margin: auto;
        padding: 10px;
        border: 2px solid #000;
        border-radius: 4px;
        background-color: #92cafa;

        .sending {
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