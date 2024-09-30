import myAxios from "../plugins/myAxios.ts";

export const getBlogList = async (size: number, num: number) => {
    const res = await myAxios.post("/blog/recommend", {
        pageSize: size,
        pageNum: num, withCredentials: true
    })
    if (res.data.code === 0) {
        console.log(res);
        return res.data.data;

    } else {
        return null;
    }
};
export const getBlogContent = async (id: number) => {
    const res = await myAxios.get("/blog/content", {
        params: {
            blogId: id
        }, withCredentials: true
    })
    if (res.data.code === 0) {
        console.log(res);
        return res.data.data;

    } else {
        return null;
    }
};
export const blogLiking=async(id:number)=>{
    await myAxios.get("/blog/like", {
        params: {
            blogId: id
        }, withCredentials: true
    })
}