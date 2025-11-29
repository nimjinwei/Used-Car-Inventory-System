// pages/cars/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">车辆不存在</h2>
          <p className="text-gray-600 mb-6">抱歉，找不到这辆车的信息</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : ['https://via.placeholder.com/800x600?text=No+Image'];

  return (
    <>
      <Head>
        <title>{car.brand} {car.model} - 二手车库存系统</title>
        <meta name="description" content={`${car.brand} ${car.model} ${car.year}年，价格 RM ${car.price.toLocaleString()}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* 导航栏 */}
        <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                <span className="text-xl">←</span>
                <span>返回列表</span>
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">🚗</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  二手车库存
                </span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* 图片轮播区域 */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="aspect-w-16 aspect-h-9 h-96 md:h-[500px]">
                <img
                  src={images[currentImage]}
                  alt={`${car.brand} ${car.model} - 图片 ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 图片导航按钮 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="上一张"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="下一张"
                  >
                    →
                  </button>
                  
                  {/* 缩略图 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === currentImage 
                            ? 'bg-white w-8' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`查看图片 ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* 图片计数器 */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 md:p-8">
              {/* 标题和价格 */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    RM {car.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 车辆信息卡片 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                  <p className="text-gray-600 text-sm mb-1">年份</p>
                  <p className="text-2xl font-bold text-blue-700">{car.year}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                  <p className="text-gray-600 text-sm mb-1">里程</p>
                  <p className="text-2xl font-bold text-green-700">{car.mileage?.toLocaleString() || 0} km</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                  <p className="text-gray-600 text-sm mb-1">变速箱</p>
                  <p className="text-2xl font-bold text-purple-700">{car.transmission || 'Auto'}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200">
                  <p className="text-gray-600 text-sm mb-1">燃料</p>
                  <p className="text-2xl font-bold text-orange-700">{car.fuel_type || 'Petrol'}</p>
                </div>
              </div>

              {/* 其他信息 */}
              {(car.color || car.status) && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {car.color && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">颜色</p>
                      <p className="text-lg font-semibold text-gray-800">{car.color}</p>
                    </div>
                  )}
                  {car.status && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">状态</p>
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {car.status}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 描述 */}
              {car.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full mr-3"></span>
                    车辆描述
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{car.description}</p>
                  </div>
                </div>
              )}

              {/* WhatsApp 按钮 */}
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-green-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span className="text-2xl">💬</span>
                <span>通过 WhatsApp 联系卖家</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}