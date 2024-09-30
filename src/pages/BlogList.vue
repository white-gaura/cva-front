<script setup lang="ts">
import BlogCard from '../components/BlogCard.vue'
import UserShowCard from '../components/UserShowCard.vue'
import Menu from "../components/Menu.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getBlogList} from "../service/blog.api.ts";
import {BlogType} from "../models/blog";
import {useRouter} from "vue-router";


const blogList = ref<{}[]>([]);
const pageSize = ref<number>(10);
const pageNum = ref<number>(1);
const isRequesting = ref(true);
const addBlogList = async () => {
    if(isRequesting.value){
        const blogs = await getBlogList(pageSize.value, pageNum.value)
        console.log(blogs.length===0)
        if(blogs.length!==0){
            blogs.forEach((blog: BlogType) => {
                blogList.value.push(blog)
            })
        }else{
            console.log('没有更多了')
            isRequesting.value=false
        }
    }else{
        console.log("不能请求了")
    }

}


const isCardHidden = ref(false);
onMounted(() => {
    const windowWidth = window.innerWidth;
    isCardHidden.value = windowWidth < 1200;
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    addBlogList()
})
onBeforeUnmount(() => {
    // 在组件销毁前，移除窗口大小变化的事件监听器
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
});

const handleResize = () => {
    const windowWidth = window.innerWidth;
    isCardHidden.value = windowWidth < 1000;
};

const handleScroll = () => {
    const scrollObserver = document.querySelector('.scroll-observer');
    if (scrollObserver) {
        const rect = scrollObserver.getBoundingClientRect();
        console.log(rect.bottom)
        if (rect.bottom <window.innerHeight) {
            pageNum.value++
            addBlogList();
        }
    }
};
const router=useRouter();
const add=()=>{
    router.push("/blog/insert")
}
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
                    <div class="blog" v-for="(blog, index) in blogList" :key="index">
                        <BlogCard v-bind="blog"></BlogCard>
                    </div>
                  <div class="scroll-observer" style="height: 10px;width: 10px; background: red"></div>
                </div>
                <div id="userShow" :class="{'card-hidden':isCardHidden}">
                    <user-show-card></user-show-card>
                    <div class="btn">
                        <button @click="add" class="add">添加博客</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#menu {
    width: 100%;

}

#home-background {
    display: flex;
    flex-direction: column;
    background-position: center;
    background-image: url(../assets/img/123.png);
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

    #cardList {
        width: 100%;
        padding-top: 20px;

        .blog {
            width: 100%;
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