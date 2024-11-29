import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ProgramDetail, PdfViewer, Login, Register, Home, Programs } from './pages'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pdf" element={<PdfViewer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/program/:date/:hipodromo" element={<ProgramDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
