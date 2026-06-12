function TodoItem({ id,todoName, todoDate,completed, onDeleteClick,onToggleComplete }) {
 return (
    <div className="container">
      <div className="row kg-row align-items-center">
        <div className="col-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete(id)}
          />
        </div>

        <div
          className="col-5"
          style={{
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {todoName}
        </div>

        <div className="col-4">{todoDate}</div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger kg-button"
            onClick={() => onDeleteClick(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
