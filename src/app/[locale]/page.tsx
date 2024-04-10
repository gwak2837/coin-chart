import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      <Link className="text-center text-lg" href="/coin/KRW-BTC">
        KRW-BTC
      </Link>
    </main>
  )
}
