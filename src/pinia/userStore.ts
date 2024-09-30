import {defineStore} from 'pinia'
import {getUser, loginUser, logout} from '../service/user.api.ts';
import {showFailToast} from "vant";
import router from "../routers/router.ts";
import myAxios from "../plugins/myAxios.ts"; // 假设 getUser 返回的数据类型为 UserResponse


const useUserStore = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            "id":'',
            "avatarUrl": "../src/assets/img/head.jpg",
            "tag": "[\"java\",\"c++\",\"python\"]",
            "username": "游客"
        },
        isLogin: false,
        isLoading:false
    }),
    actions: {
        async getCurrentUser() {
            await getUser().then(async res => {
                    if (res !== null) {
                        this.userInfo = res
                        this.isLogin = true
                        console.log("已经登录")
                    } else {
                        console.log("没有登录")
                        showFailToast('没有登录');
                        await router.push("/user/login")
                    }
                }
            )
        },
        async updateUserInfo(data:any) {
           const res= await myAxios.post("/user/update",data)
            await getUser().then(async res => {
                    if (res !== null) {
                        this.userInfo = res
                        this.isLogin = true
                        console.log("已经登录")
                    } else {
                        console.log("没有登录")
                        showFailToast('没有登录');
                        await router.push("/user/login")
                    }
                }
            )
            return res
        },
        async logoutUser() {
            const res = await logout()
            console.log(res)
            if (res === 'ok') {
                this.userInfo = {
                    "id":'',
                    "avatarUrl": "../src/assets/img/head.jpg",
                    "tag": "[\"java\",\"c++\",\"python\"]",
                    "username": "游客"
                }
                this.isLogin = false
                showFailToast("注销成功")
            }
        },
        async loginUser(username: string, userPassword: string) {
            loginUser(username, userPassword).then((res)=>{
                console.log(res+"+++resssss")
                if (res !== false) {
                    console.log(res.id)
                    this.userInfo = res
                    this.isLogin = true
                    showFailToast("登录成功")
                    console.log("到这了")
                    console.log(this.userInfo.id)
                    router.back();
                } else {
                    this.userInfo = {
                        "id":'',
                        "avatarUrl": "../src/assets/img/head.jpg",
                        "tag": "[\"游客\",\"游客\",\"游客\"]",
                        "username": "游客"
                    }
                    this.isLogin = false
                    showFailToast("登录失败请重试")
                }
            })

        },
        setIsLoading(load:boolean){
            this.isLoading=load
        }
    }
})

export default useUserStore;