import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
type Props = { children: React.ReactNode }

export default function ProtectedRoute({ children }: Props) {
    // @ts-expect-error this is necessary
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}
