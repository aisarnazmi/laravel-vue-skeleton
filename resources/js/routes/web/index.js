import VueRouter from 'vue-router'
import { setPageTitle } from '@/js/helpers/pageTitle'

// Layout
import BaseLayout from '@/js/pages/layout'


//  Pages
// ** guest
import Login from '@/js/pages/Login'

// ** auth
import Dashboard from '@/js/pages/auth/dashboard'


// Routes 
import TodoRoute from '@/js/routes/web/todos'


// Routes
// ** for more information, kindy refer to https://github.com/websanova/vue-auth/blob/master/docs/Privileges.md
// ** auth: true <- can be access only if auth.check = true
// ** auth: false <- cannot be access is auth.check = true
// ** auth: null, title: '' <- no auth rule

const baseLayoutRoutes = [
    { 
        path: '/dashboard', name:'dashboard', component: Dashboard, 
        meta: { 
            auth: {
                roles: [1],
                redirect: {name: 'login'}, forbiddenRedirect: '/403'
            }, 
            title: 'Dashboard', moduleName: 'dashboard' 
        } 
    }
].concat(
    TodoRoute
)

const routes = [
    // public
    { path: '/', name: 'login', component: Login, meta: { auth: null, title: "Login"  } },
    { path: '/', name: 'base_layout', component: BaseLayout, children: baseLayoutRoutes }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes
})

// if url doesnot match any register routes
router.beforeEach((to, from, next) => {
    setPageTitle(to.meta.title)
    next()
});

export default router