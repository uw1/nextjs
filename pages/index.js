import Head from 'next/head'
import getGithub from '../data/getGithub'
import markdown from '../ui/markdown'

let text = `
# string_decoder
seto
[[nose]]
[Routing: Introduction | Next.js](https://nextjs.org/docs/routing/introduction)
## test setoest tsteost
- eost
- [[wat the fuck]] steo
`
export default function Home() {
  return (
    <div className=''>
      <Head></Head>
      <main>
        {markdown(text)}
      </main>
    </div>
  )
}
