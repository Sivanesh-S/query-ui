import { useRef } from "react";
import style from "./QueryInput.module.css";
import mainStyle from "../style.module.css";
import { useState } from "react";

export function QueryInput() {
  // State
  const [code, setCode] = useState("");
  const [lineCount, setLineCount] = useState(1);

  // Refs
  const editorRef = useRef();
  const lineNumbersRef = useRef();

  // Handlers
  const handleCodeChange = (event) => {
    const value = event.target.value;
    const newLineCount = value.split("\n").length;

    setCode(value);

    if (newLineCount !== lineCount) {
      setLineCount(newLineCount);
    }
  };

  return (
    <div className={style.container}>
      <label htmlFor="query-editor" className={style.inputLabel}>
        <h2>SQL Query</h2>
      </label>
      <div className={style.codeEditor}>
        <div className={style.lineNumbers} ref={lineNumbersRef}>
          {new Array(lineCount).fill(0).map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <textarea
          id="query-editor"
          className={style.codeArea}
          rows="10"
          ref={editorRef}
          onChange={handleCodeChange}
          placeholder="Enter your SQL Query here"
          value={code}
        ></textarea>
      </div>
      <div className={style.actions}>
        <button className={`${mainStyle.button} ${mainStyle.primary}`}>
          Submit Query
        </button>
        <button className={mainStyle.button}>Clear</button>
      </div>
    </div>
  );
}
