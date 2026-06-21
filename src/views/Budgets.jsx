import {
  useBudgets,
  useDeleteBudget,
  useCreateBudget,
  useUpdateBudget,
} from "../hooks/useBudgets";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  PlusCircle,
  Wallet,
  Calculator,
  AlertCircle,
} from "lucide-react";

export function Budgets() {
  const { data, isLoading, isError } = useBudgets();

  const deleteBudget = useDeleteBudget();
  const updateBudget = useUpdateBudget();
  const createBudget = useCreateBudget();

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAmount, setUpdateAmount] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen pb-20">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient">
            Manage Budgets
          </h1>
          <p className="text-slate-500 font-medium">
            Monitor and control your spending effectively.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-200 font-semibold hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          Create Budget
        </motion.button>
      </header>

      {/* Create Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  New Budget
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">
                    Budget Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Groceries"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">
                    Monthly Amount ($)
                  </label>
                  <div className="relative">
                    <Wallet
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {isNaN(amount) && amount !== "" && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      Please enter a valid number
                    </p>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={
                      createBudget.isPending ||
                      isNaN(amount) ||
                      !name ||
                      !amount
                    }
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none hover:bg-blue-700 transition-all uppercase tracking-wider text-xs"
                  >
                    {createBudget.isPending ? "Creating..." : "Create Plan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {data?.map((budget, index) => (
            <motion.div
              layout
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 rounded-[2rem] border border-white/40 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-blue-100/50 p-3 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 text-blue-600">
                  <Calculator size={24} />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setSelectedBudgetId(budget.id);
                      setUpdateName(budget.name);
                      setUpdateAmount(budget.amount);
                      setShowUpdateForm(true);
                    }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteBudget.mutate(budget.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {budget.name}
                  </h3>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    ${budget.amount}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {data?.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <PlusCircle size={40} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">
                No budgets yet
              </h3>
              <p className="text-slate-500">
                Create your first budget plan to get started.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Update Form Modal */}
      <AnimatePresence>
        {showUpdateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  Update Budget
                </h2>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">
                    Budget Name
                  </label>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">
                    Monthly Amount ($)
                  </label>
                  <div className="relative">
                    <Wallet
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={updateAmount}
                      onChange={(e) => setUpdateAmount(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {isNaN(updateAmount) && updateAmount !== "" && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      Please enter a valid number
                    </p>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={
                      updateBudget.isPending ||
                      isNaN(updateAmount) ||
                      !updateName ||
                      !updateAmount
                    }
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none hover:bg-blue-700 transition-all uppercase tracking-wider text-xs"
                  >
                    {updateBudget.isPending ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
