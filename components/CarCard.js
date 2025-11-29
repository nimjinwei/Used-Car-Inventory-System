// components/CarCard.js
import Link from 'next/link';

export default function CarCard({ car }) {
  const handleWhatsApp = () => {
    const message = `你好，我对这辆车感兴趣：\n${car.brand} ${car.model} (${car.year}年)\n价格：RM ${car.price.toLocaleString()}`;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '60123456789';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* 图片 */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 内容 */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          {car.brand} {car.model}
        </h3>
        <p className="text-2xl text-blue-600 font-bold mb-3">
          RM {car.price.toLocaleString()}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>📅 {car.year} 年</div>
          <div>🛣️ {car.mileage.toLocaleString()} km</div>
          <div>⚙️ {car.transmission}</div>
          <div>⛽ {car.fuel_type}</div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-2">
          <Link href={`/cars/${car.id}`}>
            <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              查看详情
            </button>
          </Link>
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}