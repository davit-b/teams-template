// routes/_app.tsx

import { asset, Head } from "$fresh/runtime.ts"
import { AppProps } from "$fresh/src/server/types.ts"

export default function App({ Component }: AppProps) {
  return (
    <html data-theme="night">
      <Head>
        <title>Deno Teams</title>
        <link rel="icon" type="image/png" href="../icons8-motherboard-32.png"></link>
        {/* Tailwind Stylesheet */}
        {/* <link rel="stylesheet" href="/styles.css" /> */}
        <link rel="stylesheet" href="../tailwind.css" />
        {
          /* <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        /> */
        }
      </Head>
      <body class="">
        <Component />
      </body>
    </html>
  )
}
