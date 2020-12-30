import useSWR from 'swr'

let fetcher = (...args) => fetch(...args).then(res => res.text())

export default function getGithub(url) {
  const { data, error } = useSWR(`https://cdn.jsdelivr.net/gh/${url}`, fetcher)
  return {
    text: data,
    error
  }
}