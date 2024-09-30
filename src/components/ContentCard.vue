<template>
    <div id="cc-out">

    </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps<{
    title: string,//题目
    createTime: Date,//日期
    blogDescription: string,//标题简介
    content: string//正文
    likedNum: string,//喜欢人数
    viewsNum: string,//观看人数
}>()
const blogDateTime = ref<{}>();
const message = ref('点一下👆👆???');
const likes = ref(0);

onMounted(() => {
    const date = new Date(props.createTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    blogDateTime.value = year + "/" + month + "/" + day
})

const toggleLike = () => {
    console.log(likes.value)
    if (likes.value >= 10) {
        message.value = '不要再点啦!!!!';
    } else if (likes.value % 2 == 0) {
        message.value = '点赞成功';
        likes.value++;
    } else {
        message.value = '点一下👆👆???'
        likes.value++;
    }
};
</script>

<style>


.card-out {
    padding: 0 18vw;
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
        padding: 80px;
        background-color: rgb(0, 0, 0, 0);
        background-image: url("../assets/img/likeing.png");
        background-size: cover; /* 可以根据需要调整图片填充方式 */
        color: #fff; /* 按钮文字颜色 */
        text-decoration: none;
        border: none;
        cursor: pointer;
        outline: none;
    }

    .like:active {
        background-color: rgb(0, 0, 0, 0);
        background-image: url("../assets/img/likee.png");
        padding: 80px;
    }

    #try {
        margin-left: 30px;
        margin-top: -30px;
    }
}

</style>