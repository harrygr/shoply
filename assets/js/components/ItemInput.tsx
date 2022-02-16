import * as React from "react";

import { useCreateItemMutation } from "../generated/graphql";
import { PlusIcon } from "./PlusIcon";

export const ItemInput: React.FC = () => {
  const itemInput = React.useRef<null | HTMLInputElement>(null);
  const [{ fetching }, createItem] = useCreateItemMutation();
  const submitCreateItem: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (itemInput.current?.value) {
      await createItem({ input: { name: itemInput.current.value } });
      // reset the input value
      itemInput.current.value = "";
      return;
    }
  };

  return (
    <form onSubmit={submitCreateItem} className="flex items-center">
      <PlusIcon className="w-4 h-4 inline-block mr-2" />
      <label htmlFor="new-item" className="sr-only">
        Add a new item
      </label>
      <input
        disabled={fetching}
        id="new-item"
        placeholder="Add a new item"
        type="text"
        name="name"
        ref={itemInput}
        className="flex-grow"
      />
    </form>
  );
};
