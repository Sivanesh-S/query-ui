import {
  Table,
  Column,
  CellMeasurer,
  CellMeasurerCache,
  ColumnSizer,
} from "react-virtualized";
import "react-virtualized/styles.css";

// Sample data
const list = [
  { name: "John Doe", age: 30, email: "john.doe@example.com" },
  { name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
  // Add more sample data here...
];

// Create a cache for cell measurements
const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

function TableExample() {
  // Function to render table cell
  const renderCell = ({ columnIndex, key, parent, rowIndex, style }) => {
    const row = list[rowIndex];
    let content;
    switch (columnIndex) {
      case 0:
        content = row.name;
        break;
      case 1:
        content = row.age;
        break;
      case 2:
        content = row.email;
        break;
      default:
        content = "";
    }
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div style={{ ...style, whiteSpace: "nowrap" }}>{content}</div>
      </CellMeasurer>
    );
  };

  return (
    <Table
      width={300}
      height={300}
      rowCount={list.length}
      rowHeight={cache.rowHeight}
      rowGetter={({ index }) => list[index]}
      rowClassName={({ index }) => (index % 2 === 0 ? "evenRow" : "oddRow")}
      headerHeight={20}
    >
      <Column
        label="Name"
        dataKey="name"
        flexGrow={1}
        width={100} // Minimum width
        cellRenderer={renderCell}
      />
      <Column
        label="Age"
        dataKey="age"
        flexGrow={1}
        width={100} // Minimum width
        cellRenderer={renderCell}
      />
      <Column
        label="Email"
        dataKey="email"
        flexGrow={1}
        width={100} // Minimum width
        cellRenderer={renderCell}
      />
    </Table>
  );
}

export default TableExample;
