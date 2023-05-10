import React, { useState, useEffect, ClipboardEvent, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../css/RichTextController.css";

const RichTextEditor = ({ quill, context }: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  // Register the custom icons
  // const icons = Quill.import("ui/icons");
  // icons['bold'] = '<img src={require("../Assets/bold.png")} alt="Custom Icon" width="24" height="24" />'

  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handlePaste = async () => {
      try {
        const clipboardData = await navigator.clipboard.readText();
        // Process the clipboard text data
        const descriptionText = quillRef?.current?.editor?.getText();

        if (descriptionText) {
          if (clipboardData.includes(descriptionText)) {
            await navigator.clipboard.writeText(
              "Copying questions is not allowed on this webpage"
            );
          }
        }
      } catch (error) {
        console.error("Failed to read clipboard data:", error);
      }
    };

    document.addEventListener("copy", handlePaste);

    return () => {
      document.removeEventListener("copy", handlePaste);
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

  const preventCopyPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    // notification.error({ message: "Copying disabled" });
  };

  const handleChange = (html: any) => {
    console.log("html", html);
    setValue(html);
    context.getAttribute("gyde_description").setValue(html);
    console.log("CONTEXT =====>", context);
    console.log(
      "CONTEXT GET ATTRIBUTE =====>",
      context.getAttribute("gyde_description")
    );
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
        className="exclude-copy"
        onCopy={(e: any) => preventCopyPaste(e)}
        onCut={(e: any) => preventCopyPaste(e)}
        onDragOver={dragOver}
        onDrop={drop}
        onDragStart={dragStart}
      >
        <ReactQuill
          ref={quillRef}
          onChange={handleChange}
          value={value}
          modules={modules}
          bounds=".app"
          id={"rich_text_editor_element"}
        />
      </div>
    </>
  );
};

export default RichTextEditor;
