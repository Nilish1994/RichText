import React, {
  useState,
  useEffect,
  ClipboardEvent,
  // useCallback,
  useRef,
} from "react";
import ReactQuill from "react-quill";
// import * as Quill from "quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

import "../../css/RichTextController.css";

// type FormatPainterProps = {
//   quill: typeof Quill;
// };

const RichTextEditor = ({ quill }: any, props: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const divRef = useRef(null);

  const preventSelection = (event: any) => {
    if (!event.shiftKey) {
      event.preventDefault();
    }
  }


  // useEffect(() => {
  //   const handleContextMenu = (e: any) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("selectstart", preventSelection);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("selectstart", preventSelection);
  //   };
  // }, []);

  useEffect(() => {
    if (divRef.current) {
      document.addEventListener("selectstart", preventSelection);
    }
    return () => {
      document.removeEventListener("selectstart", preventSelection);
    };
  }, []);

  // const handleFormatPainter = () => {
  //   const quill = quillRef.current?.getEditor();
  //   console.log("quillRef", quillRef);
  //   console.log("quill", quill);
  //   if (quill) {
  //     const selection = quill.getSelection();
  //     if (selection) {
  //       const format: any = quill.getFormat(selection);
  //       console.log("format", format);
  //       quill.clipboard.dangerouslyPasteHTML(selection.index, format, "silent");
  //     }
  //   }
  // };

  // const handleBeforeInput = (event: any, info: any) => {
  //   const selection = quillRef.current?.getEditor().getSelection();
  //   if (selection) {
  //     event.preventDefault();
  //   }
  // };

  function dragOver(ev: any) {
    ev.preventDefault();
  }

  function drop(ev: any) {
    ev.preventDefault();
    // const droppedItem = ev.dataTransfer.getData("drag-item");
    // if (droppedItem) {
    //   props.onItemDropped(droppedItem);
    // }
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
      // [{ script: "sub" }, { script: "super" }],
      // ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      // ["link", "image", "video"],
      // ["clean"],
    ],
    // dragAndDrop: false,
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
      {/* <button onClick={handleFormatPainter}>Format Painter</button> */}
    </>
  );
};

export default RichTextEditor;
