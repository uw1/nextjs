import getJSON from '../data/getJSON'
import { useEffect } from 'react';
import navbar from './navbar'
import {useTable,useSortBy} from 'react-table'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function md() {
    // {Header: '日期', accessor: 'date', width: 100 },    
    // {Header: '作者', accessor: 'author' },
    // {Header: '分数', accessor: 'rank_score' },
    // {Header: '收藏分', accessor: 'multi' },
    // {Header: '评论率', accessor: 'rComment' },
    // {Header: '收藏数', accessor: 'favorites' },
    // {Header: '播放数', accessor: 'play' }
  const router = useRouter()
  console.log('load')
  useEffect(() => {
    let {id, month, year} = parseQuery(location.search)
    if (!id || !month || !year) {
      router.push({ pathname:'/bilibili', query:{
        id: id||21,
        month: month||1,
        year: year||2020
      }})
    }
  })
  return <div>
    <Head>
      <link href="https://unpkg.com/bonsai.css@latest/dist/bonsai.min.css" rel="stylesheet"></link>
    </Head>
    {menubar()}
    {xTable()}
    {navbar()}
  </div>
}
function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
function parseTSV ({columns, tsv}){
  columns = columns.split(' ')
  return tsv.split('\n').map(line=>{
    let o = {}
    line.split('\t').forEach((val,i) => {
      o[columns[i]] = val
    })
    return o
  })
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
  const firstPageRows = rows
  return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc ? '↑' : '↓'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
  )
}


function menuitem (name, id, month,year) {
  if(!month) (month = 12, year--)
  if(month>12) (month = 1, year++)
  let router = useRouter()
  let p = {
    onClick(){
      router.push({ pathname: '/bilibili', query:{id,month,year}})
    },
    style: {
      padding: '8px'
    }
  }
  return <button class="black" {...p}>{name}</button>
}
function menubar () {
  let query = useRouter().query
  let {id,month,year} = query
  return <div class="group">
    {menuitem('日常', 21, month, year)}
    {menuitem('社科', 124, month, year)}
    {/* {menuitem('技术', 122, month, year)} */}
    {menuitem('财经', 207, month, year)}
    {menuitem('职场', 209, month, year)}
    {menuitem('科学', 201, month, year)}
    {menuitem('记录', 178, month, year)}
    {menuitem('上月', id, +month-1, year)}
    {menuitem('下月', id, +month+1, year)}
  </div>
}
function xTable () {
  let router = useRouter()
  let {id=21,month=1,year=2020} = router.query
  if(!month) (month = 12, year--)
  if(month>12) (month = 1, year++)
  let { json, error } = getJSON('bilibili/'+id+year+month+'.json')
  if (error) return <container><pre>Error: {error}</pre></container>
  if (!json) return <container>Loading...</container>
  let data = parseTSV(json).map(o=>{
    o.rSave = (o.favorites * 100 / o.play).toFixed(1)
    o.duration = (o.duration / 60).toFixed(0)
    o.date = o.pubdate.slice(0,10)
    o.rComment = (o.review * 100 / o.play).toFixed(2)
    o.multi = (o.rSave * Math.cbrt(o.favorites)).toFixed(0)
    o.play = ~~(o.play/1000)
    return o
  })
  let columns = [
    // {Header: '时', accessor: 'duration',sortDescFirst: 1 },
    {Header: '标题', accessor: 'title',
      Cell: ({row}) => {
        let {title, bvid} = row.original
        let url = 'https://bilibili.com/video/' + bvid
        return <a href={url}>{title}</a>
      }
    },
    {Header: '藏', accessor: 'rSave', sortDescFirst: 1 },
    {Header: '播', accessor: 'play',sortDescFirst: 1 },
    // {Header: '日期', accessor: 'date', width: 100 },
  ]
  return  <Table columns={columns} data={data} />
}