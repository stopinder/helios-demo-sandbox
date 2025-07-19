import { createRouter, createWebHistory } from 'vue-router'
import TherapistView from '../views/helios/TherapistView.vue'
import MapView from '../views/helios/MapView.vue'

const routes = [
    { path: '/', component: TherapistView },
    {
        path: '/client',
        name: 'ClientView',
        component: () => import('../views/helios/ClientView.vue')
    },
    {
        path: '/map/ifs',
        name: 'MapView',
        component: MapView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
