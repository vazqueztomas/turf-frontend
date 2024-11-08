import React from 'react'
import Navbar from './Navbar'

const Promotion: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Promocioná</h2>
                <p className="text-center text-lg">Coming Soon...</p>
            </div>
        </div>
    )
}

export default Promotion
