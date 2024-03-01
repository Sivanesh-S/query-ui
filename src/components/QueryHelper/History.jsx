import style from "./QueryHelper.module.css";
import commonStyle from "../style.module.css";

export function History(props) {
  const { history, clearHistory, selectQuery, deleteHistory } = props;

  return (
    <div>
      <header className={style.helperHeader}>
        <p>Here&apos;s the history of the queries. (Saved last 30 queries)</p>
        {!!history.length && (
          <button className={commonStyle.button} onClick={clearHistory}>
            Clear History
          </button>
        )}
      </header>
      <main>
        {history.length === 0 ? (
          <div className={style.contentMessage}>
            <b>Your history is empty.</b> Submitting queries will be displayed
            here.
          </div>
        ) : (
          <div>
            {history.map((query, index) => (
              <div key={`${index}-${query}`} className={style.queryContainer}>
                <pre onClick={() => selectQuery(index)}>{query}</pre>
                <button
                  className={style.codeButton}
                  onClick={() => deleteHistory(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
