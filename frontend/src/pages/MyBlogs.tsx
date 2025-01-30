import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import api from "../api/api";
import { Blog } from "../types";
import UserNav from "../components/UserNav";
import { toast } from "react-toastify";

function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const user = useSelector((state: RootState) => state.user.user);

  const fetchBlogs = async () => {
    try {
      const response = await api.get(`/users/blogs/${user?.id}`);
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/users/blogs/${id}`);
      if (response.data.success) {
        fetchBlogs();
        toast.success("Blog deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="p-4 w-4/5 mx-auto mt-20">
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead className="">
            <tr className="w-full bg-gray-200 text-center">
              <th className="p-2 border-r border-gray-300">Image</th>
              <th className="p-2 border-r border-gray-300">Title</th>
              <th className="p-2 border-r border-gray-300">Date</th>
              <th className="p-2 border-r border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog: Blog, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b-2">
                  <td className="p-2 border-r border-gray-300">
                    <img
                      src={`http://localhost:8080/uploads/images/${blog.imageUrl.path
                        .split("\\")
                        .pop()}`}
                      alt="blog image"
                      className="h-12 w-12"
                    />
                  </td>
                  <td className="p-2 border-r border-gray-300">{blog.title}</td>
                  <td className="p-2 border-r border-gray-300">
                    {blog.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="p-2 border-r border-gray-300 text-center">
                    <button className="bg-blue-500 text-white p-1 px-3 rounded mx-2 ">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => handleDelete(blog._id)}
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
  );
}

export default MyBlogs;
