<template>
    <div class="bubble-out">
        <img src="../assets/img/head.jpg" :class="{ 'left': sender === 'me', 'right': sender === 'you' }" class="avatar" alt="">
        <div :class="{ 'sender': sender === 'me', 'receiver': sender === 'you','system': sender==='sys' }"
             class="message">
            {{ message }}
        </div>
        <div :class="{'sys':sender==='sys' ,'null':sender!=='sys'}"></div>
    </div>

</template>

<script setup lang="ts">

const props=defineProps<{
    // toId: string;
    // id:string;
    message: string
}>();
const sender='you'
console.log("气泡消息"+props.message)

</script>

<style scoped>
.message {
    display: inline-block;
    max-width: 80%;
    padding: 8px 12px;
    border-radius: 10px;
    align-items: center;
}

.left {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: 8px;
    float: left;
}

.right {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: 8px;
    float: right;
}

.sender {
    background-color: #e1ffc7;
    align-self: flex-end;
    float: left;
}

.receiver {
    background-color: #c7d9ff;
    align-self: flex-start;
    float: right;
}

.bubble-out {
    text-align: center;
}

.system {
    color: #555;
    padding-bottom: 30px;
}

.null {
    padding: 30px;
}
</style>
