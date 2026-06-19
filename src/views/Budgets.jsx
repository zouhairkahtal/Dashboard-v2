import {
  useBudgets,
  useDeleteBudget,
  useCreateBudget,
} from "../hooks/useBudgets";
import { useState } from "react";

export function Budgets() {
  const { data, isLoading, isError } = useBudgets();

  const deleteBudget = useDeleteBudget();

  const createBudget = useCreateBudget();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBudget.mutate({ name, amount });
    setName("");
    setAmount("");
    setShowForm(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold text-blue-600">Budgets</h1>

      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-2 py-1 rounded-md"
        >
          +
        </button>

        <div className={showForm ? "flex flex-col gap-2" : "hidden"}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">create</button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((budget) => (
          <div key={budget.id} className="flex flex-col gap-2">
            <p>{budget.amount}</p>
            <p>{budget.name}</p>

            <button
              onClick={() => deleteBudget.mutate(budget.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
