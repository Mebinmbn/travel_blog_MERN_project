import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { Blog } from "../types";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/users/blogs");
      if (response.data.success) {
        setBlogs(response.data.blogs);
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
  }, [navigate]);
  return (
    <div className="bg-[#4fc9fa] max-w-full min-h-screen overflow-hidden">
      <Navbar />
      <div className=" w-full max-w-7xl mx-auto gap-2 p-10 pt-20 min-h-screen">
        <div className="w-full h-screen col-span-4 bg-gray-100 mb-2 drop-shadow-lg p-2">
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
        </div>
      </div>
    </div>
  );
}

export default Home;
