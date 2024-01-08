
import HomeComponent from '../components/Home';

export const metadata = {
  title: 'JustPostIt.dev',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <HomeComponent />
      </div>
    </main>
  )
}
