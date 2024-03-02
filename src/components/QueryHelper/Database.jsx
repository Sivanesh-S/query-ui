import style from "./QueryHelper.module.css";
import DatabaseIcon from "../../assets/database-2-fill.svg?react";
import { useState } from "react";

export function Database(props) {
  const { dataMap } = props;

  // State
  const [activeEntity, setActiveEntity] = useState(null);

  return (
    <div>
      <header className={style.helperHeader}>
        <p>Know more about your data.</p>
      </header>
      <main className={style.databaseContent}>
        <div className={style.databases}>
          {Object.keys(dataMap).map((entity) => (
            <button
              className={`${style.entity} ${
                activeEntity === entity ? style.entityActive : ""
              }`}
              key={entity}
              onClick={() => setActiveEntity(entity)}
              role="button"
            >
              <DatabaseIcon className={style.entityIcon} />
              <span>{entity}</span>
            </button>
          ))}
        </div>
        {activeEntity ? (
          <div className={style.keys}>
            {Object.keys(dataMap[activeEntity][0]).map((key) => (
              <div key={key} className={style.column}>
                <b>{key}</b>: {typeof dataMap[activeEntity][0][key]}
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
