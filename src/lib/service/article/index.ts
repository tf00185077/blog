import { Article } from "@/app/(web)/article/_helper/type";
import { GetResponse } from "@/lib/service/type";
const get = async ({ page, size }: { page?: number, size?: number; }): Promise<GetResponse<Article[]>> => {
  const response = await fetch(`/api/article?page=${page}&size=${size}`);
  return response.json();
};

export { get };