"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircle, SearchIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const products = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [CreateProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await CreateProduct(productData);
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">Loading...</div>
    );
  if (isError)
    return <div className="text-center text-red-500 py-4">Error</div>;

  return (
    <div className="mx-auto pb-5 w-full ">
      {/*Search*/}
      <div className=" mb-6 ">
        <div className="flex items-center border-2 border-blue-50 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/*Header*/}
      <div className=" flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className=" flex gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5  !text-gray-200" />
          Create New Product
        </button>
      </div>
      {/*product list*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className=" boder shadow bg-white p-4 max-w-full  rounded mx-2 my-2"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`/product${Math.floor(Math.random() * 3) + 1}.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />

                <h3 className="text-lg text-gray-900  font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">Price: ${product.price}</p>
                <div className=" text-sm mt-1 text-gray-600">
                  Quantity: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/*Modal*/}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};
export default products;
