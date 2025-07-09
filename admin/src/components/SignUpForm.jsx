import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/auth-hook";
import { uploadImage } from "../utils/utils";
import { PasswordStrength } from "./PasswordStrength";
import { clsx } from "clsx";

const SignUpForm = ({ toast, isSignin, setIsSignin, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { mutate } = useSignUp(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [passValue, setPassValue] = useInputState("");

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 3 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values) => {
    if (!isSignin && strength < 90) return;
    
    // Kiểm tra nếu đang upload ảnh
    if (isUploading) {
      toast.warning("Please wait for image upload to complete", { 
        duration: 3000, 
        position: "top-center" 
      });
      return;
    }

    setFormClose(true);

    mutate({
      ...values,
      password: passValue,
      image: fileURL,
      accountType: "Writer",
    });
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      uploadImage(file)
        .then((url) => {
          setFileURL(url);
          setIsUploading(false);
          toast.success("Image uploaded successfully", { 
            duration: 3000, 
            position: "top-center" 
          });
        })
        .catch((err) => {
          setIsUploading(false);
          setFile(""); // Reset file khi upload fail
          const errorMessage = err.message || "Failed to upload image";
          toast.error(errorMessage, { 
            duration: 4000, 
            position: "top-center" 
          });
          console.error(err);
        });
    }
  }, [file, toast]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className='flex flex-col gap-3'
    >
      <div className='w-full flex gap-2 '>
        <TextInput
          className='w-full'
          withAsterisk
          label='First Name'
          placeholder='First Name'
          {...form.getInputProps("firstName")}
        />
        <TextInput
          className='w-full'
          withAsterisk
          label='Last Name'
          placeholder='Last Name'
          {...form.getInputProps("lastName")}
        />
      </div>

      <TextInput
        withAsterisk
        label='Email Address'
        placeholder='your@email.com'
        {...form.getInputProps("email")}
      />

      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={false}
      />

      <Group className={`w-full flex justify-between`} mt='md'>
        <div className={`flex flex-col items-center justify-between`}>
          <label
            className={clsx(
              "flex items-center gap-1 text-base cursor-pointer",
              theme ? "text-gray-500" : "text-slate-700",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            htmlFor='imgUpload'
          >
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='imgUpload'
              data-max-size='5120'
              accept='.jpg, .png, .jpeg'
              disabled={isUploading}
            />
            <BiImages />
            <span>
              {isUploading ? "Uploading..." : "Picture"}
            </span>
          </label>
          {fileURL && (
            <div className="mt-2">
              <img 
                src={fileURL} 
                alt="Preview" 
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <Button
          type='submit'
          className={clsx(theme ? "bg-blue-600" : "bg-black")}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </Group>
      
      <p className='text-sm'>
        {isSignin ? "Don't have an account?" : "Already has an account?"}
        <span
          className='underline text-blue-600 ml-1 cursor-pointer'
          onClick={() => setIsSignin((prev) => !prev)}
        >
          {isSignin ? "Sign up" : "Sign in"}
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;