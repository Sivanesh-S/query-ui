import style from "./QueryHelper.module.css";
import commonStyle from "../style.module.css";

export function QueryList(props) {
  const {
    queries,
    deleteAll,
    selectQuery,
    deleteItem,
    description,
    deleteAllText,
    emptyText,
  } = props;

  return (
    <div>
      <header className={style.helperHeader}>
        <p>{description}</p>
        {!!queries.length && (
          <button className={commonStyle.button} onClick={deleteAll}>
            {deleteAllText}
          </button>
        )}
      </header>
      <main>
        {queries.length === 0 ? (
          <div className={style.contentMessage}>{emptyText}</div>
        ) : (
          <div>
            {queries.map((query, index) => (
              <div key={`${index}-${query}`} className={style.queryContainer}>
                <pre onClick={() => selectQuery(index)}>{query}</pre>
                <button
                  className={style.codeButton}
                  onClick={() => deleteItem(index)}
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
