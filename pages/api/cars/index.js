// 车辆列表 API - 处理获取所有车辆和创建新车辆
// ============================================

import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  // GET - 获取车辆列表（带筛选）
  if (req.method === 'GET') {
    try {
      const { brand, minPrice, maxPrice, year, transmission, search } = req.query;

      // 构建查询
      let query = supabase
        .from('cars')
        .select(`
          *,
          car_images (
            id,
            image_url,
            display_order
          )
        `)
        .eq('status', '在售')
        .order('created_at', { ascending: false });

      // 应用筛选条件
      if (brand) query = query.eq('brand', brand);
      if (year) query = query.eq('year', parseInt(year));
      if (transmission) query = query.eq('transmission', transmission);
      if (minPrice) query = query.gte('price', parseFloat(minPrice));
      if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
      
      // 搜索功能
      if (search) {
        query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // 格式化数据 - 将图片数组整理好
      const formattedData = data.map(car => ({
        ...car,
        images: car.car_images
          .sort((a, b) => a.display_order - b.display_order)
          .map(img => img.image_url)
      }));

      res.status(200).json({ 
        success: true, 
        data: formattedData,
        count: formattedData.length 
      });

    } catch (error) {
      console.error('获取车辆列表错误:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // POST - 创建新车辆
  else if (req.method === 'POST') {
    try {
      const { 
        brand, model, year, price, mileage, 
        transmission, fuel_type, color, description, images 
      } = req.body;

      // 验证必填字段
      if (!brand || !model || !year || !price || !mileage) {
        return res.status(400).json({ 
          success: false, 
          error: '请填写所有必填字段 (brand, model, year, price, mileage)' 
        });
      }

      // 插入车辆数据
      const { data: car, error: carError } = await supabase
        .from('cars')
        .insert([{
          brand,
          model,
          year: parseInt(year),
          price: parseFloat(price),
          mileage: parseInt(mileage),
          transmission: transmission || 'Auto',
          fuel_type: fuel_type || 'Petrol',
          color,
          description,
          status: '在售'
        }])
        .select()
        .single();

      if (carError) throw carError;

      // 插入图片数据
      if (images && images.length > 0) {
        const imageData = images.map((url, index) => ({
          car_id: car.id,
          image_url: url,
          display_order: index + 1
        }));

        const { error: imageError } = await supabase
          .from('car_images')
          .insert(imageData);

        if (imageError) {
          // 如果图片插入失败,删除已创建的车辆
          await supabase.from('cars').delete().eq('id', car.id);
          throw imageError;
        }
      }

      res.status(201).json({ 
        success: true, 
        data: car,
        message: '车辆添加成功'
      });

    } catch (error) {
      console.error('创建车辆错误:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // 不支持的方法
  else {
    res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} Not Allowed` 
    });
  }
}
