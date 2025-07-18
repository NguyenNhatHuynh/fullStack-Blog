import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Button, Divider, Inputbox, Logo } from "../components";
import { uploadImage } from "../utils/utils";
import { useDisclosure } from "@mantine/hooks";
import { useSignUp } from "../hooks/auth-hook";

const SignupPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const { mutate, isPending } = useSignUp(toast, toggle); // ✅ dùng hook mới

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleUpload = async () => {
      try {
        const url = await uploadImage(file);
        setFileURL(url);
        toast.success("Ảnh đã được tải lên thành công");
      } catch (err) {
        toast.error(err.message || "Tải ảnh lên thất bại");
        setFile("");
      }
    };
    if (file) handleUpload();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !fileURL
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin và chọn ảnh");
      return;
    }

    const payload = {
      ...data,
      avatar: fileURL,
    };

    mutate(payload);
  };

  return (
    <div className="flex w-full h-screen">
      {/* LEFT */}
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 h-full bg-black items-center justify-center">
        {fileURL && (
          <img
            src={fileURL}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <Logo type="sigin" />
        <span className="text-xl font-semibold text-white">Welcome!</span>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-4 md:px-20 lg:px-40">
        <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8">
          <div className="block mb-10 md:hidden -ml-8">
            <Logo />
          </div>

          <div className="w-full space-y-6 flex flex-col justify-start">
            <div className="max-w-md w-full flex gap-3 md:gap-4 items-center justify-center mb-12">
              {showForm && (
                <IoArrowBackCircleSharp
                  className="text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400"
                  onClick={() => setShowForm(false)}
                />
              )}
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign up for an account
              </h2>
            </div>

            {showForm ? (
              <form
                className="max-w-md w-full mt-8 space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col rounded-md shadow-sm gap-6 mb-8">
                  <div className="w-full flex gap-4">
                    <Inputbox
                      label="First Name"
                      name="firstName"
                      type="text"
                      isRequired={true}
                      placeholder="First Name"
                      value={data.firstName}
                      onChange={handleChange}
                    />
                    <Inputbox
                      label="Last Name"
                      name="lastName"
                      type="text"
                      isRequired={true}
                      placeholder="Last Name"
                      value={data.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <Inputbox
                    label="Email Address"
                    name="email"
                    type="email"
                    isRequired={true}
                    placeholder="email@example.com"
                    value={data.email}
                    onChange={handleChange}
                  />

                  <Inputbox
                    label="Password"
                    name="password"
                    type="password"
                    isRequired={true}
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                  />

                  <div className="flex items-center justify-between py-4">
                    <label
                      className="flex items-center gap-1 text-base text-black dark:text-gray-500 cursor-pointer"
                      htmlFor="imgUpload"
                    >
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        id="imgUpload"
                        accept=".jpg, .png, .jpeg"
                      />
                      <BiImages />
                      <span>Picture</span>
                    </label>
                    {fileURL && (
                      <img
                        src={fileURL}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>

                <Button
                  label="Create Account"
                  type="submit"
                  styles="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                />
              </form>
            ) : (
              <div className="max-w-md w-full space-y-8">
                <Button
                  onClick={() => toast("Google login chưa được cấu hình")}
                  label="Sign up with Google"
                  icon={<FcGoogle className="text-xl" />}
                  styles="w-full flex flex-row-reverse gap-4 bg-black dark:bg-transparent dark:border text-white px-5 py-2.5 rounded-full"
                />
                <Divider label="OR" />
                <Button
                  onClick={() => setShowForm(true)}
                  label="Continue with email"
                  styles="w-full gap-4 bg-white text-black dark:bg-rose-800 dark:text-white px-5 py-2.5 rounded-full border dark:border-none border-gray-300"
                />
              </div>
            )}

            <p className="max-w-md w-full text-center text-gray-600 dark:text-gray-300">
              Already has an account?{" "}
              <Link to="/sign-in" className="text-rose-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default SignupPage;
