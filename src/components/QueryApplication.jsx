import { useState } from "react";
import { QueryHelper } from "./QueryHelper/QueryHelper";
import { QueryInput } from "./QueryInput/QueryInput";
import { Result } from "./Result";
import employees from "../data/employees.json";
import products from "../data/products.json";
import customers from "../data/customers.json";

import style from "./style.module.css";

const currentEntities = ["employee", "customer", "product"];
const dataMap = {
  employee: employees,
  customer: customers,
  product: products,
};

export function QueryApplication() {
  // State
  const [query, setQuery] = useState("");
  const [tableData, setTableData] = useState(null);

  // Handlers
  const onClearQuery = () => {
    setQuery("");
    setTableData(null);
  };

  // Stub function that generates Query
  const onSubmit = () => {
    const currentEntity = currentEntities.find((entity) =>
      query.toLowerCase().includes(entity)
    );

    if (currentEntity) {
      const data = dataMap[currentEntity];
      setTableData(data);
    }
  };

  const onCopy = () => {};
  const onDownload = () => {};

  return (
    <div className={style.container}>
      <h1 className={style.appHeader}>Query Application</h1>
      <p className={style.appDescription}>
        It is just a mock flow. We have only three tables with data. Use the
        string <code>employee</code>, <code>product</code> or{" "}
        <code>customer</code>
      </p>
      <div className={style.mainSection}>
        <QueryInput
          value={query}
          onChange={setQuery}
          onClear={onClearQuery}
          onSubmit={onSubmit}
        />
        <QueryHelper />
      </div>
      <Result data={tableData} onCopy={onCopy} onDownload={onDownload} />
    </div>
  );
}
