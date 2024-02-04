import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import "./TextEditor.css";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const content = event.target.result;
      setText(content);
      setFileName(acceptedFiles[0].name);
    };
    fileReader.readAsText(acceptedFiles[0]);
  };

  const onSaveClick = () => {
    saveTextToFile(text, `text_file_${Date.now}.txt`);
  };

  const saveTextToFile = (content) => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(2, 14); // Format date as "YYYYMMDDHHmmss"
    const fileName = `text_file_${formattedDate}.txt`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "text/plain",
  });

  return (
    <div className="text-editor">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div>
          <p>Drag 'n' drop a text file here, or click to select one</p>
        </div>
      </div>
      {fileName && <p className="file-name">File Name: {fileName}</p>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      ></textarea>
      <button className="button" onClick={onSaveClick}>
        Upload
      </button>
    </div>
  );
};

export default TextEditor;
