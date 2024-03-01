import style from "./QueryHelper.module.css";

import databaseIcon from "../../assets/database-2-line.svg";
import informationIcon from "../../assets/information-line.svg";
import historyIcon from "../../assets/history-line.svg";

export function QueryHelper() {
  return (
    <div className={style.container}>
      <img src={databaseIcon} />
    </div>
  );
}
