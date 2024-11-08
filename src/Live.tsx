import React from 'react'
import Navbar from './Navbar'

const Live: React.FC = () => {
    const videos = [
        {
            id: 1,
            title: 'Hipódromo de Palermo',
            url: 'https://www.youtube.com/embed/WezniCsAinc?si=4mQ8ZlhL8VdrC3ZZ',
        },
        {
            id: 2,
            title: 'Hipódromo de San Isidro',
            url: 'https://www.youtube.com/embed/lCBfz5A0nh8?si=33sHXf7A34ZfMMhY',
        },
        // Agrega más videos según sea necesario
    ]

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Hipódromos en Vivo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map(video => (
                        <div key={video.id} className="w-full aspect-w-16 aspect-h-9">
                            <p className=" py-1">{video.title}</p>

                            <iframe
                                className="w-full h-full"
                                src={video.url}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Live
