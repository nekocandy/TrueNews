import Head from "next/head"
import { useState, useEffect } from "react"
import * as fcl from '@onflow/fcl'
import GetArticles from "../cadence/scripts/GetArticles.cdc"
import clsx from "clsx"
import Markdown from 'react-markdown'

export default function HomePage() {
    const [articles, setArticles] = useState<{ id: string, date: string, title: string, body: string, author: string }[]>([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState("")
    const [modalTitle, setModalTitle] = useState("")
    const [modalAuthor, setModalAuthor] = useState("")
    const [modalDate, setModalDate] = useState("")
    const [modalBody, setModalBody] = useState("")
    const [modalId, setModalId] = useState("")


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


        <div id="fullScreenModal" className={
            clsx(
                "fixed inset-0 z-50 h-screen overflow-hidden flex bg-white bg-opacity-98",
                "py-12 px-12 flex-col gap-8",
                isModalOpen ? "visible" : "invisible"
            )
        }>
            <button className="absolute top-0 right-0 px-12 py-12 text-2xl uppercase font-bold" onClick={() => setModalOpen(false)}>
                Close
            </button>
            <h1 className="text-3xl font-bold underline">
                {modalTitle}
            </h1>
            <h3 className="-mt-4">
                By: {modalAuthor} | On: {modalDate} | ID: {modalId}
            </h3>
            <Markdown>
                {modalContent}
            </Markdown>
        </div>


        <div className='h-screen  w-full flex py-4 px-8 flex-col gap-8' >
            <div className="flex items-center gap-8">
                <h1 className="text-2xl uppercase font-bold underline">Read Articles from Directly from Reporters!</h1>
                <button onClick={getArticlesFromFlowChain} className="bg-green-500 px-12 py-1 w-fit text-white rounded-md font-bold self-end">
                    Refresh
                </button>
            </div>

            {
                articles.length === 0 && <p>No Articles Found</p>
            }
            <div className="grid grid-cols-3 gap-8">
                {articles.map((article, i) => {
                    return <div onClick={() => {
                        setModalOpen(true)
                        setModalContent(article.body)
                        setModalTitle(article.title)
                        setModalAuthor(article.author)
                        setModalDate(article.date)
                        setModalBody(article.body)
                        setModalId(article.id)
                    }} className="cursor-pointer bg-gray-200 rounded-md p-6 flex flex-col gap-6" key={i}>
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <div className="flex items-center gap-4 justify-between">
                            <span className="font-bold">By: <span className="font-light">{article.author}</span></span>

                            <span className="font-bold">On: <span className="font-light">{article.date}</span></span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}