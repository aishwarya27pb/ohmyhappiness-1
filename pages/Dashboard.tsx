
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CreditCard, Package, Users, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const data = [
  { name: 'Jan', spend: 400000 },
  { name: 'Feb', spend: 300000 },
  { name: 'Mar', spend: 200000 },
  { name: 'Apr', spend: 278000 },
  { name: 'May', spend: 189000 },
  { name: 'Jun', spend: 239000 },
  { name: 'Jul', spend: 349000 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 serif">Corporate Dashboard</h1>
          <p className="text-slate-500">Manage your company's gifting programs and analytics.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
          New Campaign
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: <Package className="text-indigo-600" />, label: 'Total Gifts Sent', value: '1,284', trend: '+12%' },
          { icon: <Users className="text-emerald-600" />, label: 'Active Recipients', value: '458', trend: '+5%' },
          { icon: <CreditCard className="text-amber-600" />, label: 'Monthly Spend', value: '₹12,45,000', trend: '-2%' },
          { icon: <TrendingUp className="text-indigo-600" />, label: 'Impact Score', value: '98/100', trend: '+1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Spend Analytics (INR)</h2>
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold rounded-md bg-white shadow-sm">6 Months</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Yearly</button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  formatter={(value: number) => ['₹' + value.toLocaleString('en-IN'), 'Spend']}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="spend" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Campaigns</h2>
          <div className="space-y-6">
            {[
              { title: 'New Hire Welcome Q3', status: 'Delivering', count: 42, color: 'bg-emerald-500' },
              { title: 'Holiday Gourmet Hampers', status: 'Draft', count: 120, color: 'bg-slate-300' },
              { title: 'Client Appreciation Kit', status: 'In Transit', count: 15, color: 'bg-indigo-500' },
              { title: 'Anniversary Wellness', status: 'Delivered', count: 8, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <p className="font-bold text-slate-900 flex-grow text-sm">{item.title}</p>
                  <span className="text-xs font-medium text-slate-400">{item.count} items</span>
                </div>
                <div className="ml-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span>{item.status}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">
            View All Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
