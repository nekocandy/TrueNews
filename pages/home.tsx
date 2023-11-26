import Head from "next/head"

export default function HomePage() {
    return <div>
        <div className='h-screen  w-full flex items-center justify-center' >

            <Head>
                <title>TrueNews</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    </div>
}