<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";

const props = defineProps<{
    id: number;
    title: string;
    blogDescription: string;
    createTime: Date;
    updateTime: Date;
    likedNum: string;
    viewsNum: string;
}>()
const dateTime=ref<{}>();
const date = new Date(props.createTime);
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
dateTime.value=year+"/"+month+"/"+day
const router = useRouter();
const test = () => {
    router.push({
        path: '/blog/content',
        query: {
            id: props.id
        }
    });
    console.log(router);
}

</script>
<template>
    <div id="card-out">
        <div id="card-in">
            <div id="read-more">
                <h2 id="card-title">{{ title }}</h2>
            </div>
            <div id="card-date">
                {{ dateTime }}
            </div>
            <div id="card-content">
                <p>{{ blogDescription }}</p>
            </div>
        </div>
        <div id="read-more-box">
            <button @click="test">阅读全文</button>
        </div>
    </div>


</template>

<style>

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

#card-in {
    white-space: pre-line;
    padding: 20px;
    position: relative;
    background-color: #ffffff;
}

a {
    text-decoration: none;

}

a:hover {
    background-color: transparent;
}

#card-title {
    margin: 10px 0 10px 0;
    position: relative;
    z-index: 1; /* 将标题放在图层的顶部 */
    font-size: 27px;
    font-weight: bold;
    color: #66afef;;
}

#card-date {
    text-align: center;
    color: #000000;
}

#card-content {
    position: relative;
    text-align: left;
    padding-top: 20px; /* 适当调整主题与标题之间的间距 */

}

.card-content p {
    white-space: pre-line;
    line-height: 3; /* 设置行间距为 1.5 倍文字的高度 */
}


#read-more-box {
    color: #FFFFFF;
    position: absolute;
    bottom: -5px; /* 距离底部的距离 */
    right: -5px; /* 距离右侧的距离 */
    background: linear-gradient(120deg, #9ebbf7 0%, #ffbbf4 100%); /* 阅读全文盒子的背景颜色 */
    padding: 10px; /* 阅读全文盒子的内边距 */
    border-radius: 20px 0 20px 0; /* 左上和右下角为弧形 */

    button {
        background-color: rgba(255, 255, 255, 0.0);
        border: none;
        color: #fff;
        cursor: pointer;


    }

}

#read-more {
    text-decoration: none;
    color: #FFFFFF;

}

</style>