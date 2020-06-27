import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home';
import Blog from "../views/blog/Blog";
import Diary from "../views/diary/Diary";
import About from "../views/about/About";
import Links from "../views/links/Links";
import Message from "../views/message/Message";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta:{index:0}
    },
    {
        path: '/blog/:id',
        name:"blog",
        component: Blog,
        meta:{index:1}
    },
    {
        path: "/message",
        name:"message",
        component: Message,
        meta:{index:2}
    },
    {
        path: "/diary",
        name:"diary",
        component: Diary,
        meta:{index:3}
    },
    {
        path: "/links",
        name:"links",
        component: Links,
        meta:{index:4}
    },
    {
        path: "/about",
        name:"about",
        component: About,
        meta:{index:5}
    }
];

const router = new VueRouter({
    routes
});

export default router
