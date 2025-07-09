const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size too large. Max 5MB allowed.');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG, JPEG, PNG allowed.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET); // ✅ Sử dụng biến đúng chuẩn React

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, // ✅ Sử dụng biến đúng chuẩn React
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Upload failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export { uploadImage };
