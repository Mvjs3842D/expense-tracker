import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Smart Analytics',
      description: 'Visualize your spending patterns with beautiful charts and insights'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely in the cloud'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Budget Tracking',
      description: 'Set budgets and get alerts when you\'re close to limits'
    },
    {
      icon: SparklesIcon,
      title: 'Real-time Sync',
      description: 'Access your expenses from anywhere, anytime'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            ExpenseFlow
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Track expenses, analyze spending, and achieve your financial goals
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Get Started Free
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg glass text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="card p-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400">10K+</div>
                <div className="text-gray-400 mt-2">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">1M+</div>
                <div className="text-gray-400 mt-2">Transactions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-400">99.9%</div>
                <div className="text-gray-400 mt-2">Uptime</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything you need to manage expenses
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="card text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to take control?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users managing their finances better
          </p>
          <Link to="/login">
            <button className="btn-primary text-lg">
              Start Your Journey
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
