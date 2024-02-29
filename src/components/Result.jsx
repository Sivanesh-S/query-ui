import employees from "../data/employees.json";

import style from "./style.module.css";

export function Result(props) {
  const { data = employees } = props;

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Extracting keys from the first object in the array
  const keys = Object.keys(data[0]);

  return (
    <div>
      <div className={style.resultHeader}>
        <h2>Results</h2>
        <div className={style.resultActions}>
          <button className={style.button}>Copy JSON</button>
          <button className={`${style.button} ${style.primary}`}>
            Download
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
