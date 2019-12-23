import Vue from 'vue';
import Router from 'vue-router';

import TaskList from "./components/TaskList";
import EmptyPage from "./components/EmptyPage";
import Page404 from "./components/Page404";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: TaskList,
        },
        {
            path: '/tasklist',
            name: 'tasklist',
            component: TaskList,
        },
        {
            path: '/empty',
            name: 'emptypage',
            component: EmptyPage,
        },
        {
            path: '*',
            name: '404',
            component: Page404,
        },
        ]
})