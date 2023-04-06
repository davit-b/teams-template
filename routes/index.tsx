import { Head } from "$fresh/runtime.ts"

export default function Home() {
  return (
    <>
      <Head>
        <title>Github Teams Clone</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/crosshatch">Go to example team 'Crosshatch'</a>
      </div>
    </>
  )
}
