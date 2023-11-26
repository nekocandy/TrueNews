import Head from 'next/head'
import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { loggedIn, addr } = useCurrentUser()


  return (
    <div className='h-screen  w-full flex items-center justify-center' >

      <Head>
        <title>Marketplace</title>
        <meta name="description" content="FCL Next Scaffold for the Flow Blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-4xl font-bold uppercase'>Decentralized News Platform using FLOW~</h1>


        <button
          onClick={
            loggedIn ? () => router.push("/home") : fcl.authenticate
          }
          className={
            clsx(
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
              {
                'bg-green-500 hover:bg-green-700': loggedIn,
                'bg-blue-500 hover:bg-blue-700': !loggedIn,
              }
            )
          }
        >
          {
            !loggedIn ? 'Login' : 'Continue as ' + addr
          } {"->"}
        </button>
      </div>

    </div>
  )
}
