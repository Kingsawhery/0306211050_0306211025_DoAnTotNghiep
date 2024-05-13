          
export const uploadToCloudinary = async (file)=> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUD_PRESET
    );
    formData.append(
        "api_key",
        "388312547521336"
      );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env.REACT_APP_CLOUD_NAME
      }/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    const url = data.url;
  
    return url
  }
  
