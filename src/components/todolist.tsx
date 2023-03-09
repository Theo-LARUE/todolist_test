import React, { useState } from "react";
import "../styles/todolist.css";

interface Task {
  id: number;
  text: string;
  validated: boolean;
}

const TodoList: React.FC = () => {
  const [item, setItem] = useState<Task[]>([]);
  const [ItemInput, setItemInput] = useState("");
  const [editItemInput, setEditItemInput] = useState("");
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [sortAscending, setSortAscending] = useState(true);

  const keyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addElement(ItemInput);
    }
  };

  const addElement = (text: string) => {
    if (text === null || text === "") {
      return;
    }
    // setItem([...item, { id: item.length + 1, text }]);
    setItem([{ id: item.length + 1, text, validated: false }, ...item]);
    setItemInput("");
  };

  const updateElement = (id: number, text: string) => {
    setItem(
      item.map((task) => {
        if (task.id === id) {
          return { ...task, text };
        }
        return task;
      })
    );
    setEditItemId(null);
    setEditItemInput("");
  };

  const startEditElement = (task: Task) => {
    setEditItemId(task.id);
    setEditItemInput(task.text);
  };

  const deleteElement = (id: number) => {
    setItem(item.filter((task) => task.id !== id));
  };

  const sortElement = () => {
    setSortAscending(!sortAscending);
    setItem([
      ...item.sort((a, b) => (sortAscending ? b.id - a.id : a.id - b.id)),
    ]);
  };

  const isValidated = (id: number) => {
    setItem(
      item.map((task) => {
        if (task.id === id) {
          return { ...task, validated: !task.validated };
        }
        return task;
      })
    );
  };

  return (
    <div>
      <div className="blockInput">
        <input
          type="text"
          value={ItemInput}
          onChange={(e) => setItemInput(e.target.value)}
          onKeyUp={(e) => keyPressInput(e)}
        />
        <button onClick={() => addElement(ItemInput)}>Ajouter une tâche</button>
        <button onClick={sortElement}>Trier</button>
      </div>
      <ul className="listItem">
        {item.map((task) => (
          <li
            key={task.id}
            className={`listItemElement ${task.validated ? "validated" : ""}`}
          >
            {task.id === editItemId ? (
              <>
                <input
                  type="text"
                  value={editItemInput}
                  onChange={(e) => setEditItemInput(e.target.value)}
                  onKeyUp={(e) => keyPressInput(e)}
                />
                <button onClick={() => updateElement(task.id, editItemInput)}>
                  Submit
                </button>
              </>
            ) : (
              <>
                <p>
                  Tâche n° {task.id} : {task.text}
                </p>
                <button onClick={() => startEditElement(task)}>Éditer</button>
                <button onClick={() => deleteElement(task.id)}>&#x274C;</button>
                <button onClick={() => isValidated(task.id)}>&#10003;</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
