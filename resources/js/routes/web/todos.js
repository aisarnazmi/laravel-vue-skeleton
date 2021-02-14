
import Todo from '@/js/pages/auth/todo/index'

const paymentRoutes = [

    { 
        path: '/todos', name:'todos', component: Todo, 
        meta: { 
            auth: {
                roles: [1],
                redirect: {name: 'login'}, forbiddenRedirect: '/403'
            }, 
            title: 'Todo List', moduleName: 'todos' 
        } 
    }

];
export default paymentRoutes;