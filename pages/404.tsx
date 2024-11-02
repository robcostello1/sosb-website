import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Custom404() {
    return <div style={{
        height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
        <h1>404 - Page Not Found</h1>
        <Link href="/"><><FaArrowLeft /> Return to home</></Link>
    </div>
}