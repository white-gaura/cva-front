<template>
    <div id="index">
        <Menu />

        <div id="container">
            <img v-for="(gif, index) in gifs" :key="index" :src="getImgSrc(gif.src)"
                 :style="{ animation: gif.animation }"
                 alt="">
        </div>
        <div class="text-and-button">
            <div class="overlay">
                <h1>Welcome to White (^_^) Crow~</h1>
                <h2>Blog , Chatting and Laughing</h2>
                <h3>The website for Every,Maybe is Dream . Enjoy yourself</h3>
                <h3>The kuru~ has been squished for</h3>
                <h1>TRY👇👇👇👇It</h1>
            </div>
            <div class="button">
                <button @click="moveGif()" >
                    <h2>kuru~ kuru~ </h2>
                </button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from "../components/Menu.vue";

interface Gif {
    src: string;
    animation: string;
    width: number;
    height: number;
}

const gifs = ref<Gif[]>([]);
const maxClicks = 100; // 点击上限为5次
let clickCount = 0; // 计数器

const moveGif = () => {
    if (clickCount < maxClicks) {
        const randomIndex = Math.random() < 0.5 ? 1 : 2; // 随机选择使用一张或两张图片
        const audio1 = new Audio('src/assets/audio/ja/kuru2.mp3'); // 替换为您的音频文件路径
        const audio2 = new Audio('src/assets/audio/ja/kuru1.mp3')
        if (randomIndex == 1) {
            audio1.play();
        } else {
            audio2.play();
        }
        const gif: Gif = {
            src: randomIndex === 1 ? "../assets/img/hertaa_github.gif" : "../assets/img/hertaa2.gif",
            width: randomIndex === 1 ? 400 : 500, // 第一张图片宽度200px，第二张图片宽度300px
            height: randomIndex === 1 ? 400 : 500,// 第一张图片高度200px，第二张图片高度300px
            animation: 'slideInOut 1.5s linear'

        };
        gifs.value.push(gif);
        clickCount++; // 每次点击增加计数器
    }
    else{
        alert('不要再点了啦,人家要坏掉了');
        clickCount=0;
        gifs.value = [];
    }
};

const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1); // 获取当前模块的基准路径

const getImgSrc = (src: string) => {
    return baseUrl + src;
};

</script>

<style>

#index {
    background-image: url(../assets/img/on.png);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100vw;
    z-index: -99999;
    background-repeat: no-repeat;
    background-size: cover;
}

#container {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 500px;
    z-index: 0;
    img {
        position: absolute;
        left: 100%; /* 图片开始时在容器右侧 */
    }
}



@keyframes slideInOut {
    from {
        left: 100%; /* 初始时图片在容器右侧 */
    }
    to {
        left: -50vw; /* 图片滑入到容器左侧的最终位置 */
    }
}

.text-and-button {
    z-index: 100;
    margin: -30vh 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.4);
    .overlay{
        color: #fff;
        h1{
            font-size: 45px;
            font-weight: bold;
            padding: 50px;
            font-family: Lexend, 黑体, sans-serif
        }
        h2{
            padding: 20px;
        }
        h3{

            padding: 10px;
        }
    }

    button {
        z-index: 999;
        border-radius: 5px;
        background-color: rgb(87, 79, 132);
        box-shadow: inset 0 0 0 1px #ffffff, 0 0 0 1px #000000;

        h2 {
            background-color: rgb(87, 79, 132);
            margin: 10px 20px;
            color: #fff;
        }
    }

}

button:hover {
    /* 改变按钮背景颜色为深蓝色 */
    background-color: rgb(87, 79, 132);
}

.button:active {
    /* 缩小按钮大小 */
    transform: scale(0.95);
}
</style>