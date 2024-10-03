import { useState } from "react";
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (items: string) => void;
}
function ListGroup({ items, heading , onSelectItem}: Props) {
  //   let selectedIndex = 0;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>Items not found</p>}
      <ul className="list-group">
        {items.map((items, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(items)
            }}
          >
            {items}
          </li>
        ))}
      </ul>
    </>
  );
  9;
}

export default ListGroup;
