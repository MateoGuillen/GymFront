import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout' //importamos un componente

export default function FirstPost() {
  return (
    <Layout>
      <h1>Sector A</h1>
      <h2>
      <Head>
        <title>Miners</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Link href="http://10.10.40.11/" passHref={true}>
          <a>Go to Mineradora X</a>
      </Link>
      <br></br>
      <Link href="/">
          <a>Atras</a>
      </Link>
      </h2>
    </Layout>
      
    
  )
}