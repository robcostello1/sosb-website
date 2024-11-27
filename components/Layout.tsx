import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* <Head>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-STXJ7TCB1N" />
                <Script dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-STXJ7TCB1N');
                `,
                }} />
            </Head> */}
            {children}
        </>
    )
}