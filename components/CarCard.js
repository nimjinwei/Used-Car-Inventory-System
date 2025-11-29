// components/CarCard.js
import Link from 'next/link';
import { useState } from 'react';

export default function CarCard({ car }) {
  const [imageError, setImageError] = useState(false);
  
  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `你好，我对这辆车感兴趣：\n${car.brand} ${car.model} (${car.year}年)\n价格：RM ${car.price.toLocaleString()}`;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '60123456789';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';
  const imageUrl = car.images && car.images.length > 0 && !imageError 
    ? car.images[0] 
    : defaultImage;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
      {/* 图片容器 */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        {/* 图片数量标签 */}
        {car.images && car.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {car.images.length} 张图片
          </div>
        )}
        {/* 价格标签 */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl shadow-lg">
          <span className="text-sm font-medium">RM</span>
          <span className="text-xl font-bold ml-1">{car.price.toLocaleString()}</span>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {car.brand} {car.model}
        </h3>
        
        {/* 车辆信息网格 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-lg">📅</span>
            <span className="font-medium">{car.year} 年</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-lg">🛣️</span>
            <span className="font-medium">{car.mileage?.toLocaleString() || 0} km</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-lg">⚙️</span>
            <span className="font-medium">{car.transmission || 'Auto'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-lg">⛽</span>
            <span className="font-medium">{car.fuel_type || 'Petrol'}</span>
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex gap-2 mt-4">
          <Link href={`/cars/${car.id}`} className="flex-1">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
              查看详情
            </button>
          </Link>
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-1"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}