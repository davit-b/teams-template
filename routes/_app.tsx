import { Head } from "$fresh/runtime.ts"
import { AppProps } from "$fresh/src/server/types.ts"

export default function App({ Component }: AppProps) {
  return (
    <html data-theme="lemonade">
      <Head>
        <title>Demo Teams</title>
        <link rel="icon" type="image/png" href="../favicon.png"></link>
        <link rel="stylesheet" href="../tailwind.css" />
      </Head>
      <body class="">
        <Component />
      </body>
      <footer class="font-serif flex justify-center items-center h-1/6">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
      </footer>
    </html>
  )
}
