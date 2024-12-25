import calculateWidthAndHeight from "@/lib/utils/calculateWidthAndHeight";
// @ts-expect-error no declaration file
import { EditorState, AtomicBlockUtils } from "draft-js";
import { ImageDimensions } from "./type";

const getImageDimensions = (file: File): Promise<ImageDimensions> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { originalWidth, originalHeight, displayWidth, displayHeight } = calculateWidthAndHeight(img.naturalWidth, img.naturalHeight, 300);
      resolve({
        originalWidth,
        originalHeight,
        displayWidth,
        displayHeight
      });
    };
    img.src = URL.createObjectURL(file);
  });
};

const insertImage = async (editorState: EditorState, file: File) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    alert('圖片大小不能超過 5MB');
    return;
  }
  const { displayWidth, displayHeight, originalWidth, originalHeight } = await getImageDimensions(file);
  try {
    const objectUrl = URL.createObjectURL(file);
    const uniqueId = `${file.name}-${Date.now()}`;
    // 獲取當前選區
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // 創建 entity
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src: objectUrl,
        originalFile: file,
        // uniqueId, // 添加唯一 ID
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          displayWidth,
          displayHeight,
          originalWidth,
          originalHeight
        }
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // 在插入新的 atomic block 之前，先移動選區到最後
    const contentBlock = contentState.getBlockForKey(selection.getStartKey());
    const newSelection = selection.merge({
      anchorOffset: contentBlock.getLength(),
      focusOffset: contentBlock.getLength(),
    });
    // 使用新的選區創建 EditorState
    let newEditorState = EditorState.forceSelection(
      editorState,
      newSelection
    );
    // 插入 atomic block
    newEditorState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );
    return newEditorState;
  } catch (error) {
    console.error('插入圖片時發生錯誤:', error);
    alert('圖片插入失敗');
  }
};


const handleFileUpload = async (editorState: EditorState, event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    return await insertImage(editorState, file);
  }
  return editorState;
};
export { handleFileUpload };