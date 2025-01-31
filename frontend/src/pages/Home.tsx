import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import image from "../assets/login_background.jpg";
import api from "../api/api";
import { Blog } from "../types";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await api.get(
        `/users/blogs?page=${currentPage}&limit=7`
      );
      if (response.data.success) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedBlog = (blog: Blog) => {
    navigate("/blog", { state: { selectedBlog: blog } });
  };

  useEffect(() => {
    fetchBlogs();
  }, [navigate, currentPage]);
  return (
    <div
      className="bg-cover max-w-full min-h-screen overflow-hidden backdrop-blur-lg bg-opacity-50"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <Navbar />
      <div className=" w-full max-w-7xl mx-auto gap-2 p-10 pt-20 min-h-screen">
        <div className="w-full min-h-screen col-span-4 bg-gray-100 mb-2 drop-shadow-lg p-2">
          {blogs &&
            blogs.map((blog, index) => (
              <div
                key={index}
                className="flex gap-5 border-b-2 mb-2 cursor-pointer bg-gray-200"
                onClick={() => handleSelectedBlog(blog)}
              >
                <img
                  src={`http://localhost:8080/uploads/images/${blog.imageUrl.path
                    .split("\\")
                    .pop()}`}
                  alt="blog image"
                  className=" h-32 w-32"
                />
                <div className="w-full">
                  <p className="Text-2xl font-extrabold mb-2">{blog.title}</p>
                  <div className="h-fit w-full overflow-hidden">
                    <p>
                      {blog.content.length > 200
                        ? `${blog.content.slice(0, 200)}...`
                        : blog.content}
                    </p>
                  </div>
                  <div className="mt-6 flex w-full justify-between text-gray-500">
                    <p>
                      Author: {blog.authorId?.firstName}{" "}
                      {blog.authorId?.lastName}
                    </p>
                    <p>Date: {blog.createdAt.toString().slice(0, 10)}</p>
                  </div>
                </div>
                <div className=" w- mt-auto ml-auto mb-2 "></div>
              </div>
            ))}
          {
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
