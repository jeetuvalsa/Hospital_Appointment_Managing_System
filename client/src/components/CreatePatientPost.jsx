import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePatientPost = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [data, setData] = useState({
    image: "",
    description: "",
  });
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("description", data.description);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/doctor/create/post/${patientId}`,
        { method: "POST", credentials: "include", body: formData }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        toast(responseData.message);
        navigate(-1);
      }
    } catch (error) {
      console.log("Error processing post", error);
    }
  };
  return (
    <div className="bg-black/10 text-black-foreground min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-xl font-bold mb-3">Post Details</h1>
        <label htmlFor="image" className="block text-sm font-medium">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) =>
            setData((prev) => ({ ...prev, image: e.target.files[0] }))
          }
          accept="image/*"
          className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring focus:ring-ring focus:ring-opacity-50"
        />
        <label htmlFor="description" className="block text-sm font-medium mt-4">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring focus:ring-ring focus:ring-opacity-50"
        ></textarea>
        <button
          type="submit"
          onClick={handlePost}
          className="bg-black text-white hover:bg-black/80 rounded-md px-3 py-2 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePatientPost;
