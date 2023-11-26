import Head from "next/head"
import { useState, useEffect } from "react"
import * as fcl from '@onflow/fcl'
import GetArticles from "../cadence/scripts/GetArticles.cdc"

export default function HomePage() {
    const [articles, setArticles] = useState<{ id: string, title: string, body: string, author: string }[]>([])


    const getArticlesFromFlowChain = async () => {
        const res = await fcl.query({
            cadence: GetArticles
        })

        console.log({ read: res })

        const articles = res.map((article) => {
            const data = article.split("||||")
            return {
                id: data[0],
                title: data[1],
                body: data[2],
                author: data[3]
            }
        })

        setArticles(articles)
    }

    useEffect(() => {
        getArticlesFromFlowChain()
    }, [])

    return <div>
        <Head>
            <title>TrueNews</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-screen  w-full flex py-4 px-8' >
            <h1 className="text-2xl uppercase font-bold underline">Read Articles from Directly from Reporters!</h1>

            <div>
                <h2 className="text-xl font-bold">Articles</h2>
                <ul>
                    {articles.map((article, i) => {
                        return <li key={i}>
                            <h3 className="text-lg font-bold">{article.title}</h3>
                            <p className="text-sm">{article.body}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}