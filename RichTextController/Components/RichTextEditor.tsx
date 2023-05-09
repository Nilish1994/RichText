import React, { useState, useEffect, ClipboardEvent, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, notification } from "antd";

import "../css/RichTextController.css";

const RichTextEditor = ({ quill }: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  // const divRef = useRef(null);

  // // Register the custom icons
  // const icons = Quill.import("ui/icons");
  // // const twitter = require("../Assets/vv.png");
  // icons['bold'] = '<img src={require("./custom-icon.png")} alt="Custom Icon" width="24" height="24" />'

  // useEffect(() => {
  //   document.onkeydown = function (event: any) {
  //     const clipboardData = event.clipboardData;
  //     if (clipboardData) {
  //       const text = clipboardData.getData("text/plain");
  //       // Process the clipboard text data
  //       console.log("Clipboard text:", text);
  //       // if (event.ctrlKey && event.keyCode == 65) {
  //       //   event.preventDefault();
  //       //   return false;
  //       // }
  //     }
  //   };

  //   const handleContextMenu = (e: any) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  function dragOver(ev: any) {
    ev.preventDefault();
  }

  function drop(ev: any) {
    ev.preventDefault();
  }

  function dragStart(ev: any) {
    ev.preventDefault();
  }

  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    notification.error({ message: "Copying disabled" });
  };

  const handleChange = (html: any) => {
    setValue(html);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    clipboard: { matchVisual: false },
  };

  return (
    <>
      <div
        // ref={divRef}
        onCopy={(e: any) => preventCopyPaste(e)}
        onCut={(e: any) => preventCopyPaste(e)}
        onDragOver={dragOver}
        onDrop={drop}
        onDragStart={dragStart}
        id={"rich_text_editor_element"}
      >
        <ReactQuill
          ref={quillRef}
          onChange={handleChange}
          value={value}
          modules={modules}
          bounds=".app"
        />
      </div>
    </>
  );
};

export default RichTextEditor;
