import { Head } from "$fresh/runtime.ts"
import Footer from "../components/Footer.tsx"

export default function Home() {
  // For the purpose of demo, the list of pre-made teams will be hardcoded.
  const keyList = ["sasquatch", "deno", "fresh"]

  return (
    <>
      <div class="flex h-full w-full justify-center items-center mb-20">
        <div class="p-4 mx-auto flex max-w-screen-md flex-col prose bg-accent w-1/2 mt-4">
          <h2 class="mb-1">
            Select a team
          </h2>
          <ul>
            {keyList.map((key) => (
              <li class="link link-primary">
                <a href={`/${key}`}>/{key}</a>
              </li>
            ))}
          </ul>
          <h3>To create a new team,</h3>
          <p>
            Simply type in the URL bar `/&#60;teamName&#62;`. <br /> For example,{" "}
            <a href="/avengers">/avengers</a>{" "}
            will direct you to a newly created team called Avengers .
          </p>
        </div>
      </div>
    </>
  )
}
