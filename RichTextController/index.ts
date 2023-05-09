import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

export class RichTextController
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private container: HTMLDivElement;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    // Save the container element for later use
    this.container = container;

    // ...
  }

  const handlePaste = (event: ClipboardEvent) => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const text = clipboardData.getData("text/plain");
      // Process the clipboard text data
      console.log("Clipboard text:", text);
    }
  };


  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Render the React component using ReactDOM.render
    ReactDOM.render(React.createElement(App), this.container);
  }

  // public getOutputs(): IOutputs
  // {
  //     return {};
  // }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
