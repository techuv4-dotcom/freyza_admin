import axiosInstance from "./Axios.instance";

interface UploadedFile {
  fileName:string,
  imageUrl: string;
  
}

export const uploadFile = async (
    folder:string,
  file: File
): Promise<UploadedFile> => {
  const formData = new FormData();

  
    formData.append("image", file);
  

  const response = await axiosInstance.post(
    `/upload/${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  // console.log(response.data.data);
  
  return response.data.data;
};