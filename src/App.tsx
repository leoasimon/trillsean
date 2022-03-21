import React from "react";
import "./App.less";
import AppRouter from "./AppRouter";
import AppLayout from "./ui/components/appLayout";

function App() {
  return (
    <div>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
