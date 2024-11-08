import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import Programs from './Programs'
import ProgramDetail from './ProgramDetail'
import Live from './Live'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register/Register'
import Login from './Login/Login'
import Promotion from './Promotion'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/programs"
                        element={
                            <ProtectedRoute>
                                <Programs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/program/:date/:hipodromo"
                        element={
                            <ProtectedRoute>
                                <ProgramDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/live"
                        element={
                            <ProtectedRoute>
                                <Live />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/promotion"
                        element={
                            <ProtectedRoute>
                                <Promotion />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
