import {
  AutoSizer,
  Column,
  Table,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import style from "./style.module.css";
import "react-virtualized/styles.css";

// Create a cache for cell measurements
const cache = new CellMeasurerCache({
  defaultHeight: 50,

  fixedWidth: true,
});

export function Result(props) {
  const { data, onCopy, onDownload } = props;

  if (!data || data.length === 0) {
    return (
      <div>
        <h2>Results</h2>
        <p className={style.contentMessage}>No data available</p>
      </div>
    );
  }

  // Extracting keys from the first object in the array
  const keys = Object.keys(data[0]);

  const renderCell = ({ columnIndex, dataKey, parent, rowIndex, style }) => {
    const row = data[rowIndex];
    const content = row[dataKey];

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div style={style}>{content}</div>
      </CellMeasurer>
    );
  };

  return (
    <div>
      <div className={style.resultHeader}>
        <h2>Results</h2>
        <div className={style.resultActions}>
          <button className={style.button} onClick={onCopy}>
            Copy JSON
          </button>
          <button
            className={`${style.button} ${style.primary}`}
            onClick={onDownload}
          >
            Download
          </button>
        </div>
      </div>
      <div style={{ height: "90vh" }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={40}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              rowClassName={({ index }) => (index % 2 ? style.evenRow : "")}
            >
              {keys.map((key) => (
                <Column
                  key={key}
                  label={key}
                  dataKey={key}
                  width={200}
                  flexGrow={1}
                  cellRenderer={renderCell}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
