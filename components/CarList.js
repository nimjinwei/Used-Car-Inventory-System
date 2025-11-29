// components/CarList.js
import { useCars } from '../hooks/useCars';
import CarCard from './CarCard';

export default function CarList({ filters }) {
  const { cars, loading, error } = useCars(filters);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>错误: {error}</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>没有找到符合条件的车辆</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}