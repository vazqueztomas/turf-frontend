import { Home, PdfViewer, Register, Login, Programs, ProgramDetail } from '../pages'

const routes = [
    {
        path: '/',
        page: Home,
    },
    {
        path: '/pdf',
        page: PdfViewer,
    },
    {
        path: '/login',
        page: Login,
    },
    {
        path: '/register',
        page: Register,
    },
    {
        path: '/programs',
        page: Programs,
    },
    {
        path: '/program/:date/:hipodromo',
        page: ProgramDetail,
    },
]

export default routes
