import { QueryHelper } from "./QueryHelper/QueryHelper";
import { QueryInput } from "./QueryInput/QueryInput";
import { Result } from "./Result";
import style from "./style.module.css";

export function QueryApplication() {
  return (
    <div className={style.container}>
      <h1 className={style.appHeader}>Query Application</h1>
      <div className={style.mainSection}>
        <QueryInput />
        <QueryHelper />
      </div>
      <Result />
    </div>
  );
}
