import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionModal from '../components/TransactionModal';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const Transactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, loading } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filterType]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  const handleSubmit = async (data) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
    } else {
      await addTransaction(data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Transactions</h1>
          <p className="text-gray-400">Manage all your transactions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingTransaction(null);
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Transaction
        </motion.button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === 'income' 
                  ? 'bg-green-500 text-white' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === 'expense' 
                  ? 'bg-red-500 text-white' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              Expenses
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="card text-center py-12 text-gray-400">
            <p>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                    transaction.type === 'income' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{transaction.description}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-400">{transaction.category}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`text-2xl font-bold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(transaction)}
                      className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmit}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default Transactions;
