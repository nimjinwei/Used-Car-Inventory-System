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
        <title>二手车库存系统</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">🚗 二手车库存系统</h1>
          </div>
        </nav>

        {/* 主内容 */}
        <div className="container mx-auto p-6">
          {/* 筛选区 */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">筛选车辆</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="搜索品牌或型号..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">所有品牌</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Perodua">Perodua</option>
              </select>
              <input
                type="number"
                placeholder="最低价格"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="最高价格"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* 车辆列表 */}
          <CarList filters={filters} />
        </div>
      </div>
    </>
  );
}