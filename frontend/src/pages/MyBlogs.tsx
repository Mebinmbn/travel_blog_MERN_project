import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import api from "../api/api";
import { Blog } from "../types";
import UserNav from "../components/UserNav";
import { toast } from "react-toastify";
import EditBlogModal from "../components/EditBlogModal";
import ConfirmationModal from "../components/ConfirmationModal";

function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState<() => void>(
    () => () => {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const limit = 10;

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await api.get(
        `/users/blogs/${user?.id}?page=${currentPage}&${limit}`
      );
      if (response.data.success) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const showConfirmationModal = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setIsConfirmModalOpen(true);
    setConfirmationCallback(() => onConfirm);
  };
  const handleDelete = async (id: string) => {
    console.log("handledelete");
    showConfirmationModal("Do you want to delete?", async () => {
      try {
        const response = await api.delete(`/users/blogs/${id}`);
        if (response.data.success) {
          fetchBlogs();
          toast.success("Blog deleted Successfully");
        }
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const openModal = (index: number) => {
    setIsEditModalOpen(true);
    setBlogToEdit(blogs[index]);
  };

  const closeModal = useCallback(() => {
    setIsEditModalOpen(false);
    setBlogToEdit(null);
    fetchBlogs();
  }, [fetchBlogs]);
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
                    <button
                      className="bg-blue-500 text-white p-1 px-3 rounded mx-2 "
                      onClick={() => openModal(index)}
                    >
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
        {totalPages > limit && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 mb-1 ${
                  currentPage === page
                    ? "bg-blue-500 text-white rounded-full"
                    : "text-black"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      {isEditModalOpen && (
        <EditBlogModal
          isOpen={isEditModalOpen}
          onRequestClose={closeModal}
          blog={blogToEdit}
        />
      )}

      <ConfirmationModal
        showModal={isConfirmModalOpen}
        message={message}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          if (confirmationCallback) confirmationCallback();
          setIsConfirmModalOpen(false);
        }}
      />
    </div>
  );
}

export default MyBlogs;
