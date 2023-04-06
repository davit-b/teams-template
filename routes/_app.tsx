// routes/_app.tsx
import { Head } from "$fresh/runtime.ts"
import { AppProps } from "$fresh/src/server/types.ts"

export default function App({ Component }: AppProps) {
  return (
    <html data-theme="lemonade">
      <Head>
        <title>Deno Teams</title>
        <link rel="icon" type="image/png" href="../icons8-motherboard-32.png"></link>
        <link rel="stylesheet" href="../tailwind.css" />
      </Head>
      <body class="">
        <Component />
      </body>
    </html>
  )
}
