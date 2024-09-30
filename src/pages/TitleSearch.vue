<template>
    <div class="out">

        <div class="out-form">
            <form action="/">
                <van-search
                        v-model="searchText"
                        show-action
                        placeholder="请输入要搜索的标签"
                        @search="onSearch"
                        @cancel="onCancel"
                />
            </form>
            <van-divider content-position="left">已选标签</van-divider>
            <div v-if="activeIds.length === 0">请选择标签</div>
            <van-row gutter="16" style="padding: 0 16px">
                <van-col v-for="tag in activeIds">
                    <van-tag closeable size="small" type="primary" @close="doClose({tag : tag})">
                        {{ tag }}
                    </van-tag>
                </van-col>
            </van-row>
            <van-divider content-position="left">选择标签</van-divider>
            <van-tree-select
                    v-model:active-id="activeIds"
                    v-model:main-active-index="activeIndex"
                    :items="tagList"
            />
            <div style="padding: 12px">
                <van-button block type="primary" @click="doSearchResult">搜索</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()

const searchText = ref('');

const originTagList = [
    {
        text: '标签',
        children: [
            {text: 'c++', id: 'c++'},
            {text: 'java', id: 'java'},
            {text: 'python', id: 'python'},
            {text: 'you', id: 'you'},
            {text: 'emo', id: 'emo'},
            {text: '生活', id: '生活'},
            {text: '工作', id: '工作'},
            {text: '忙碌', id: '忙碌'},

        ],
    },
]

// 标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val: any) => {
    tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
    });

}
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
};

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const doClose = ({tag}: { tag: any }) =>
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })

/**
 * 执行搜索
 */
const doSearchResult = () => {
    router.push({
        path: '/userList',
        query: {
            tag: activeIds.value
        }
    })
}
</script>

<style scoped>
.out {
    .out-form {
        margin: 20px 20vw;
        padding: 30px 5vw;
        background-color: rgba(225, 225, 225, 0.6);
        border-radius: 5px;
        border: 2px solid #ccc;
    }
}
</style>
