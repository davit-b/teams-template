import { Head } from "$fresh/runtime.ts"
import { useMemo } from "https://esm.sh/preact@10.11.0/hooks"
import LinkTo from "../components/LinkTo.tsx"

export default function Home() {
  const keyList = useMemo(getKeys, [localStorage])

  return (
    <>
      <Head>
        <title>Github Teams Clone</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/crosshatch">Go to example team 'Crosshatch'</a>
        <br>-</br>
        <ul class="text-blue-500">
          {keyList.map((key) => <LinkTo key={key} data={key} />)}
        </ul>
      </div>
    </>
  )
}

function getKeys() {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i) ?? "")
  }
  console.log(keys)
  return keys
}
