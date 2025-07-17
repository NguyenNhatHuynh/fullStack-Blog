// ✅ Biến dùng để gọi API backend
export const API_URI = "http://localhost:8800"; // Thay URL nếu bạn dùng domain thật

// ✅ Hàm upload ảnh lên Cloudinary
export const uploadImage = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    // Giới hạn dung lượng tối đa 5MB
    if (file.size > 5 * 1024 * 1024)
      throw new Error("File size too large. Max 5MB allowed.");

    // Chỉ chấp nhận các định dạng ảnh hợp lệ
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type))
      throw new Error("Invalid file type. Only JPG, JPEG, PNG allowed.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Upload failed: ${response.status} - ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// ✅ Tiện ích định dạng số (optional)
export const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};
