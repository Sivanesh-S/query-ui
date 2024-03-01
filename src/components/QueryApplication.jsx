import { useEffect, useState } from "react";
import { QueryHelper } from "./QueryHelper/QueryHelper";
import { QueryInput } from "./QueryInput/QueryInput";
import { Result } from "./Result";
import employees from "../data/employees.json";
import products from "../data/products.json";
import customers from "../data/customers.json";

import style from "./style.module.css";
import { CONSTANTS } from "../constants/constants";

const currentEntities = ["employee", "customer", "product"];
const dataMap = {
  employee: employees,
  customer: customers,
  product: products,
};

const getStoredHistory = () => {
  try {
    const storedHistoryString = localStorage.getItem("history");
    const storedHistory = JSON.parse(storedHistoryString);
    return storedHistory;
  } catch (err) {
    /* empty */
  }
  return false;
};

export function QueryApplication() {
  // State
  const [query, setQuery] = useState("");
  const [tableData, setTableData] = useState(null);
  const [history, setHistory] = useState(getStoredHistory() || []);

  // Effects
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Handlers
  const onClearQuery = () => {
    setQuery("");
    setTableData(null);
  };

  const addToHistory = () => {
    const newHistory = [query, ...history];
    if (history.length > CONSTANTS.HISTORY_LIMIT) {
      newHistory.pop();
    }

    setHistory(newHistory);
  };

  // Stub function that generates Query
  const submitQuery = (queryValue, isExecutedFromHistory = false) => {
    const currentEntity = currentEntities.find((entity) =>
      queryValue.toLowerCase().includes(entity)
    );

    if (currentEntity) {
      const data = dataMap[currentEntity];
      setTableData(data);
    } else {
      setTableData(null);
    }

    if (!isExecutedFromHistory) {
      addToHistory();
    }
  };
  const onSubmit = () => {
    submitQuery(query);
  };

  const selectQuery = (index) => {
    const selectedQuery = history[index];
    setQuery(selectedQuery);
    submitQuery(selectedQuery, true);
  };

  const clearHistory = () => setHistory([]);

  const deleteHistory = (index) => {
    setHistory((pre) => {
      const newArr = [...pre.slice(0, index), ...pre.slice(index + 1)];
      console.info(
        "newArr: ",
        pre.slice(0, index),
        pre.slice(index + 1),
        index
      );
      return newArr;
    });
  };

  const onCopy = () => {};
  const onDownload = () => {};

  return (
    <div className={style.container}>
      <h1 className={style.appHeader}>Query Application</h1>
      <p className={style.appDescription}>
        It is just a mock flow. We have only three tables with data. Use the
        string <code>employee</code>, <code>product</code> or{" "}
        <code>customer</code> in the query.
      </p>
      <div className={style.mainSection}>
        <QueryInput
          value={query}
          onChange={setQuery}
          onClear={onClearQuery}
          onSubmit={onSubmit}
        />
        <QueryHelper
          history={history}
          selectQuery={selectQuery}
          clearHistory={clearHistory}
          deleteHistory={deleteHistory}
        />
      </div>
      <Result data={tableData} onCopy={onCopy} onDownload={onDownload} />
    </div>
  );
}
