import {createRouter, createWebHistory} from 'vue-router';
import Blog from "../pages/BlogList.vue";
import Chat from "../pages/Chat.vue";
import Index from "../pages/Index.vue";
import BlogContent from "../pages/BlogContent.vue";
import UserList from "../pages/UserList.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import TeamList from "../pages/TeamList.vue";
import Test from "../pages/test.vue";
import useUserStore from "../pinia/userStore.ts";
import {storeToRefs} from "pinia";
import TeamInsert from "../pages/TeamInsert.vue";
import UserInfo from "../pages/UserInfo.vue";
import BlogInsert from "../pages/BlogInsert.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import TeamListByMyJoin from "../pages/TeamListByMyJoin.vue";
import TeamListByMyCreate from "../pages/TeamListByMyCreate.vue";

const routes = [
    {path: '/', title: "主页", component: Index},
    {path: "/user/login", title: "登录", component: Login},
    {path: "/user/register", title: "注册", component: Register},
    {path: '/blog', title: "博客", component: Blog},
    {path: '/chat', title: "聊天", component: Chat},
    {path: "/blog/content", title: "博客正文", component: BlogContent},
    {path: "/userList", title: "用户列表", component: UserList},
    {path: "/teamList", title: "队伍列表", component: TeamList},
    // {path: "/test", component: Test},
    {path: "/team/insert", title: "队伍添加", component: TeamInsert},
    {path: "/user/userInfo", title: "用户信息", component: UserInfo},
    {path: "/blog/insert", title: "博客添加", component: BlogInsert},
    {path: "/user/update", title: "用户修改", component: UserUpdate},
    {path: "/team/join", title: "队伍已添加", component: TeamListByMyJoin},
    {path: "/team/create", title: "队伍自己", component: TeamListByMyCreate},

];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),

});


router.afterEach(() => {

    window.scrollTo(0, 0);
});

router.beforeEach(
    async (to) => {
        const userStore = useUserStore()
        const {isLogin} = storeToRefs(userStore)
        const routers = ['/user/login', '/user/register', '/', '/blog','/blog/content','/test','/chat','/useList']
        // 判断 状态管理库有没有登陆 user 信息
        if (!routers.includes(to.path)) {
            console.log(to.path)
            if (!isLogin.value) {
                // 没有就发请求获取当前登陆用户的信息
                await userStore.getCurrentUser()
            }
        }
    })

export default router;
