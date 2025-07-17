import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URI } from "../utils/utils";

export const useSignUp = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URI}/auth/register`, formData);
      return data;
    },
    onError: (error) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);
      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: data?.otpLevel ?? true,
          id: data.user._id,
        })
      );
      setTimeout(() => {
        window.location.replace("/verify");
      }, 2000); // hoặc dùng navigate nếu hook đang trong component
    },
  });
};

export const useResend = (toast, toggle) => {
  return useMutation({
    mutationFn: async (id) => {
      toggle();
      const { data } = await axios.post(`${API_URI}/users/resend-link/${id}`);
      return data;
    },
    onError: (error) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);
    },
  });
};

export const useVerification = (toast, toggle) => {
  return useMutation({
    mutationFn: async ({ id, otp }) => {
      const { data } = await axios.post(`${API_URI}/users/verify/${id}/${otp}`);
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      localStorage.removeItem("otp_data");
      setTimeout(() => {
        window.location.replace("/auth"); // hoặc navigate("/") nếu cần
      }, 1000);
    },
  });
};
