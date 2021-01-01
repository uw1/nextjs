import Link from 'next/link'

export default function navbar() {
  let names = '首页 资源 笔记'.split(' ')
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