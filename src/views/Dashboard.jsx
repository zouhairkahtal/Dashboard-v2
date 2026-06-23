import { useDashboard } from "../hooks/useDashboard";
import { useBudgets } from "../hooks/useBudgets";
import { useExpenses } from "../hooks/useExpenses";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  BarChart3,
  Receipt,
  PiggyBank,
  Zap,
} from "lucide-react";

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "$", decimals = 2 }) {
  return (
    <span>
      {prefix}
      {Number(value || 0).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

// ── Donut chart (pure SVG) ────────────────────────────────────────────────────
function DonutChart({ segments }) {
  const size = 180;
  const strokeWidth = 26;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth={strokeWidth}
      />
      {total === 0 ? (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
      ) : (
        segments.map((seg, i) => {
          const pct = seg.value / total;
          const dash = pct * circumference;
          const gap = circumference - dash;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
          );
          offset += dash;
          return el;
        })
      )}
    </svg>
  );
}

// ── Budget progress bar ───────────────────────────────────────────────────────
function BudgetBar({ budget }) {
  const spent = budget.spentAmount || 0;
  const pct = Math.min((spent / budget.amount) * 100, 100);
  const isOver = spent > budget.amount;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-slate-700 truncate max-w-[150px]">
          {budget.name}
        </span>
        <span
          className={`font-bold text-xs px-2 py-0.5 rounded-full ${isOver ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}
        >
          ${spent} / ${budget.amount}
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isOver
              ? "bg-gradient-to-r from-red-500 to-orange-400"
              : pct > 80
                ? "bg-gradient-to-r from-amber-400 to-orange-400"
                : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }`}
        />
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, colorClass, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-[2rem] p-6 border border-white/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex items-start gap-4"
    >
      <div className={`p-3 rounded-2xl ${colorClass} flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900 truncate">{value}</p>
        {sub && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">{sub}</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function Dashboard() {
  const { data, isLoading, isError } = useDashboard();
  const { data: budgets } = useBudgets();
  const { data: expenses } = useExpenses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <p className="text-xl font-semibold text-slate-600">
          Could not load dashboard
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Derived data ─────────────────────────────────────────────────────────
  const totalBudget = budgets?.reduce((s, b) => s + b.amount, 0) ?? 0;
  const totalSpent =
    budgets?.reduce((s, b) => s + (b.spentAmount || 0), 0) ?? 0;
  const remainingMoney = data?.remainingMoney ?? totalBudget - totalSpent;
  const savingsRate =
    totalBudget > 0
      ? Math.max(0, ((totalBudget - totalSpent) / totalBudget) * 100)
      : 0;

  // Colours for donut segments (per-budget)
  const palette = [
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#14b8a6",
    "#f97316",
  ];

  const donutSegments = (budgets ?? []).map((b, i) => ({
    label: b.name,
    value: b.spentAmount || 0,
    color: palette[i % palette.length],
  }));

  // Recent expenses – last 6
  const recentExpenses = expenses
    ? [...expenses].sort((a, b) => b.id - a.id).slice(0, 6)
    : [];

  const budgetMap = Object.fromEntries(
    (budgets ?? []).map((b) => [b.id, b.name]),
  );

  const overBudgetCount = (budgets ?? []).filter(
    (b) => (b.spentAmount || 0) > b.amount,
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
            Overview
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient">
            Financial Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Here's how your finances look right now.
          </p>
        </div>
        <NavLink
          to="/Budgets"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all text-sm"
        >
          <Zap size={16} />
          Manage Budgets
          <ArrowRight size={16} />
        </NavLink>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          delay={0}
          icon={<Wallet size={22} className="text-blue-600" />}
          colorClass="bg-blue-100"
          label="Total Budget"
          value={<AnimatedNumber value={totalBudget} />}
          sub={`Across ${budgets?.length ?? 0} plan${budgets?.length !== 1 ? "s" : ""}`}
        />
        <StatCard
          delay={0.08}
          icon={<TrendingDown size={22} className="text-rose-600" />}
          colorClass="bg-rose-100"
          label="Total Spent"
          value={<AnimatedNumber value={totalSpent} />}
          sub={`${Math.round((totalSpent / (totalBudget || 1)) * 100)}% of budget used`}
        />
        <StatCard
          delay={0.16}
          icon={<PiggyBank size={22} className="text-emerald-600" />}
          colorClass="bg-emerald-100"
          label="Remaining"
          value={<AnimatedNumber value={remainingMoney} />}
          sub={`${Math.round(savingsRate)}% savings rate`}
        />
        <StatCard
          delay={0.24}
          icon={<ShieldCheck size={22} className="text-indigo-600" />}
          colorClass="bg-indigo-100"
          label="Budget Health"
          value={overBudgetCount > 0 ? `${overBudgetCount} Over` : "All Good"}
          sub={
            overBudgetCount > 0
              ? "Review over-budget plans"
              : "All plans within limits"
          }
        />
      </div>

      {/* ── Middle row: Donut + Budget Bars ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Spending Breakdown Donut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 glass rounded-[2rem] border border-white/50 shadow-lg p-8 flex flex-col items-center gap-6"
        >
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              Spending Breakdown
            </p>
            <h2 className="text-xl font-black text-slate-800">
              By Budget Plan
            </h2>
          </div>

          <div className="relative flex items-center justify-center">
            <DonutChart segments={donutSegments.filter((s) => s.value > 0)} />
            <div className="absolute flex flex-col items-center pointer-events-none">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                spent
              </span>
              <span className="text-2xl font-black text-slate-900">
                ${totalSpent.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-2">
            {donutSegments.length === 0 ? (
              <p className="text-center text-slate-400 text-sm font-medium">
                No spending recorded yet
              </p>
            ) : (
              donutSegments.map((seg, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: seg.color }}
                    />
                    <span className="text-slate-600 font-semibold truncate max-w-[130px]">
                      {seg.label}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">
                    ${seg.value.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Budget Progress Bars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 glass rounded-[2rem] border border-white/50 shadow-lg p-8 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Budget Plans
              </p>
              <h2 className="text-xl font-black text-slate-800">
                Spending Progress
              </h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl">
              <BarChart3 size={22} className="text-blue-600" />
            </div>
          </div>

          {budgets?.length === 0 || !budgets ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-8">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <BarChart3 size={28} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No budgets yet.</p>
              <NavLink
                to="/Budgets"
                className="text-blue-600 font-bold hover:underline text-sm"
              >
                Create your first budget →
              </NavLink>
            </div>
          ) : (
            <div className="space-y-5 flex-1 overflow-y-auto pr-1 max-h-72">
              <AnimatePresence>
                {budgets.map((budget, i) => (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <BudgetBar budget={budget} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Summary footer */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                Avg Spent
              </p>
              <p className="text-xl font-black text-blue-700">
                $
                {budgets?.length
                  ? Math.round(totalSpent / budgets.length).toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                Saved Rate
              </p>
              <p className="text-xl font-black text-emerald-700">
                {Math.round(savingsRate)}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Recent Transactions ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-[2rem] border border-white/50 shadow-lg p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              Activity
            </p>
            <h2 className="text-xl font-black text-slate-800">
              Recent Expenses
            </h2>
          </div>
          <NavLink
            to="/Budgets"
            className="flex items-center gap-1 text-blue-600 font-bold text-sm hover:underline"
          >
            View all <ArrowRight size={14} />
          </NavLink>
        </div>

        {recentExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <Receipt size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">
              No expenses logged yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {recentExpenses.map((expense, i) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-slate-50 hover:bg-white/90 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {expense.title}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        {budgetMap[expense.budgetId] ?? "Unknown budget"}
                        {expense.date ? ` · ${expense.date}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 text-lg">
                    -${Number(expense.amount).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* ── Quick tip / alert bar ── */}
      {overBudgetCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-red-50 border border-red-100 rounded-2xl px-6 py-4"
        >
          <AlertCircle className="text-red-500 flex-shrink-0" size={22} />
          <p className="text-red-700 font-semibold text-sm">
            You have <span className="font-black">{overBudgetCount}</span>{" "}
            budget{overBudgetCount > 1 ? "s" : ""} over limit. Consider
            reviewing your spending.
          </p>
          <NavLink
            to="/Budgets"
            className="ml-auto text-red-600 font-bold text-sm flex items-center gap-1 hover:underline flex-shrink-0"
          >
            Review <ArrowRight size={14} />
          </NavLink>
        </motion.div>
      )}
    </div>
  );
}
