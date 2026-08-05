import AddTodoForm from "../../../components/Todos/AddTodoForm";

function AddNewTodo() {
  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <h1 className="text-4xl lg:text-5xl mb-6 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Add New Todo
      </h1>

      <AddTodoForm />
    </div>
  );
}

export default AddNewTodo;
