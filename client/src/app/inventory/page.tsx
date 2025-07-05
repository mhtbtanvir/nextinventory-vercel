"use client";

import { useGetProductsQuery } from "@/state/api";

const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return <div>page</div>;
};

export default Inventory;
