import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const ProductList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <div>Loading...</div>;

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    mutate("products");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-green-400 hover:bg-green-500 hover:text-white rounded-md font-semibold px-2 py-1"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-sm mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-1 py-3 text-center">No</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-1 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr className="bg-white border-b" key={product.id}>
                  <td className="px-1 py-3 text-center">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-3">{product.price}</td>
                  <td className="px-1 py-3 text-center">
                    <Link
                      to={`/edit/${product.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
