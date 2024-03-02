import { useRef } from "react";
import style from "./QueryInput.module.css";
import mainStyle from "../style.module.css";
import { useState } from "react";

export function QueryInput(props) {
  const { value, onChange, onClear, onSubmit, onSave } = props;

  // State
  const [lineCount, setLineCount] = useState(1);

  // Refs
  const editorRef = useRef();
  const lineNumbersRef = useRef();

  // Handlers
  const handleCodeChange = (event) => {
    const value = event.target.value;
    const newLineCount = value.split("\n").length;

    onChange(value);

    if (newLineCount !== lineCount) {
      setLineCount(newLineCount);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <label htmlFor="query-editor" className={style.inputLabel}>
          <h2>SQL Query</h2>
        </label>
        <button className={mainStyle.button} onClick={onSave} disabled={!value}>
          Save Query
        </button>
      </div>
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
          value={value}
        ></textarea>
      </div>
      <div className={style.actions}>
        <button
          className={`${mainStyle.button} ${mainStyle.primary}`}
          onClick={onSubmit}
          disabled={!value}
        >
          Submit Query
        </button>

        <button
          className={mainStyle.button}
          onClick={onClear}
          disabled={!value}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
