// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import CarList from '../components/CarList';

export default function Home() {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    search: ''
  });

  return (
    <>
      <Head>
        <title>优质二手车 | 库存系统</title>
        <meta name="description" content="浏览我们的优质二手车库存，找到你心仪的座驾" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* 现代化导航栏 */}
        <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🚗</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  二手车库存
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">首页</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">关于我们</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">联系我们</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero 区域 */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                找到你心仪的座驾
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                浏览我们精心挑选的优质二手车，价格实惠，品质保证
              </p>
            </div>
          </div>
        </div>

        {/* 主内容 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 现代化筛选区 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">筛选车辆</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">搜索</label>
                <input
                  type="text"
                  placeholder="品牌、型号..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">品牌</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">所有品牌</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Perodua">Perodua</option>
                  <option value="Proton">Proton</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Nissan">Nissan</option>
                </select>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">最低价格 (RM)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">最高价格 (RM)</label>
                <input
                  type="number"
                  placeholder="不限"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* 车辆列表 */}
          <CarList filters={filters} />
        </div>

        {/* 页脚 */}
        <footer className="bg-gray-900 text-white mt-16 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">© 2024 二手车库存系统. 保留所有权利.</p>
          </div>
        </footer>
      </div>
    </>
  );
}