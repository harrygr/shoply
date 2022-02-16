import * as React from "react";
import {
  Item,
  useDeleteItemMutation,
  useUpdateItemMutation,
} from "../generated/graphql";
import { TrashIcon } from "./TrashIcon";

interface Props {
  item: Pick<Item, "id" | "name" | "checkedAt">;
}

export const ItemListItem: React.FC<Props> = ({ item }) => {
  const [itemName, setItemName] = React.useState(item.name);
  const [itemCheckedAt, setItemCheckedAt] = React.useState(item.checkedAt);

  const [, updateItem] = useUpdateItemMutation();
  const [, deleteItem] = useDeleteItemMutation();

  const updateItemName = () => {
    updateItem({ id: item.id, input: { name: itemName } }).then((res) => {
      if (res.error) {
        // if there's an error revert the change
        setItemName(item.name);
      }
    });
  };

  const updateItemChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checkedAt = e.target.checked ? new Date().toISOString() : null;

    setItemCheckedAt(checkedAt);
    updateItem({ id: item.id, input: { checkedAt, name: itemName } }).then(
      (res) => {
        if (res.error) {
          // if there's an error revert the checked state
          setItemCheckedAt(item.checkedAt);
        }
      }
    );
  };

  const itemCheckedInputId = `item-checked-${item.id}`;
  const itemNameInputId = `item-name-${item.id}`;

  return (
    <li className="flex items-center">
      <div className="inline-flex w-4 h-4 mr-2 items-center justify-center">
        <label htmlFor={itemCheckedInputId} className="sr-only">
          Checked
        </label>
        <input
          id={itemCheckedInputId}
          type="checkbox"
          checked={!!itemCheckedAt}
          onChange={updateItemChecked}
          className="cursor-pointer w-auto"
        />
      </div>

      <label htmlFor={itemNameInputId} className="sr-only">
        Item name
      </label>
      <input
        id={itemNameInputId}
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        onBlur={updateItemName}
        className={`${!!itemCheckedAt ? "line-through" : ""} flex-grow mr-2`}
      />

      <button onClick={() => deleteItem({ id: item.id })} title="Delete item">
        <TrashIcon className="w-4 h-4 inline" />
      </button>
    </li>
  );
};
