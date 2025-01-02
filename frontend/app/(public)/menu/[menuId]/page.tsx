async function page({ params }: { params: Promise<{ menuId: string }> }) {
  const menuId = (await params).menuId;

  return <div>{menuId}</div>;
}

export default page;
