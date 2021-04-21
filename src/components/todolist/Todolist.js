import React, { useState, useCallback, useEffect } from "react";
import AdedToDo from "./addedToDo/AddedToDo";
import "./Todolist.css";

export default function Todolist() {
  const [arrTodo, setArrtodo] = useState([]);
  const [newTodo, setnewTodo] = useState("");
  const [filter, setFilter] = useState("");
  const handleDelete = useCallback(
    (id) => {
      return setArrtodo(arrTodo.filter((item) => item.index !== id));
    },
    [arrTodo]
  );
  const handleCheck = useCallback(
    (id) => {
      return setArrtodo(
        arrTodo.map((item) => {
          console.log(item);
          if (item.index === id) {
            return { ...item, checked: !item.checked };
          }
          return item;
        })
      );
    },
    [arrTodo]
  );

  let pressEnter = (e) => {
    console.log(e.target.value);
    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      e.target.value !== ""
    ) {
      setArrtodo([
        ...arrTodo,
        {
          value: newTodo,
          checked: false,
          index: Date.now(),
        },
      ]);
      setnewTodo("");
    }
  };

  useEffect(() => {
    if (arrTodo.length) {
      localStorage.setItem("arrTodo", JSON.stringify(arrTodo));
    }
    if (localStorage.getItem("arrTodo") === null) return;
    if (
      !arrTodo.length &&
      JSON.parse(localStorage.getItem("arrTodo")).length !== 1
    ) {
      console.log();
      setArrtodo(JSON.parse(localStorage.getItem("arrTodo")));
    }
  }, [arrTodo]);

  const filterActive = (filter) => {
    return setFilter(filter);
  };
  const changeInput = (e) => {
    return setnewTodo(e.target.value);
  };

  return (
    <div className="wrap">
      <section className="todoapp">
        <input
          type="text"
          id="inToDo"
          value={newTodo}
          onChange={changeInput}
          onKeyDown={pressEnter}
          placeholder="What needs to be done?"
        />
        <ul className="list-todo">
          {arrTodo
            .filter((item) => {
              if (filter !== "") {
                return item.checked === filter;
              }
              return item;
            })
            .map((item, index) => (
              <AdedToDo
                handleDelete={handleDelete}
                handleCheck={handleCheck}
                item={item}
                key={index}
              />
            ))}
        </ul>
        <div className="footerTodoList">
          <p>{arrTodo.filter((item) => !item.checked).length} item left</p>

          <div>
            <button onClick={() => filterActive("")}>all</button>
            <button onClick={() => filterActive(false)}>active</button>
            <button onClick={() => filterActive(true)}>completed</button>
          </div>
          <button
            onClick={() => {
              setArrtodo(arrTodo.filter((item) => !item.checked));
            }}
          >
            Clear completed
          </button>
        </div>
      </section>
    </div>
  );
}
