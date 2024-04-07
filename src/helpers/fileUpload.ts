export const fileUpload = async (file: File | null) => {
  if (!file) throw new Error("No tenemos ningun archivo por subir");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dkulk7sit/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if(!resp.ok) throw new Error("No se pudo subir imagen")

    const cloudResp = await resp.json()
    
    return cloudResp.secure_url;
    
  } catch (error: any) {
    throw new Error(error.message);
  }
};
