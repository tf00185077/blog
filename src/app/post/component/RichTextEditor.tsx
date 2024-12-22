'use client';

import React, { useState } from "react";
// @ts-expect-error no declaration file
import { Editor, EditorState, convertToRaw, ContentBlock } from "draft-js";
import "draft-js/dist/Draft.css";
import { handleFileUpload } from "../helper";
import Media from "./ImageBlock";
import UpdateImage from "./UpdateImage";
const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorStateChangeHandler = (newEditorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();

    // 檢查是否有 atomic block 被刪除
    const currentBlocks = currentContent.getBlocksAsArray();
    const newBlocks = newContent.getBlocksAsArray();

    const hasAtomicBlock = (blocks: ContentBlock[]) => blocks.some(block => block.getType() === 'atomic');

    if (hasAtomicBlock(currentBlocks) && !hasAtomicBlock(newBlocks)) {
      // 如果 atomic block 被刪除，保留原狀態
      return;
    }
    setEditorState(newEditorState);
  };


  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  const imageUploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState(await handleFileUpload(editorState, event));
  };


  return (
    <div>
      <div className="border border-gray-300 p-2 min-h-[200px] cursor-text text-text-main"       >
        <Editor
          editorState={editorState}
          onChange={editorStateChangeHandler}
          blockRendererFn={blockRendererFn}
          placeholder="請於此編輯文章"
        />
      </div>
      <UpdateImage imageUploadHandler={imageUploadHandler} />
      <button  /**測試用按鈕 */
        onClick={() =>
          console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2))
        }
        className="mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                  transition-colors duration-200 flex items-center gap-2"
      >
        查看內容
      </button>
    </div>
  );
};

export default DraftEditor;
