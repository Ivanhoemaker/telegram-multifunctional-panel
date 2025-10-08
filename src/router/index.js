import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import { useLayoutShowStore } from "../stores/layoutshow";
// 懒加载示例（代码分割）
const Home = () => import("../view/Mainscreen.vue");
const Mainscreen = () => import("../view/Mainscreen.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: Layout,
        children: [
            {
                path: "/",
                name: "Mainscreen",
                component: Mainscreen,
                meta: {
                    keepAlive: true,
                },
            },
            {
                path: "/user",
                name: "User",
                component: () => import("../view/user/index.vue"),
                meta: {
                    keepAlive: false,
                },
            },
            {
                path: "/controlPanel",
                name: "controlPanel",
                component: () => import("../view/compress/index.vue"),
                meta: {
                    keepAlive: false,
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 支持回退时恢复位置
        if (savedPosition) return savedPosition;
        // 支持锚点
        if (to.hash) return { el: to.hash, behavior: "smooth" };
        // 默认滚到顶部
        return { top: 0 };
    },
});

// 全局前置守卫：示例做简单 auth 检查
router.beforeEach((to, from, next) => {
    const store = useLayoutShowStore();
    store.show = to.name;
    next();
});

// 全局后置钩子：可用于埋点、关闭 loading 等
router.afterEach((to, from) => {
    console.log("导航完成：", to.fullPath);
});

export default router;
