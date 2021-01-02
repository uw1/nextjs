import Head from 'next/head'
import markdown from '../ui/markdown'

let text = `
# Who
一个在和失败漩涡做斗争的全栈开发&效率极客。

# 导航
[[资源]] - 我收集整理的线上资源
[[笔记]] - 我的Zettelkasten笔记
[[写作]] - 我写的文章或博客
[/bilibili](/bilibili) - 基于收藏率爬取b站优质视频

# Changelog
2021-01-01，单向链接Markdown渲染

`
export default function Home() {
  return (
    <div className=''>
      <Head>
        <link href="https://unpkg.com/bonsai.css@latest/dist/bonsai.min.css" rel="stylesheet"></link>
      </Head>
      <main>
        {markdown(text)}
      </main>
    </div>
  )
}
