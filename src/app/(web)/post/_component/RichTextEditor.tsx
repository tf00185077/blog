'use client';

import React, { useState } from "react";
// @ts-expect-error no declaration file
import { Editor, EditorState, convertToRaw, ContentBlock, DraftHandleValue, genKey, SelectionState, Modifier } from "draft-js";
import { List } from "immutable";
import "draft-js/dist/Draft.css";
import { handleFileUpload } from "../_helper";
import Media from "./ImageBlock";
import UpdateImage from "./UpdateImage";
import { post as savePost } from "@/lib/service/post";
import { Stack, Box, Button, Input } from "@chakra-ui/react";
import TagSelector from "./TagSelectot";
const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [post, setPost] = useState({
    title: '',
    subtitle: '',
    tag: ''
  });
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

  const prepareContentForSave = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());

    const formData = new FormData();
    for (const key in rawContent.entityMap) {
      const entity = rawContent.entityMap[key];
      if (entity.type === 'IMAGE') {
        const file = entity.data.originalFile;
        formData.append('images', file);
        entity.data.tempKey = key;
      }
    }
    formData.append('content', JSON.stringify(rawContent));
    formData.append('title', post.title);
    formData.append('tag', post.tag);
    formData.append('subtitle', post.subtitle);
    const response = await savePost(formData);

    if (response.status === 'success') {
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <Box bg="transparent" spaceY="4">
      <Input placeholder="請輸入文章標題" borderColor="gray.300" onChange={(e) => setPost({ ...post, title: e.target.value })} />
      <Input placeholder="請輸入副標題" borderColor="gray.300" onChange={(e) => setPost({ ...post, subtitle: e.target.value })} />
      <TagSelector onChange={(e) => setPost({ ...post, tag: e.target.value })} />
      <Stack border="1px solid" borderColor="gray.300" p="2" minH="200px" cursor="text" color="text.main">
        <Editor
          editorState={editorState}
          onChange={editorStateChangeHandler}
          handleReturn={handleReturn}
          blockRendererFn={blockRendererFn}
          placeholder="請於此編輯文章"
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <UpdateImage imageUploadHandler={imageUploadHandler} />
        <Button onClick={prepareContentForSave} mt="2" colorScheme="blue">
          儲存文章
        </Button>
      </Stack>
    </Box>
  );
};

export default DraftEditor;
