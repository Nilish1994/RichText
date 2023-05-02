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

// type FormatPainterProps = {
//   quill: typeof Quill;
// };

const RichTextEditor = ({ quill }: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // function handleDragOver(event: DragEvent) {
  //   event.preventDefault();
  // }

  // function handleDrop(event: DragEvent) {
  //   event.preventDefault();
  // }

  // useEffect(() => {
  //   const inputElement = document.getElementById(props.inputId);
  //   inputElement?.addEventListener('drop', handleDrop);
  //   inputElement?.addEventListener('dragover', handleDragOver);

  //   return () => {
  //     inputElement?.removeEventListener('drop', handleDrop);
  //     inputElement?.removeEventListener('dragover', handleDragOver);
  //   };
  // }, [props.inputId]);

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
  };

  return (
    <>
      <div>
        Description
        <div
          draggable={true}
          onCopy={(e: any) => preventCopyPaste(e)}
          onPaste={(e: any) => preventCopyPaste(e)}
          onCut={(e: any) => preventCopyPaste(e)}
          onDragStart={(e: any) => preventCopyPaste(e)}
          onDrop={(e: any) => preventCopyPaste(e)}
          onDragOver={(e: any) => preventCopyPaste(e)}
          onDragStartCapture={(e: any) => preventCopyPaste(e)}
          className={"ql-container"}
        >
          <ReactQuill modules={modules} onChange={setValue} ref={quillRef} />
        </div>
        {/* <button onClick={handleFormatPainter}>Format Painter</button> */}
      </div>
    </>
  );
};

export default RichTextEditor;
