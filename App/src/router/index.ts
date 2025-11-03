import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (to, _from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        }

        // TODO workaround for MathJax recalc
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ el: decodeURIComponent(to.hash) });
                }, 1000);
            });
        }
        return { left: 0, top: 0 };
    },
});
