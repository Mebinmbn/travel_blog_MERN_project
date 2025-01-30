import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Blog() {
  const location = useLocation();
  const { selectedBlog } = location.state || null;
  console.log(selectedBlog);
  return (
    <div className="bg-gray-300">
      <Navbar />
      <div className=" mx-auto w-4/5 mt-20 py-5 min-h-screen">
        <div className="flex gap-5">
          <img
            src={`http://localhost:8080/uploads/images/${selectedBlog.imageUrl.path
              .split("\\")
              .pop()}`}
            alt=""
            className="h-80 max-w-98"
          />
          <div className="Heading">
            <p className="text-4xl font-extrabold mb-5">{selectedBlog.title}</p>
            <p className="text-gray-500">
              Author: {selectedBlog.authorId.firstName}{" "}
              {selectedBlog.authorId.lastName}
            </p>
            <p className="text-gray-500">
              Date: {selectedBlog.createdAt.toString().slice(0, 10)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-justify highlight-first-letter text-xl">
            {selectedBlog.content}
          </p>
        </div>
        <p className="text-center">
          {" "}
          ________________________....___________________________
        </p>
      </div>
    </div>
  );
}

export default Blog;
