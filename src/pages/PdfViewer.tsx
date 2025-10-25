import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import pdf_palermo from '../assets/example.pdf'

export const PdfViewer: React.FC = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    return (
        <div className="min-h-full">
            <div className="h-full w-1/2 mx-auto my-0 overflow-auto">
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdf_palermo} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                </div>
            </div>
        </div>
    )
}
