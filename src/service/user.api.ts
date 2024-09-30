import myAxios from "../plugins/myAxios"
import MyAxios from "../plugins/myAxios";

export const getUser = async () => {
    const res = await myAxios.get("/user/current");
    if (res.data.code === 0) {
        // console.log(res);
        return res.data.data;
    } else {
        return null;
    }
};
export const loginUser = async (username: string, password: string) => {
    const res = await myAxios.post('/user/login', {
        userAccount: username,
        userPassword: password,
    }, {withCredentials: true});
    console.log(res.data.data)
    if (res.data.data !== null) {
        return res.data.data;
    } else {
        return false
    }
};
export const logout = async () => {
    const res = await myAxios.post("/user/logout");
    console.log(res.data.code)
    if (res.data.code === 0) {
        console.log(res);
        return 'ok';
    } else {
        return null;
    }
}
export const pageUserList = async (pageNum:string, pageSize:string) => {
    const res = await MyAxios.get("/user/recommend", {
        params: {
            pageSize: pageSize,
            pageNum: pageNum,
        }, withCredentials: true
    });
    return res;
};