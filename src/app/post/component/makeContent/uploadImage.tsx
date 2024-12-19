const UploadImage = ({ imageUploadHandler }: { imageUploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return <>
    <div className="w-1/3">
      <input
        type="file"
        accept="image/*"
        onChange={imageUploadHandler}
        className="w-full p-2 border rounded-md"
      />
    </div>;
  </>;
};

export default UploadImage;