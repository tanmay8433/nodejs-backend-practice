import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick,onToggleComplete }) => {
  console.log("todoitems",todoItems)
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
        key={item.id}
        id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onDeleteClick={onDeleteClick}
          onToggleComplete={onToggleComplete}
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoItems;
