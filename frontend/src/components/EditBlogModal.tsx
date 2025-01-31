import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import { Blog } from "../types";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import api from "../api/api";
import { IUser } from "../../../backend/server/src/models/userModel";

interface FormValues {
  _id: string;
  title: string;
  content: string;
  authorId: string | undefined | IUser;
  imageUrl: File | null | undefined;
}

interface FormErrors {
  title?: string;
  content?: string;
  imageUrl?: string;
}

interface EditBlogModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  blog: Blog | null | undefined;
}
const EditBlogModal: React.FC<EditBlogModalProps> = ({
  isOpen,
  onRequestClose,
  blog,
}) => {
  const initialValues: FormValues = {
    _id: blog?._id || "",
    title: blog?.title || "",
    content: blog?.content || "",
    authorId: blog?.authorId,
    imageUrl: null,
  };

  const [formData, setFormData] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [image, setImage] = useState<string | null>(null);

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

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      //   setLoading(true);
      console.log("formData", formData);
      await api.put(`/users/blogs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Blog updated successfully!");
      onRequestClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: "40%",
          margin: "auto",
          padding: "10px",
          backgroundColor: "#0000",
          zIndex: "1000",
          marginTop: "40px",
        },
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      }}
      ariaHideApp={false}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto h-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Edit Blog
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
              <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>
            )}
            {
              <img
                src={
                  image
                    ? image
                    : `http://localhost:8080/uploads/images/${blog?.imageUrl.path
                        .split("\\")
                        .pop()}`
                }
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            }
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditBlogModal;

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
