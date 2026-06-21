import {
  useBudgets,
  useDeleteBudget,
  useCreateBudget,
  useUpdateBudget,
} from "../hooks/useBudgets";
import { useCreateExpense, useExpenses } from "../hooks/useExpenses";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  PlusCircle,
  Wallet,
  AlertCircle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Receipt,
  DollarSign,
} from "lucide-react";

export function Budgets() {
  const { data: expenses } = useExpenses();
  const { data, isLoading, isError } = useBudgets();

  const deleteBudget = useDeleteBudget();
  const updateBudget = useUpdateBudget();
  const createBudget = useCreateBudget();
  const createExpense = useCreateExpense();

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAmount, setUpdateAmount] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseBudgetId, setExpenseBudgetId] = useState(null);
  const [expandedBudgetId, setExpandedBudgetId] = useState(null);

  const handleExpense = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount || isNaN(expenseAmount)) return;

    createExpense.mutate({
      budgetId: expenseBudgetId,
      title: expenseName,
      amount: Number(expenseAmount),
      date: new Date().toISOString().split("T")[0],
    });

    setExpenseName("");
    setExpenseAmount("");
    setShowAddExpense(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || isNaN(amount)) return;
    createBudget.mutate({ name, amount: Number(amount) });
    setName("");
    setAmount("");
    setShowForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updateName || !updateAmount || isNaN(updateAmount)) return;
    updateBudget.mutate({
      id: selectedBudgetId,
      name: updateName,
      amount: Number(updateAmount),
    });
    setUpdateName("");
    setUpdateAmount("");
    setShowUpdateForm(false);
    setSelectedBudgetId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-xl font-medium text-gray-700">
          Error loading budgets
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 min-h-screen pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient">
            Budget Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Plan your monthly spending and track every penny.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 font-bold hover:bg-blue-700 transition-all"
        >
          <Plus size={22} strokeWidth={2.5} />
          <span>New Budget</span>
        </motion.button>
      </header>

      {/* Grid of Budget Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {data?.map((budget, index) => {
            const spent = budget.spentAmount || 0;
            const percentage = Math.min((spent / budget.amount) * 100, 100);
            const isOver = spent > budget.amount;

            return (
              <motion.div
                layout
                key={budget.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass rounded-[2.5rem] border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow group flex flex-col"
              >
                {/* Header Section */}
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-2xl ${isOver ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                      >
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                          {budget.name}
                        </h3>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest">
                          Monthly Limit
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBudgetId(budget.id);
                          setUpdateName(budget.name);
                          setUpdateAmount(budget.amount);
                          setShowUpdateForm(true);
                        }}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors"
                        title="Edit Budget"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteBudget.mutate(budget.id)}
                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                        title="Delete Budget"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Stats & Progress */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-4xl font-black text-slate-900">
                          ${spent}
                        </span>
                        <span className="text-slate-400 font-bold ml-2">
                          spent of ${budget.amount}
                        </span>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-xl text-sm font-black ${isOver ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}
                      >
                        {Math.round(percentage)}%
                      </div>
                    </div>

                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${isOver ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md shadow-blue-200"}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setExpandedBudgetId(
                        expandedBudgetId === budget.id ? null : budget.id,
                      );
                    }}
                    className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors"
                  >
                    <Receipt size={18} />
                    <span>Transactions</span>
                    {expandedBudgetId === budget.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowAddExpense(true);
                      setExpenseBudgetId(budget.id);
                    }}
                    className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-100 px-5 py-2.5 rounded-xl font-black hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                  >
                    <Plus size={16} strokeWidth={3} />
                    Add Expense
                  </motion.button>
                </div>

                {/* Expanded Expense List */}
                <AnimatePresence>
                  {expandedBudgetId === budget.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/40 border-t border-slate-100"
                    >
                      <div className="p-8 space-y-3">
                        {expenses?.filter((e) => e.budgetId === budget.id)
                          .length > 0 ? (
                          expenses
                            .filter((e) => e.budgetId === budget.id)
                            .map((expense) => (
                              <div
                                key={expense.id}
                                className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-50 shadow-sm"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                    <DollarSign size={14} />
                                  </div>
                                  <span className="font-bold text-slate-700">
                                    {expense.title}
                                  </span>
                                </div>
                                <span className="font-black text-slate-900">
                                  -${expense.amount}
                                </span>
                              </div>
                            ))
                        ) : (
                          <p className="text-center text-slate-400 font-medium py-4">
                            No records found for this budget.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-6 glass rounded-[3rem] border-dashed border-2 border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <PlusCircle size={48} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                Your budget is empty
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium">
                Create a new budget to start monitoring your expenses
                efficiently.
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 font-bold hover:underline"
            >
              Get started now
            </button>
          </div>
        )}
      </div>

      {/* Modals - Budget Create/Update and Expense Add */}
      <AnimatePresence>
        {(showForm || showUpdateForm || showAddExpense) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[6px] p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 space-y-8 relative overflow-hidden"
            >
              {/* Decorative background element for modal */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-800">
                  {showForm
                    ? "New Budget"
                    : showUpdateForm
                      ? "Update Budget"
                      : "Add Expense"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setShowUpdateForm(false);
                    setShowAddExpense(false);
                  }}
                  className="p-3 hover:bg-slate-100 rounded-2xl transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <form
                onSubmit={
                  showForm
                    ? handleSubmit
                    : showUpdateForm
                      ? handleUpdate
                      : handleExpense
                }
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">
                    {showAddExpense ? "Description" : "Plan Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      showAddExpense
                        ? "e.g. Weekly Grocery"
                        : "e.g. Travel Fund"
                    }
                    value={
                      showForm
                        ? name
                        : showUpdateForm
                          ? updateName
                          : expenseName
                    }
                    onChange={(e) => {
                      if (showForm) setName(e.target.value);
                      else if (showUpdateForm) setUpdateName(e.target.value);
                      else setExpenseName(e.target.value);
                    }}
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">
                    Amount ($)
                  </label>
                  <div className="relative">
                    <Wallet
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="0.00"
                      value={
                        showForm
                          ? amount
                          : showUpdateForm
                            ? updateAmount
                            : expenseAmount
                      }
                      onChange={(e) => {
                        if (showForm) setAmount(e.target.value);
                        else if (showUpdateForm)
                          setUpdateAmount(e.target.value);
                        else setExpenseAmount(e.target.value);
                      }}
                      className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-black text-slate-800 text-xl"
                    />
                  </div>
                  {((showForm && isNaN(amount) && amount !== "") ||
                    (showUpdateForm &&
                      isNaN(updateAmount) &&
                      updateAmount !== "") ||
                    (showAddExpense &&
                      isNaN(expenseAmount) &&
                      expenseAmount !== "")) && (
                    <p className="text-sm text-red-500 font-bold ml-1 flex items-center gap-1">
                      <AlertCircle size={14} /> Only numbers allowed
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    (showForm &&
                      (!name ||
                        !amount ||
                        isNaN(amount) ||
                        createBudget.isPending)) ||
                    (showUpdateForm &&
                      (!updateName ||
                        !updateAmount ||
                        isNaN(updateAmount) ||
                        updateBudget.isPending)) ||
                    (showAddExpense &&
                      (!expenseName ||
                        !expenseAmount ||
                        isNaN(expenseAmount) ||
                        createExpense.isPending))
                  }
                  className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black shadow-2xl shadow-blue-200 disabled:opacity-40 disabled:shadow-none hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  {(showForm && createBudget.isPending) ||
                  (showUpdateForm && updateBudget.isPending) ||
                  (showAddExpense && createExpense.isPending) ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <PlusCircle size={20} />
                      <span className="uppercase tracking-widest text-sm">
                        {showForm
                          ? "Initialize Plan"
                          : showUpdateForm
                            ? "Save Changes"
                            : "Confirm Expense"}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
