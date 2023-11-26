import Head from "next/head";
import { useState } from "react";
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';


export default function NewArticlePage() {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");

    return <div>
        <Head>
            <title>TrueNews</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='h-screen  w-full flex py-4 px-8 flex-col gap-8' >
            <h1 className="text-2xl uppercase font-bold underline">Write Article</h1>

            <input
                className="border-2 border-gray-300 rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" placeholder="Title" />


            <MdEditor modelValue={value} onChange={setValue} />

            <button className="bg-green-500 px-12 py-4 w-fit text-white rounded-md font-bold self-end">
                Publish on Flow!
            </button>
        </div>
    </div>
}