import { Button } from "@chakra-ui/react";

const UpdateImage = ({ imageUploadHandler }: {
  imageUploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}
) => {
  return (
    <>
      <Button onClick={() => document.getElementById("fileInput")?.click()} colorScheme="blue" mt="2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        上傳圖片
      </Button>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={(event) => {
          imageUploadHandler(event);
          event.target.value = '';
        }}
      />
    </>
  );
};
export default UpdateImage;