import axios from "axios";
import React from "react";
import { useQuery, QueryClient, QueryClientProvider, Post } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App() {
  const [postId, setPostId] = React.useState(-1);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* <p>Pokemon Names</p>
        <Pokemon />
        <p>Berries Names</p>
        <Berries /> */}
        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

// function Pokemon() {
//   // console.log(useQuery);
//   const datas = useQuery("pokemon", async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     return axios
//       .get("https://pokeapi.co/api/v2/pokemon")
//       .then((res) => res.data.results);
//   });
//   return datas.isLoading ? (
//     "Loading..."
//   ) : datas.isError ? (
//     datas.error.message
//   ) : (
//     <div>
//       {datas.data.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//     </div>
//   );
// }

// function Berries() {
//   // console.log(useQuery);
//   const datas = useQuery("berries", async () => {
//     await new Promise((resolve) => setTimeout(resolve, 4000));
//     return axios
//       .get("https://pokeapi.co/api/v2/berry")
//       .then((res) => res.data.results);
//   });
//   return datas.isLoading ? (
//     "Loading..."
//   ) : datas.isError ? (
//     datas.error.message
//   ) : (
//     <div>
//       {datas.data.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//     </div>
//   );
// }

function Posts({ setPostId }) {
  const postQuery = useQuery("posts", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  });
  return (
    <div>
      <h1>Posts {postQuery.isFetching ? "..." : null}</h1>
      <div>
        {postQuery.isLoading ? (
          "Loading posts ..."
        ) : (
          <ul>
            {postQuery.data.map((post) => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
