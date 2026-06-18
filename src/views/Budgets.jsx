import { useBudgets } from "../hooks/useBudgets";

export function Budgets() {
  const { data, isLoading, isError } = useBudgets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold text-blue-600">Budgets</h1>

      <div className="flex flex-col gap-2">
        {data.map((budget) => (
          <div key={budget.id} className="flex flex-col gap-2">
            <p>{budget.amount}</p>
            <p>{budget.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
