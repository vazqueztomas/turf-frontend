import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import pdf_palermo from '../../assets/example.pdf'
import './PdfViewer.css'

export const PdfViewer: React.FC = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    return (
        <div>
            <div style={{ width: '50%', height: '70vh', margin: '0 auto', overflow: 'auto' }}>
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdf_palermo} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                </div>
            </div>
        </div>
    )
}
