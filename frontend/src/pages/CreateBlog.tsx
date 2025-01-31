import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Loader from "../components/Loader";
import UserNav from "../components/UserNav";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface FormValues {
  title: string;
  content: string;
  authorId: string | undefined;
  imageUrl: File | null;
}

interface FormErrors {
  title?: string;
  content?: string;
  imageUrl?: string;
}

function CreateBlog() {
  const initialValues: FormValues = {
    title: "",
    content: "",
    authorId: "",
    imageUrl: null,
  };

  const [formData, setFormData] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  formData.authorId = user?.id;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        setFormData((prevData) => ({ ...prevData, imageUrl: file }));
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      }
    },
    []
  );

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.title.trim()) errors.title = "Title is required!";
    if (!values.content.trim()) errors.content = "Content is required!";
    if (!values.imageUrl) errors.imageUrl = "Image is required!";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      //   setLoading(true);
      await api.post("/users/blogs/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Blog created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNav />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Create a Blog
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Blog Title"
                error={formErrors.title}
              />
              <TextareaField
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your content..."
                error={formErrors.content}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 p-2 rounded-md mt-1"
                />
                {formErrors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.imageUrl}
                  </p>
                )}
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateBlog;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputField = ({ name, value, error, onChange, placeholder }: any) => (
  <div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-2 rounded-md"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextareaField = ({ name, value, error, onChange, placeholder }: any) => (
  <div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-2 rounded-md h-32 resize-none"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
