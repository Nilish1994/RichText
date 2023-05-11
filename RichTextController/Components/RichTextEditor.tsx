import React, { useState, useEffect, ClipboardEvent, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../css/RichTextController.css";
declare global {
  interface Window {
    Xrm: any;
  }
}

declare const navigator: any;

const RichTextEditor = ({ quill, context }: any) => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  // useEffect(() => {
  //   const content = window.parent.Xrm.Page.getAttribute("gyde_description").getValue();
  //   console.log('Content ====> ', content);
  //   setValue(content);
  //   // console.log("ppy =====>", pp);
  // }, []);

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
    const handlePaste = async (event: any) => {
      type PermissionName = "geolocation" | "notifications" | "persistent-storage" | "push" | "screen-wake-lock" | "xr-spatial-tracking";
      type  MyPermissionName = PermissionName | 'clipboard-read' | 'clipboard-write';
      try {
        const permision: MyPermissionName = "clipboard-read";
        console.log('chrome ======> ', navigator.userAgent);
        
        if (navigator.userAgent.includes("Safari/") && !(navigator.userAgent.includes("Chrome/") || navigator.userAgent.includes("Edge/"))) {
          event.preventDefault();
          await navigator.clipboard.writeText(
            "Permissions API not supported"
          );
          await navigator.clipboard.writeText("");
        } else if (navigator.userAgent.includes("Firefox/")) {
          await navigator.clipboard.writeText(
            "Permissions API not supported"
          );
        } else if (navigator?.permissions) {          
          // const permissionName = "clipboard-read" as PermissionName;
          const permissionStatus = await navigator.permissions.query({name: permision as PermissionName, allowWithoutGesture: false}); // allowWithoutGesture: false
          console.log('permissionStatus =================> ', permissionStatus);
          
          if (permissionStatus.state === "granted") { // || permissionStatus.state === "prompt"
            const clipboardData = await navigator.clipboard.readText();
            console.log('clipboardData =====> ', clipboardData);
            
            const descriptionText = quillRef?.current?.editor?.getText();

            console.log("descriptionText ======> ", descriptionText);
            

            if (descriptionText) {
              console.log('condition ====> ', clipboardData.includes(descriptionText));
              
              if (clipboardData.includes(descriptionText)) {
                await navigator.clipboard.writeText(
                  "Copying questions is not allowed on this webpage"
                );
              }
            }
          } 
          // else if (permissionStatus.state === "prompt" && navigator.permissions.request) {
          //   const permissionResult = await navigator.permissions.request({
          //     name: permision as PermissionName
          //   });
            
          //   if (permissionResult.state === "granted") {
          //     const clipboardData = await navigator.clipboard.readText();
          //     console.log('clipboardData =====> ', clipboardData);
              
          //     const descriptionText = quillRef?.current?.editor?.getText();

          //     console.log("descriptionText ======> ", descriptionText);
              
          //     if (descriptionText) {
          //       console.log('condition ====> ', clipboardData.includes(descriptionText));
                
          //       if (clipboardData.includes(descriptionText)) {
          //         await navigator.clipboard.writeText(
          //           "Copying questions is not allowed on this webpage"
          //         );
          //       }
          //     }
          //   } else {
          //     console.log("Clipboard read permission denied.");
          //   }
          // } 
          else {
            await navigator.clipboard.writeText(
              "You need to grant permision to copy on this webpage"
            );
          }
        } else {
          await navigator.clipboard.writeText(
            "Permissions API not supported"
          );
        }
      } catch (error) {
        console.error(error);
          await navigator.clipboard.writeText(
          "Copying questions is not allowed on this webpage"
        );
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
    window.parent.Xrm.Page.getAttribute("gyde_description").setValue(html);
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
