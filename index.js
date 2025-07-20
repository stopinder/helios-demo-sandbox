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
