import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../hooks/useTransactions';
import { useTheme } from '../context/ThemeContext';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const { isDark, toggleTheme } = useTheme();
  const [budget, setBudget] = useState(50000);

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const rows = transactions.map(t => [
      t.date,
      t.type,
      t.category,
      t.description,
      t.amount
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const budgetPercentage = (totalExpenses / budget) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-4 mb-6">
            <UserCircleIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">Profile</h2>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-20 h-20 rounded-full border-4 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold">{user?.displayName}</h3>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Budget Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-4 mb-6">
            <BellIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">Budget Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Budget: ₹{budget.toLocaleString()}
              </label>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Spent this month</span>
                <span className="text-sm font-semibold">
                  ₹{totalExpenses.toLocaleString()} ({budgetPercentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  className={`h-full rounded-full ${
                    budgetPercentage > 90 
                      ? 'bg-red-500' 
                      : budgetPercentage > 70 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}
                />
              </div>
            </div>
            {budgetPercentage > 90 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-400">
                  ⚠️ Warning: You've spent {budgetPercentage.toFixed(1)}% of your monthly budget!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-4 mb-6">
            {isDark ? (
              <MoonIcon className="w-8 h-8 text-blue-400" />
            ) : (
              <SunIcon className="w-8 h-8 text-blue-400" />
            )}
            <h2 className="text-2xl font-bold">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`w-14 h-7 rounded-full transition-colors ${
                isDark ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: isDark ? 28 : 2 }}
                className="w-5 h-5 bg-white rounded-full mt-1"
              />
            </button>
          </div>
        </motion.div>

        {/* Export Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-4 mb-6">
            <ArrowDownTrayIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">Export Data</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Download all your transactions as a CSV file
          </p>
          <button onClick={exportToCSV} className="btn-primary">
            Export to CSV
          </button>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">Privacy & Security</h2>
          </div>
          <div className="space-y-4 text-gray-400">
            <p>✓ Your data is encrypted end-to-end</p>
            <p>✓ No data is shared with third parties</p>
            <p>✓ Regular security audits</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
