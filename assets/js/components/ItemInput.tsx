import * as React from "react";

import { useCreateItemMutation } from "../generated/graphql";
import { PlusIcon } from "./PlusIcon";

interface Props {}

export const ItemInput: React.FC<Props> = ({}) => {
  const itemInput = React.useRef<null | HTMLInputElement>(null);
  const [, createItem] = useCreateItemMutation();
  const submitCreateItem: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (itemInput.current?.value) {
      await createItem({ input: { name: itemInput.current.value } });
      itemInput.current.value = "";
    }
  };

  return (
    <form onSubmit={submitCreateItem}>
      <PlusIcon className="w-4 h-4 inline-block mr-2" />
      <label htmlFor="new-item" className="sr-only">
        Add a new item
      </label>
      <input
        id="new-item"
        placeholder="Add a new item"
        type="text"
        name="name"
        ref={itemInput}
      />
    </form>
  );
};
