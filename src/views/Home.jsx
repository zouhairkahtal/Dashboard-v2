import { motion } from "framer-motion";
import {
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Wallet,
  PieChart,
  CheckCircle2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span>Smart Financial Tracking</span>
            </motion.div>

            <motion.h1
              {...fadeIn}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
            >
              Master Your Money with <br />
              <span className="text-gradient">FinDash Intelligence</span>
            </motion.h1>

            <motion.p
              {...fadeIn}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl mx-auto text-xl text-slate-600 mb-10"
            >
              The all-in-one personal finance dashboard that gives you total
              control over your spending, savings, and investments.
            </motion.p>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <NavLink
                to="/SignUp"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/LogIn"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-300"
              >
                Sign In
              </NavLink>
            </motion.div>
          </div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="glass rounded-[2.5rem] p-4 shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-slate-900 rounded-[2rem] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-12 gap-4 w-full h-full p-8">
                  <div className="col-span-3 space-y-4">
                    <div className="h-32 bg-white/10 rounded-2xl animate-pulse"></div>
                    <div className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="col-span-6 space-y-4">
                    <div className="h-16 bg-white/10 rounded-2xl animate-pulse"></div>
                    <div className="h-80 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-blue-400 opacity-50" />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="h-48 bg-white/10 rounded-2xl animate-pulse"></div>
                    <div className="h-48 bg-white/5 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-4 md:right-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Net Savings
                </p>
                <p className="text-lg font-bold text-slate-900">+$2,450.00</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-4 md:left-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Total Balance
                </p>
                <p className="text-lg font-bold text-slate-900">$12,840.45</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Why choose FinDash?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Powerful tools designed to help you build wealth and understand
              your habits better than ever before.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                title: "Detailed Analytics",
                description:
                  "Deep dive into your spending patterns with interactive charts and automated categorization.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
                title: "Bank-Grade Security",
                description:
                  "Your data is encrypted with the highest standards. We never store your credentials.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                title: "Smart Budgeting",
                description:
                  "Set goals and let our AI suggest optimal budgets based on your lifestyle and goals.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="glass p-8 rounded-[2rem] border-white/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl inline-block shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <PieChart className="w-64 h-64 -mr-20 -mt-20" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">
              Ready to take control of your financial future?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 relative z-10 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
                <span>Secure & Encrypted</span>
              </div>
            </div>

            <NavLink
              to="/SignUp"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl relative z-10"
            >
              Create Your Account Now
              <ArrowRight className="w-6 h-6" />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">FinDash</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FinDash. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-slate-500 hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
