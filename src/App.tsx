import { gql, useQuery } from "@apollo/client"

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`

export function App() {

  // react way
  const { data } = useQuery(GET_LESSONS_QUERY)

  // non-react way
  // useEffect(() => {
  // client.query({
  //   query: GET_LESSONS_QUERY
  // }).then(res => console.log(res?.data))
  // }, [])

  console.log('data', data)
  return (
    <h1 className="text-2xl">Hello world!</h1>
  )
}