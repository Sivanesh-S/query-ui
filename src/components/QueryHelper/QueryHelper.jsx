import style from "./QueryHelper.module.css";

import DatabaseIcon from "../../assets/database-2-line.svg?react";
import InformationIcon from "../../assets/information-line.svg?react";
import HistoryIcon from "../../assets/history-line.svg?react";
import { useState } from "react";
import { History } from "./History";

const menuItems = [
  { name: "Info", Icon: InformationIcon },
  { name: "History", Icon: HistoryIcon },
  { name: "Database", Icon: DatabaseIcon },
];

export function QueryHelper(props) {
  const { history, clearHistory, deleteHistory, selectQuery } = props;

  // State
  const [activeMenu, setActiveMenu] = useState("History");

  // Handlers
  const onOptionClick = (option) => () => {
    setActiveMenu(option);
  };

  // Render function
  const renderContents = () => {
    switch (activeMenu) {
      case "History": {
        return (
          <History
            history={history}
            selectQuery={selectQuery}
            clearHistory={clearHistory}
            deleteHistory={deleteHistory}
          />
        );
      }
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
