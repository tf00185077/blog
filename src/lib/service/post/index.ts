import { PostResponse } from "@/lib/service/type";

const post = async (formData: FormData): Promise<PostResponse> => {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export { post };