import React, {
  useState,
  useEffect,
  ClipboardEvent,
  useRef,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { notification } from "antd";

import "../css/RichTextController.css";

const RichTextEditor = ({ quill }: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const divRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  function dragOver(ev: any) {
    ev.preventDefault();
  }

  function drop(ev: any) {
    ev.preventDefault();
  }

  function dragStart(ev: any) {
    ev.preventDefault();
  }

  // function onKeyDown(ev: any) {
  //   if(ev.ctrlKey && ev.keyCode == 65)
  //   console.log("test", ev.ctrlKey);
  //   console.log("2222222222", ev.keyCode );
  //   ev.preventDefault();
  //   return false;
  // }

  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    notification.error({ message: "Copying disabled" });
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

  return (
    <>
      <div
        ref={divRef}
        onCopy={(e: any) => preventCopyPaste(e)}
        onCut={(e: any) => preventCopyPaste(e)}
        onDragOver={dragOver}
        onDrop={drop}
        onDragStart={dragStart}
        // onKeyDown={onKeyDown}
      >
        <ReactQuill modules={modules} onChange={setValue} ref={quillRef} />
      </div>
    </>
  );
};

export default RichTextEditor;
