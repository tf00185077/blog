'use client';

import React, { useState } from "react";
// @ts-expect-error no declaration file
import { Editor, EditorState, convertToRaw, ContentBlock, DraftHandleValue, genKey, SelectionState, Modifier } from "draft-js";
import { List } from "immutable";
import "draft-js/dist/Draft.css";
import { handleFileUpload } from "../_helper";
import Media from "./ImageBlock";
import UpdateImage from "./UpdateImage";
const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleReturn = (_: React.KeyboardEvent, editorState: EditorState): DraftHandleValue => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();

    // 創建新的區塊映射
    const blockMap = content.getBlockMap();
    const newBlock = new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List(),
    });
    // 插入新區塊
    const newBlockMap = blockMap
      .toSeq()
      .takeUntil((_: unknown, k: string) => k === blockKey)
      .concat([[blockKey, content.getBlockForKey(blockKey)], [newBlock.getKey(), newBlock]])
      .concat(blockMap.toSeq().skipUntil((_: unknown, k: string) => k === blockKey).rest())
      .toOrderedMap();
    // 更新編輯器狀態
    const newSelection = SelectionState.createEmpty(newBlock.getKey());
    // 更新編輯器狀態
    const newContentState = content.merge({
      blockMap: newBlockMap,
      selectionAfter: newSelection,
    });
    // 使用 forceSelection 確保游標移動到新區塊
    const newEditorState = EditorState.forceSelection(
      EditorState.push(editorState, newContentState, 'split-block'),
      newSelection
    );
    setEditorState(newEditorState);
    return 'handled';
  };

  const editorStateChangeHandler = (newEditorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();
    
    const blockMap = currentContent.getBlockMap();
    const newBlockMap = newContent.getBlockMap();
    
    blockMap.forEach((block: ContentBlock, blockKey: string) => {
      if (!newBlockMap.has(blockKey) && block.getType() === "atomic") {
        const entityKey = block.getEntityAt(0);
        if (entityKey !== null) {
          // 找到前一個區塊
          const prevBlockKey = blockMap
            .reverse()
            .skipUntil((_: unknown, k: string) => k === blockKey)
            .skip(1)
            .first()
            ?.getKey();
           if (prevBlockKey) {
            const prevBlock = newBlockMap.get(prevBlockKey);
            if (prevBlock) {
              // 創建一個新的 selection 來刪除前一個區塊最後的空格
              const selection = SelectionState.createEmpty(prevBlockKey).merge({
                anchorOffset: prevBlock.getLength() - 1,
                focusOffset: prevBlock.getLength(),
              });
               // 刪除空格
              const contentWithoutSpace = Modifier.removeRange(
                newContent,
                selection,
                'backward'
              );
               // 更新編輯器狀態
              newEditorState = EditorState.push(
                newEditorState,
                contentWithoutSpace,
                'remove-range'
              );
            }
          }
        }
      }
    });
    
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
          handleReturn={handleReturn}
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
