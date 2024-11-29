import { Footer, Header } from '../components'

import { ReactNode } from 'react'

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main className="h-screen p-4">{children}</main>
            <Footer />
        </>
    )
}
