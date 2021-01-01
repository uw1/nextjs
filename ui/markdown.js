import Head from 'next/head'
import marked from 'marked'
import { useRouter } from 'next/router'
marked.setOptions({
  breaks: true,
  smartLists: true,
})
function wikilink(text) {
  return `<a class="red" href="/md/${encodeURI(text)}">${text}</a>`
}
export default function markdown(md, show, setShow) {
  let tokens = marked.lexer(md.replace(/\[\[([^\]]+)\]\]/g, (_, t) => wikilink(t)))
  // let title = tokens.find(t => t.type == 'heading').text
  // document.title = title
  let router = useRouter()
  let click = e => {
    console.dir(e.target)
    let el = e.target
    if(el.origin==origin) {
      e.preventDefault()
      router.push(el.pathname)
    }
  }
  return (
    <container>
      <Head>
        {/* <title>Create Next App</title> */}
      </Head>
      <markdown dangerouslySetInnerHTML={{__html:marked.parser(tokens)}} onClick={click}></markdown>
      {show?toc(tokens,setShow):''}
    </container>
  )
}

function toc(tokens,setShow) {
  let headings = tokens.filter(t => t.type == 'heading')
  let s = innerWidth>800? {} : { left: 0, margin: 0 }
  let hide = e=>{
    if (innerWidth<800)setShow(false)
  }
  return <toc style={s} onClick={hide}>{headings.map(o=>heading(o))}</toc>
}

function heading({depth, text}) {
  // let color = s.hID == hID ? ' c0' : ''
  let paddingLeft = depth>1? 24: 10
  let id = slug(text)
  let p = {
    id: 'toc-' + text,
    key: id,
    title: text,
    href: '#' + id
  }
  let style = {paddingLeft}
  return <a {...p} style={style}>{text}</a>
}
function slug(text) {
  return text.toLowerCase().trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-')
}