import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import "./TextEditor.css";

const TextEditor = () => {
  // State to manage the text content and file name
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = (acceptedFiles) => {
    //FileReader to read the content of the dropped file
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const content = event.target.result;
      setText(content);
      setFileName(acceptedFiles[0].name);
    };
    fileReader.readAsText(acceptedFiles[0]);
  };

  const onSaveClick = () => {
    // Use the file-saver library to trigger a file save dialog
    saveAs(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
      generateFileName()
    );
    setText("");
    setFileName("");
  };

  const generateFileName = () => {
    // Format the date using date-fns
    const formattedDate = format(new Date(), "yyMMddHHmmss");
    return `text_file_${formattedDate}.txt`;
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
