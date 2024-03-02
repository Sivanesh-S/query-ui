import style from "./QueryHelper.module.css";

import DatabaseIcon from "../../assets/database-2-line.svg?react";
import InformationIcon from "../../assets/information-line.svg?react";
import HistoryIcon from "../../assets/history-line.svg?react";
import SaveIcon from "../../assets/save.svg?react";
import { useState } from "react";
import { QueryList } from "./QueryList";
import { Database } from "./Database";

const menuItems = [
  // { name: "Info", Icon: InformationIcon },
  { name: "History", Icon: HistoryIcon },
  { name: "Saved Queries", Icon: SaveIcon },
  { name: "Database", Icon: DatabaseIcon },
];

export function QueryHelper(props) {
  const {
    history,
    clearHistory,
    deleteHistory,
    selectQuery,
    saved,
    selectSaved,
    clearSaved,
    deleteSaved,
    dataMap,
  } = props;

  // State
  const [activeMenu, setActiveMenu] = useState("History");

  // Handlers

  const updateActiveMenu = (option) => {
    setActiveMenu(option);
  };

  const onOptionClick = (option) => () => setActiveMenu(option);

  // Render function
  const renderContents = () => {
    switch (activeMenu) {
      case "History":
        return (
          <QueryList
            queries={history}
            selectQuery={selectQuery}
            deleteAll={clearHistory}
            deleteItem={deleteHistory}
            description={`Here's the history of the queries. (Saved last 30 queries)`}
            deleteAllText={`Clear History`}
            emptyText={
              <>
                <b>Your history is empty.</b> Submitting queries will be
                displayed here.
              </>
            }
          />
        );

      case "Saved Queries":
        return (
          <QueryList
            queries={saved}
            selectQuery={selectSaved}
            deleteAll={clearSaved}
            deleteItem={deleteSaved}
            description={`Here are your saved queries.`}
            deleteAllText={`Clear Saved Queries`}
            emptyText={
              <>
                <b>Your Saved queries are empty.</b> Click on the
                <b>&quot;Save Queries&quot;</b> button to save a query.
              </>
            }
          />
        );
      case "Database":
        return <Database dataMap={dataMap} />;
    }
  };

  const handleKeyPress = (option) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      updateActiveMenu(option);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.menuContainer}>
        {menuItems.map((item) => {
          const { Icon, name } = item;

          return (
            <div
              key={name}
              className={`${style.menu} ${
                activeMenu === name ? style.menuActive : ""
              }`}
              onClick={onOptionClick(name)}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyPress(name)}
            >
              <Icon key={name} className={style.menuIcon} />
              <span>{name}</span>
            </div>
          );
        })}
      </div>
      <div>{renderContents()}</div>
    </div>
  );
}
