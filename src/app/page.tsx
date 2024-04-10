import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      <Link href="/coin/KRW-BTC" className="text-center text-lg">
        KRW-BTC
      </Link>
    </main>
  )
}
