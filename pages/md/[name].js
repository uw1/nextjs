import { useRouter } from 'next/router'
import getGithub from '../../data/getGithub'
import markdown from '../../ui/markdown'
import Link from 'next/link'
import { useState } from 'react';

var show = true
export default function md() {
  const router = useRouter()
  const { name } = router.query
  let { text, error } = getGithub('AMAI-GmbH/AI-Expert-Roadmap/readme.md')
  let [show,setShow] = useState(true)
  if (error) return <container><pre>Error: {error}</pre></container>
  if (!text) return <container>Loading...</container>
  return <div>
    {nav('首页 资源 笔记')}
    {navSwitch(show,setShow)}
    {markdown(text,show,setShow)}
  </div>
}
function navSwitch(show,setShow){
  let text = show? '隐' : '显'
  let p = {
    onClick: e => setShow(!show)
  }
  // let s = innerWidth>800? {top:10} : {bottom:10}
  return <tocSwitch {...p}>{text}</tocSwitch>
}
function nav(str) {
  let names = str.split(' ')
  // let s = innerWidth>800? {} : { bottom: 0 }
  return <nav>
    {names.map(link)}
  </nav>
}

function link(name,key) {
    let p = {
      key,
      href: name=='首页'?'/':'/md/'+name
    }
    let style = {paddingLeft:''}
    return <Link {...p} style={style}>{name}</Link>
}