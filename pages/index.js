import Head from 'next/head'
import markdown from '../ui/markdown'

let text = `
**我是一个在和失败漩涡做斗争的全栈开发&效率极客。**

这是我的个人网站v1.0，目前的内容分为:
[[资源]] - 我收集整理的线上资源
[[笔记]] - 我的Zettelkasten笔记
[[写作]] - 我写的文章或博客
[bili](/bili) - b站

建于2021.01.01，更多内容正在创作中。
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
