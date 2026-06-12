import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState } from "react";
import { addItemtoServer, getItemtoServer,deleteItemtoServer, markCompleted } from "./services/Itemservice";
import { useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);
useEffect(() => {
 getItemtoServer().then(loadInitialItems=>{
     setTodoItems(loadInitialItems)
 });
}, [])

  const handleNewItem = async(itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item=await addItemtoServer(itemName,itemDueDate)
    const newTodoItems = [
      ...todoItems,
      item,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async(id) => {
  const deleteId=await deleteItemtoServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deleteId);
    setTodoItems(newTodoItems);
  };

 const handleToggleComplete = async (id) => {
  await markCompleted(id);

  const updatedItems = todoItems.map((item) =>
    item.id === id
      ? { ...item, completed: true }
      : item
  );

  const sortedItems = [...updatedItems].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  setTodoItems(sortedItems);
};
  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
        
        onToggleComplete={handleToggleComplete}
      ></TodoItems>
    </center>
  );
}

export default App;
