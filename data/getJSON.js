import useSWR from 'swr'

let fetcher = (...args) => fetch(...args).then(res => res.json())

export default function getGithub(url) {
  const { data, error } = useSWR(`${url}`, fetcher)
  return {
    json: data,
    error
  }
}