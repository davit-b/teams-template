import { Head } from "$fresh/runtime.ts"
import { useMemo } from "https://esm.sh/preact@10.11.0/hooks"
import LinkTo from "../components/LinkTo.tsx"

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
