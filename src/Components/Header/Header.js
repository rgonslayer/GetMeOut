import { useEffect, useState } from "react";
import Box from "../Box";

function Header(props) {
  const { tasks } = props;
  return (
    <header>
      <h1>GetMeOut!</h1>
      <div >
        <OverviewBox tasks={tasks} />
      </div>
    </header>
  );
}

function OverviewBox(props) {
  // This is passed all the way down from App
  const { tasks } = props;

  const [name, setName] = useState("Loading name...");

  // We do not need to use useState here, because we do not need to keep
  // a state of the task list length. This is purely a simple calculation
  // done on the passed prop.
  const taskListLength = tasks.filter((task) => !task.isComplete).length;

  // This effect runs on component mount, so that it will fetch data from
  // localStorage when it is loaded.
  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    // The ?? operator is called the nullish-coalescing operator
    // It sets the LHS of the operator, i.e. savedName, if LHS is not null
    // It sets the RHS of the operator, i.e. "John Doe", if LHS is null
    setName(savedName ?? "Jiayong");
  }, []);

  return (
    <Box>
      <h2>Overview</h2>
      <p>
        Welcome back,{" "}
        <strong
          role="button"
          onClick={() => {
            const newName = prompt("What is your name?", name);
            setName(newName);
            window.localStorage.setItem("name", newName);
          }}
        >
          {name || "<set a name>"}
        </strong>
        !
      </p>
      <p>
        You have{" "}
        <strong>
          {taskListLength} item{taskListLength === 1 ? "" : "s"}
        </strong>{" "}
        that {taskListLength === 1 ? "is" : "are"} not packed.
      </p>
    </Box>
  );
}


export default Header;
