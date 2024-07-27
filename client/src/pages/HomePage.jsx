import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const { doctorData, isLoading, auhtentication, allDoctordata, allDoctors } =
    useAuth();
  const navigate = useNavigate();
  const [editBtn, setEditBtn] = useState(true);

  // console.log(isLoading);

  const [updateData, setUpdateData] = useState({
    name: "",
    specialization: "",
    yearsOfExperience: Number,
    department: "",
    mobileNumber: Number,
    image: "",
    password: "",
  });
  useEffect(() => {
    if (!doctorData && !isLoading) {
      navigate("/");
    }
  }, [doctorData, isLoading, navigate]);
  useEffect(() => {
    allDoctordata();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!doctorData) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", updateData.name);
    formdata.append("specialization", updateData.specialization);
    formdata.append("yearsOfExperience", updateData.yearsOfExperience);
    formdata.append("department", updateData.department);
    formdata.append("mobileNumber", updateData.mobileNumber);
    formdata.append("image", updateData.image);
    formdata.append("password", updateData.password);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/edit`, {
        method: "POST",
        credentials: "include",
        body: formdata,
      });
      if (response.ok) {
        const responseData = await response.json();
        // console.log("done");
        await auhtentication();
        toast(responseData.message);
        setEditBtn(true);
      }
    } catch (error) {
      console.log("An error occurred while updating", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center px-12 justify-center md:justify-between p-4 md:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center md:items-start pl-24">
        <img
          src={doctorData.image}
          alt="User Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">{doctorData.name}</h2>
        <p className="text-md py-0.5 mt-1">
          <span className="font-medium">Specialization:</span>{" "}
          {doctorData.specialization}
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Years of Experience:</span>{" "}
          {doctorData.yearsOfExperience} years
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Department:</span>{" "}
          {doctorData.department}
        </p>
        <p className="text-md py-0.5">
          <span className="font-medium">Mobile Number:</span>{" "}
          {doctorData.mobileNumber}
        </p>
        {editBtn ? (
          <h1
            onClick={() => setEditBtn(false)}
            className="bg-black text-white hover:bg-black/80 mt-2 cursor-pointer rounded-md px-4 py-2"
          >
            Edit Profile
          </h1>
        ) : (
          <div className="mt-4 bg-card text-card-foreground p-4 rounded-lg w-full">
            <h3 className="text-lg font-bold mb-2">Edit Profile</h3>
            <form>
              <label htmlFor="image" className="block text-sm mb-1">
                Profile Picture:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
                className="w-full bg-input text-input rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="name" className="block text-sm mb-1">
                Full name:
              </label>
              <input
                type="text"
                id="name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter full name"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="specialization" className="block text-sm mb-1">
                Specialization:
              </label>
              <input
                type="text"
                id="specialization"
                value={updateData.specialization}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
                placeholder="Enter Specialization"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="yearsOfExperience" className="block text-sm mb-1">
                Years Of Experience:
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                value={updateData.yearsOfExperience}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    yearsOfExperience: e.target.value,
                  }))
                }
                placeholder="Enter years of experience"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-2"
              />

              <label htmlFor="department" className="block text-sm mb-1">
                Department:
              </label>
              <input
                type="text"
                id="department"
                value={updateData.department}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                placeholder="Enter department"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-4"
              />
              <label htmlFor="mobileNumber" className="block text-sm mb-1">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={updateData.mobileNumber}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                  }))
                }
                placeholder="Enter mobile number"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-4"
              />
              <label htmlFor="password" className="block text-sm mb-1">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                value={updateData.password}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter new password"
                className="w-full bg-input text-input border border-black rounded-md px-2 py-1 mb-4"
              />

              <button
                type="submit"
                onClick={handleUpdate}
                className="bg-black text-white hover:bg-black/80 rounded-md px-4 py-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {allDoctors ? (
        <div className="hidden md:block md:w-1/3 mr-24 overflow-y-auto max-h-80 bg-card text-card-foreground p-4 rounded-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Other Doctors</h3>
          {allDoctors.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-start gap-10"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-[2px] border-black">
                <img
                  className="w-full h-full object-cover object-center"
                  src={item.image}
                  alt=""
                />
              </div>
              <div>
                <h4 className="text-base font-bold">{item.name}</h4>
                <p className="text-sm">Mobile No: {item.mobileNumber}</p>
                <p className="text-sm">Specialization: {item.specialization}</p>
                <p className="text-sm">
                  Department: {item.department} department
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-xl font-semibold mr-32">No Doctors Data Found</h1>
      )}
    </div>
  );
};

export default HomePage;
