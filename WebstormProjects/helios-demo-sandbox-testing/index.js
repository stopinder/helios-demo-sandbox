import { createRouter, createWebHistory } from 'vue-router'

import ClientView from '../views/ClientView.vue'

const routes = [
    { path: '/', redirect: '/clients' },
    { path: '/clients', name: 'Clients', component: ClientView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

