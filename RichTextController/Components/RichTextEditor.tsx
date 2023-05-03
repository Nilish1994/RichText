import React, {
  useState,
  useEffect,
  ClipboardEvent,
  useRef,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    alert("Copying and pasting is not allowed!");
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
        onPaste={(e: any) => preventCopyPaste(e)}
        onCut={(e: any) => preventCopyPaste(e)}
        onDragOver={dragOver}
        onDrop={drop}
      >
        <ReactQuill modules={modules} onChange={setValue} ref={quillRef} />
      </div>
    </>
  );
};

export default RichTextEditor;
