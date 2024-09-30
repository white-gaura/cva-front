<script setup lang="ts">
import Menu from "../components/Menu.vue";
import {useRoute} from "vue-router";
import {blogLiking, getBlogContent} from "../service/blog.api.ts";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import userStore from "../pinia/userStore.ts";

const content = ref<{
    blogDescription,
    content,
    createTime,
    id,
    images,
    likedNum: number,
    title,
    updateTime,
    viewsNum: number,
}>({
    blogDescription: null,
    content: null,
    createTime: null,
    id: null,
    images: null,
    likedNum: 0,
    title: null,
    updateTime: null,
    viewsNum: 0,
})
const route = useRoute()
const blogDateTime = ref<{}>();
const loading = ref(true);
const isLike = ref(false)
const getContent = async (blogId) => {
    content.value = await getBlogContent(blogId);
    console.log('发送获取博客请求成功')
    console.log(content.value.likedNum);
}
onMounted(() => {
    getContent(route.query.id).then(() => {
        const date = new Date(content.value.createTime);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        blogDateTime.value = year + "/" + month + "/" + day
        loading.value = false;
        liking.value=content.value.likedNum;
    })
    delayedTask(route.query.id);
})
watch(
    () => route.query.id,
    async (newId) => {
        console.log("监听到了")
        console.log(newId)
        if(newId!==''){
            likes.value=0;
            liking.value = 0;
            loading.value = true;
            await getContent(newId).then(() => {
                    const date = new Date(content.value.createTime);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const year = date.getFullYear();
                    blogDateTime.value = year + "/" + month + "/" + day
                    loading.value = false;
                    message.value = '点一下👆👆???'  ;
                    liking.value=content.value.likedNum;
                }
            );
            delayedTask(newId);
        }

    },
)
const delayedTask = (blogId) => {
    setInterval(async () => {
        if (isLike.value) {
            await blogLiking(blogId);
            console.log('点赞成功')
            isLike.value = false
        }
    }, 10000)
}

const useUserStore=userStore();
const message = ref('点一下👆👆???');
const likes = ref(0);
const liking = ref(0);
const toggleLike = () => {
    console.log(likes.value)
    console.log(useUserStore.isLogin)
    if (!useUserStore.isLogin) {
        message.value = '登录后点赞';
    } else if (likes.value >= 10) {
        message.value = '不要再点啦!!!!';
    } else if (likes.value % 2 == 0) {
        message.value = '点赞成功';
        liking.value++;
        likes.value++;
        isLike.value = true
    } else {
        message.value = '点一下👆👆???'
        liking.value--;
        likes.value++;
        isLike.value = true
    }
};

</script>
<template>
    <Menu class="acv"></Menu>
    <div class="card-out">
        <van-skeleton title avatar :row=10 :loading="loading">
            <div id="blog-content">
                <h1>{{ content.title }}</h1>
                <h4>{{ blogDateTime }}</h4>
                <h3>{{ content.blogDescription }}</h3>
                <h3>{{ content.content }}</h3>
            </div>
            <div id="another">
                <div>
                    <div id="blog-like-num">点赞人数：{{ liking}}</div>
                </div>
                <div>
                    <div id="blog-view-num">观看人数：{{ content.viewsNum }}</div>
                </div>
                <div>
                    <button @click="toggleLike" class="like">
                    </button>
                    <div id="try">{{ message }}</div>
                </div>
            </div>
        </van-skeleton>
    </div>
</template>
<style>
.card-out {
    padding: 0 18vw 10vh 18vw;
}

#blog-content {
    margin: 100px auto 0;
    width: 50vw;
    border-radius: 30px;
    padding: 5vw;
    background-color: rgba(255, 255, 255);
    border: 2px solid #ccc;
    white-space: pre-line;

    h4 {
        padding: 5vh 0;
    }

    h3 {
        padding: 10px 0;
    }
}

#another {

    margin-top: 0;

    #blog-like-num {
        padding: 10px;
        float: right;
    }

    #blog-view-num {
        padding: 10px;
        float: right;
    }

    .like {
        padding: 60px 80px;
        background-color: rgb(0, 0, 0, 0);
        background-image: url("../assets/img/tail_icon_channel.png");
        background-size: cover; /* 可以根据需要调整图片填充方式 */
        text-decoration: none;
        border: none;
        cursor: pointer;
        outline: none;
    }

    .like:active {
        background-color: rgb(0, 0, 0, 0);
        background-image: url("../assets/img/tt.webp");
        padding: 80px;
    }

    #try {
        margin-left: 30px;
        margin-top: 0px;
    }
}

</style>