import { useRouter } from 'next/router'
import getGithub from '../../data/getGithub'
import markdown from '../../ui/markdown'
import { useState } from 'react';
import navbar from '../navbar'

export default function md() {
  const router = useRouter()
  const { name } = router.query
  if(!name) return <container>Loading...</container>
  let { text, error } = getGithub(`uw1/d/md/${name}.md`)
  let [show,setShow] = useState(true)
  if (error) return <container><pre>Error: {error}</pre></container>
  if (!text) return <container>Loading...</container>
  return <div>
    {navbar()}
    {navSwitch(show,setShow)}
    {markdown(text,show,setShow)}
  </div>
}
function navSwitch(show,setShow){
  let text = show? '隐' : '显'
  let p = {
    onClick: e => setShow(!show)
  }
  return <tocSwitch {...p}>{text}</tocSwitch>
}