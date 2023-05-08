import React, { useState, useEffect, ClipboardEvent, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, notification } from "antd";

import "../css/RichTextController.css";

const RichTextEditor = ({ quill }: any) => {
  const [value, setValue] = useState("");
  const [isDisabled, isSetDisabled] = useState(true);
  const quillRef = useRef<ReactQuill>(null);
  // const divRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleSelectStart = (e: any) => {
      e.preventDefault();
    };
    if (isDisabled) {
      document.addEventListener("selectstart", handleSelectStart);

      return () => {
        document.removeEventListener("selectstart", handleSelectStart);
      };
    }
  }, [isDisabled]);

  // const preventTextSelection = () => {
  //   if (isDisabled) {
  //     document.addEventListener("selectstart", (e: any) => {
  //       e.preventDefault();
  //     });
  //   }
  // };

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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    clipboard: { matchVisual: false },
  };

  const OnClickDisable = () => {
    if (isDisabled) {
      isSetDisabled(false);
    } else {
      isSetDisabled(true);
    }
  };

  const formats = [
    "font",
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
  ];

  return (
    <>
      <div
        // ref={divRef}
        onCopy={(e: any) => preventCopyPaste(e)}
        onCut={(e: any) => preventCopyPaste(e)}
        onDragOver={dragOver}
        onDrop={drop}
        onDragStart={dragStart}
      >
        {/* <ReactQuill modules={modules} onChange={setValue} ref={quillRef} /> */}
        <ReactQuill
          ref={quillRef}
          onChange={handleChange}
          value={value}
          modules={modules}
          formats={formats}
          onChangeSelection={(r, v, s) => {
            console.log("R", r, v, s);
          }}
          bounds=".app"
          readOnly={isDisabled}
        />
        <Button onClick={OnClickDisable}>Edit</Button>
      </div>
    </>
  );
};

export default RichTextEditor;
