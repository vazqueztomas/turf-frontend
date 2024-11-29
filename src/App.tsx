import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import routes from './routes'

export default function App() {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, page }) => {
                    const Page = page
                    return <Route key={path} path={path} element={<Page />} />
                })}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
