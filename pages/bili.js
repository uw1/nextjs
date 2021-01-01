import getJSON from '../data/getJSON'
import { useState } from 'react';
import navbar from './navbar'
import {useTable,useSortBy} from 'react-table'

export default function md() {
  let { json, error } = getJSON('sh2.json')
  if (error) return <container><pre>Error: {error}</pre></container>
  if (!json) return <container>Loading...</container>
  let data = parseTSV(json).map(o=>{
    o.duration = (o.duration / 60).toFixed(0)
    o.date = o.pubdate.slice(0,10)
    o.rComment = (o.review * 100 / o.play).toFixed(2)
    o.rSave = (o.favorites * 100 / o.play).toFixed(2)
    o.multi = (o.rSave * Math.cbrt(o.favorites)).toFixed(0)
    return o
  })

  let columns = [
    {Header: '标题', accessor: 'title',        
      Cell: ({row}) => {
        console.log(row)
        let {title, bvid} = row.original
        let url = 'https://bilibili.com/video/' + bvid
        return <a href={url}>{title}</a>
      }
    },
    // {Header: '日期', accessor: 'date', width: 100 },
    {Header: '分钟', accessor: 'duration' },
    // {Header: '作者', accessor: 'author' },
    // {Header: '分数', accessor: 'rank_score' },
    // {Header: '收藏分', accessor: 'multi' },
    {Header: '收藏率', accessor: 'rSave' },
    // {Header: '评论率', accessor: 'rComment' },
    // {Header: '收藏数', accessor: 'favorites' },
    {Header: '播放数', accessor: 'play' }
  ]
  return <div>
    <Table columns={columns} data={data} />
    {navbar()}
  </div>
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

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
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