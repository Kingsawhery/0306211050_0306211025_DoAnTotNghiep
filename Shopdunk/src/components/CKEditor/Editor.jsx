import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import { toolbarOptions, formats } from "./ToolBarOptions";
import { uploadToCloudinary } from "./UploadFile";
import "./Editor.css";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, setValue }) => {
  //   const checkImageFileExist = (imageName) =>{
  //     const result = imageName.indexOf(imageFileName);
  //     if(result < 0){
  //       return {
  //         index: result,
  //         result:true
  //       }
  //     }else{
  //       return {
  //         index: result,
  //         result:false
  //       }
  //     }
  // }
  var imageHandler = useCallback(async () => {
    imageRef.current.click();
    imageRef.current.onchange = async () => {
      if (imageRef.current.files !== null) {
        const file = imageRef.current.files[0];
        const upload = await uploadToCloudinary(file);
        if (upload) {
          const quill = reactQuillRef.current;
          if (quill) {
            const range = quill.getEditorSelection();
            console.log(range.index);
            range &&
              quill.getEditor().insertEmbed(range.index, "image", upload);
          }
        }
      }
    };
  }, []);
  const module = {
    toolbar: {
      container: toolbarOptions,
      handlers: { image: imageHandler },
    },
  };
  const imageRef = useRef();
  const reactQuillRef = useRef();
  return (
    <>
      <input
        ref={imageRef}
        className="react-quill-image d-none"
        multiple
        type="file"
      />
      <ReactQuill
        ref={reactQuillRef}
        modules={module}
        theme="snow"
        value={value}
        formats={formats}
        onChange={(delta) => {
          setValue(delta);
        }}
      />
    </>
  );
};
export default Editor;
