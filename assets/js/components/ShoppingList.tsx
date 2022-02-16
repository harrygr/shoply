import * as React from "react";
import { useListItemsQuery } from "../generated/graphql";
import { ItemInput } from "./ItemInput";
import { ItemListItem } from "./ItemListItem";

interface Props {}

export const ShoppingList: React.FC<Props> = ({}) => {
  // Let the URQL cache know that this query returns a list of `Item`s so that even when it's empty,
  // the creation of a new `Item` will reload the list
  const context = React.useMemo(() => ({ additionalTypenames: ["Item"] }), []);
  const [itemsResponse] = useListItemsQuery({ context });

  return (
    <div>
      {itemsResponse.data?.items ? (
        <ul className="space-y-1 mb-2">
          {itemsResponse.data?.items.map((item) => (
            <ItemListItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p>Loading</p>
      )}

      <ItemInput />
    </div>
  );
};
