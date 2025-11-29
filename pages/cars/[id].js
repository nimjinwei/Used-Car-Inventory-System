// pages/cars/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchCarDetail();
    }
  }, [id]);

  const fetchCarDetail = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`);
      const result = await response.json();
      if (result.success) {
        setCar(result.data);
      }
    } catch (error) {
      console.error('获取车辆详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `你好，我对这辆车感兴趣：\n${car.brand} ${car.model} (${car.year}年)\n价格：RM ${car.price.toLocaleString()}`;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '60123456789';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  if (!car) {
    return <div className="text-center py-12">车辆不存在</div>;
  }

  return (
    <>
      <Head>
        <title>{car.brand} {car.model} - 二手车库存系统</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← 返回列表
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 图片轮播 */}
            <div className="relative h-96 bg-gray-200">
              <img
                src={car.images[currentImage]}
                alt={car.model}
                className="w-full h-full object-cover"
              />
              {car.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {car.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-3 h-3 rounded-full ${
                        idx === currentImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">
                {car.brand} {car.model}
              </h1>
              <p className="text-4xl text-blue-600 font-bold mb-6">
                RM {car.price.toLocaleString()}
              </p>

              {/* 车辆信息 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">年份</p>
                  <p className="text-xl font-bold">{car.year}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">里程</p>
                  <p className="text-xl font-bold">{car.mileage.toLocaleString()} km</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600 text-sm">变速箱</p>
                  <p className="text-xl font-bold">{car.transmission}</p>
                </div>
              </div>

              {/* 描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">车辆描述</h3>
                <p className="text-gray-700">{car.description}</p>
              </div>

              {/* WhatsApp 按钮 */}
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 text-lg font-bold"
              >
                📱 通过 WhatsApp 联系
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}