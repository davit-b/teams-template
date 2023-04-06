import { Head } from "$fresh/runtime.ts"

export default function Home() {
  // For the purpose of demo, the list of pre-made teams will be hardcoded.
  const keyList = ["crosshatch", "deno", "the avengers"]

  return (
    <>
      <Head>
        <title>Github Teams Clone</title>
      </Head>
      <div class="flex h-full w-full justify-center items-center">
        <div class="p-4 mx-auto flex max-w-screen-md flex-col prose bg-primary-content w-1/2 mt-4">
          <h2 class="mb-1">
            Select a team
          </h2>
          <ul class="">
            {keyList.map((key) => (
              <li class="link link-primary">
                <a href={`/${key}`}>/{key}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
