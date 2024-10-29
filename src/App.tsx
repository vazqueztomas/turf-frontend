import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import Programs from './Programs'
import ProgramDetail from './ProgramDetail'
import Login from './Login/Login'
import Register from './Register/Register'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/program/:date/:hipodromo" element={<ProgramDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
