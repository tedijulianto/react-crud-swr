import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/products", {
      name: name,
      price: parseInt(price),
    });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={addProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product Name</label>
            <input
              type="text"
              placeholder="Products Name"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              type="text"
              placeholder="Price"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg  hover:shadow"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
