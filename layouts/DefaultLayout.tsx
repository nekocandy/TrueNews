import Navbar from "../components/Navbar"

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="bg-gray-300 text-black font-mono flex-col gap-4">
        <Navbar />
        <main className="">{children}</main>
      </div>
    </>
  )
}