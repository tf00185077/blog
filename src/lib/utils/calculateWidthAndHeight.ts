const calculateWidthAndHeight = (originalWidth: number, originalHeight: number, maxSize: number) => {

  let displayWidth = originalWidth;
  let displayHeight = originalHeight;

  // 如果寬度或高度超過最大值，按比例縮放
  if (originalWidth > maxSize || originalHeight > maxSize) {
    if (originalWidth > originalHeight) {
      // 寬度優先
      displayWidth = maxSize;
      displayHeight = Math.round((originalHeight * maxSize) / originalWidth);
    } else {
      // 高度優先
      displayHeight = maxSize;
      displayWidth = Math.round((originalWidth * maxSize) / originalHeight);
    }
  }
  return ({
    originalWidth,
    originalHeight,
    displayWidth,
    displayHeight
  });
};
export default calculateWidthAndHeight;