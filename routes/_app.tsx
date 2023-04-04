// routes/_app.tsx

import { asset, Head } from "$fresh/runtime.ts"
import { AppProps } from "$fresh/src/server/types.ts"

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>Fresh</title>
        {/* <link rel="stylesheet" href={asset("style.css")} /> */}
        {/* <link rel="icon" type="image/x-icon" href="../favicon.ico"></link> */}
        <link rel="icon" type="image/png" href="../icons8-motherboard-32.png"></link>
        {
          /*
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
        /> */
        }
      </Head>
      <body class="">
        <Component />
      </body>
    </html>
  )
}
