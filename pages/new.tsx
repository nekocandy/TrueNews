import Head from "next/head";
import { useState } from "react";
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { nanoid } from "nanoid";
import useCurrentUser from "../hooks/useCurrentUser";

import * as fcl from '@onflow/fcl'
import AddArticle from "../cadence/transactions/AddArticle.cdc"
import { useRouter } from "next/router";

export default function NewArticlePage() {
    const router = useRouter()
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const { addr } = useCurrentUser();


    const publishArticle = async () => {
        const JOINING_STRING = "||/-/||"
        const articleData = `${nanoid()}${JOINING_STRING}${new Date().toISOString()}${JOINING_STRING}${title}${JOINING_STRING}${value}${JOINING_STRING}${addr}`

        const transactionId = await fcl.mutate({
            cadence: AddArticle,
            args: (arg, t) => [arg(articleData, t.String)],
        })

        router.push("/home")
        alert("Article Published!, Transaction ID: " + transactionId)

    }

    return <div>
        <Head>
            <title>TrueNews</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-screen  w-full flex py-4 px-8 flex-col gap-8' >
            <h1 className="text-2xl uppercase font-bold underline">Write News</h1>

            <input
                className="border-2 border-gray-300 rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" placeholder="Title" />


            <MdEditor modelValue={value} onChange={setValue} />

            <button onClick={publishArticle} className="bg-green-500 px-12 py-4 w-fit text-white rounded-md font-bold self-end">
                Publish on Flow!
            </button>
        </div>
    </div>
}