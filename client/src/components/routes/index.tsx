import Main from '../main'
import Todo from '../todo'
import NotFound from '../notfound'
export const routes = [
    {
        id: 1,
        path: '/',
        element: <Main />
    },
    {
        id: 2,
        path: '/todos',
        element: <Todo />
    },
    {
        id: 3,
        path: '*',
        element: <NotFound />
    }
]