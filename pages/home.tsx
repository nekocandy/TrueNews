import Head from "next/head"
import { useState, useEffect } from "react"
import * as fcl from '@onflow/fcl'
import GetArticles from "../cadence/scripts/GetArticles.cdc"

export default function HomePage() {
    const [articles, setArticles] = useState<{ id: string, date: string, title: string, body: string, author: string }[]>([])


    const getArticlesFromFlowChain = async () => {
        const res = await fcl.query({
            cadence: GetArticles
        })

        console.log({ read: res })

        const articles = res.map((article) => {
            const data = article.split("||/-/||")
            return {
                id: data[0],
                date: data[1],
                title: data[2],
                body: data[3],
                author: data[4]
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

        <div className='h-screen  w-full flex py-4 px-8 flex-col gap-8' >
            <h1 className="text-2xl uppercase font-bold underline">Read Articles from Directly from Reporters!</h1>

            {
                articles.length === 0 && <p>No Articles Found</p>
            }
            <div className="grid grid-cols-3 gap-8">
                {articles.map((article, i) => {
                    return <li key={i}>
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <p className="text-sm">{article.body}</p>
                    </li>
                })}
            </div>
        </div>
    </div>
}