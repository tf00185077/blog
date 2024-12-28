interface GetResponse<T> {
  status: 'success' | 'error';
  data?: T;
}
interface PostResponse {
  status: 'success' | 'error';
  message?: string;
}
export type { GetResponse, PostResponse };