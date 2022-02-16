import React from "react";
import ReactDOM from "react-dom";
import { EELogo } from "./components/EELogo";
import { ShoppingList } from "./components/ShoppingList";

const App = () => (
  <div className="container mx-auto py-8 px-6">
    <header className="mb-4 flex justify-between">
      <h1 className="text-3xl font-semibold">Shopping List</h1>
      <EELogo className="fill-blue-500 w-28" />
    </header>

    <ShoppingList />
  </div>
);

ReactDOM.render(<App />, document.getElementById("⚛️"));
