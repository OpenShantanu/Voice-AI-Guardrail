import axios from "axios";

const api = axios.create({
  baseURL:
    "http://localhost:8000"
});

export const uploadAudio =
  async (audio: Blob) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      audio,
      "audio.webm"
    );

    const response =
      await api.post(
        "/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export default api;