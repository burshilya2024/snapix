import { useFetchPostsQuery } from '@/store/PlaceholderTestApi'

function Search() {
  const { data: posts = [], error, isLoading } = useFetchPostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Posts Search</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search
