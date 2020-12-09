import React from "react";
import Button from "./components/button";

function App() {
    return (
        <div className="flex flex-row justify-center mt-4">
            <div className="flex flex-row justify-between w-2/3">
                <Button buttonText="Add Cash In ↓" />
                <Button buttonText="Add Cash Out ↑" variant="danger" />
            </div>
        </div>
    );
}

export default App;
