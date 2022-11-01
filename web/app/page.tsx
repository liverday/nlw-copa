import { use } from "react"

type Pool = {
  id: string,
  title: string
  createdAt: Date;
  updatedAt: Date;
  code: string;
}

type Data = {
  pools: Pool[],
  count: number
}

export async function getData(): Promise<Data> {
  const [{ pools }, { count }] = await Promise.all([
      fetch('http://0.0.0.0:3333/pools')
        .then(response => response.json()),
      fetch('http://0.0.0.0:3333/pools/count')
        .then(response => response.json())
  ])

  return { pools, count };
}

export default function HomePage() {
  const { pools, count } = use(getData())

  return (
    <>
      <h1>Hello World</h1>
      <p>Contagem: {count}</p>
      <ul>
        {pools.map(pool => (
          <li key={pool.id}>{pool.title}</li>
        ))}
      </ul>
    </>
  )
}
