import { ChevronRight, Trophy, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import logo from '../assets/logo.jpg'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
            <header className="container mx-auto py-8">
                <div className="flex items-center justify-center space-x-4">
                    <img
                        src={logo}
                        alt="Logo de Turf Premium"
                        width={80}
                        height={80}
                        className="rounded-full bg-white p-1 shadow-md"
                    />
                    <h1 className="text-4xl font-bold text-center text-gray-900">Turf Premium</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 flex-grow">
                <div className="flex flex-col items-center justify-center space-y-16">
                    <div className="text-center space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-semibold text-gray-900 leading-tight">
                            Eleva tu juego con <br className="hidden sm:inline" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">inteligencia artificial</span>
                        </h2>

                        <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
                            Somos pioneros en la aplicación de inteligencia artificial para maximizar tus probabilidades de éxito en las carreras de caballos.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button label="Inicia sesion" onClick={() => navigate("/login")}>
                        </Button>
                        <Button label="Ver Programas" onClick={() => navigate("/programs")}>

                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                        <Card className="bg-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-3 text-gray-900">
                                    <TrendingUp className="h-6 w-6 text-gray-700" />
                                    <span>Análisis Avanzado</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600">
                                Nuestros algoritmos de IA procesan miles de datos para generar predicciones de alta precisión.
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-3 text-gray-900">
                                    <Trophy className="h-6 w-6 text-gray-700" />
                                    <span>Resultados Probados</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600">
                                Más del 70% de nuestros usuarios han incrementado significativamente sus ganancias.
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-3 text-gray-900">
                                    <Users className="h-6 w-6 text-gray-700" />
                                    <span>Comunidad Selecta</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600">
                                Únete a nuestra exclusiva red de expertos y entusiastas para compartir estrategias ganadoras.
                            </CardContent>
                        </Card>
                    </div>

                    <a href="/about" className="flex items-center text-lg">
                        Descubre nuestra trayectoria
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </main>

            <footer className="container mx-auto py-8 text-center text-gray-600 border-t border-gray-300">
                <p>&copy; 2025 Turf Premium. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}


