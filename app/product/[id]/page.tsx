async function getData(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const parsedData = JSON.stringify(data);
  console.log({ data });
  return (
    <>
      <p>{params.id}</p>
      <div>{parsedData}</div>
    </>
  );
}
