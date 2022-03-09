import useSWR from 'swr'

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)

export default function Index() {
  const { data, error } = useSWR('{ users { name, email, contact } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { users } = data
  
  const mainStyle = {
    padding: "10px",
    'text-align': "center",
  };
  
  const userListStyle = {
    width: "500px",
    color: "black",
    border: "1px solid black",
    'border-radius': "5px",
    padding: "5px",
    fontFamily: "Arial",
    margin: "20px",
    'text-align': "center",
  };

  return (
    <div style={mainStyle}>
      {users.map((user, i) => (
        <div key={i} style={userListStyle}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.contact}</p>
        </div>
      ))}
    </div>
  )
}
