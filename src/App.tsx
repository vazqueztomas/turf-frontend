import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import Programs from './Programs'
import ProgramDetail from './ProgramDetail'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import PdfComponent from './PdfViewer/PdfViewer'
import Horses from './Horses'
import ProtectedRoute from './ProtectedRoute'
import Live from './Live'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pdf" element={<PdfComponent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/program/:id" element={<ProgramDetail />} />
                <Route path="/horses" element={<Horses />} /> <Route path="/live" element={<Live />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
