// 单个车辆 API - 处理获取、更新、删除单个车辆
// ============================================

import { supabase, supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;

  // 验证 ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      error: '无效的车辆 ID' 
    });
  }

  // GET - 获取单个车辆详情
  if (req.method === 'GET') {
    try {
      // 增加浏览次数（使用 admin 客户端避免 RLS 限制）
      // 先获取当前浏览次数，然后加1
      const { data: currentCar } = await supabaseAdmin
        .from('cars')
        .select('view_count')
        .eq('id', id)
        .single();
      
      const { error: updateError } = await supabaseAdmin
        .from('cars')
        .update({ 
          view_count: (currentCar?.view_count || 0) + 1
        })
        .eq('id', id);

      if (updateError) {
        console.warn('更新浏览次数失败:', updateError);
      }

      // 获取车辆详情
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          car_images (
            id,
            image_url,
            display_order
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ 
            success: false, 
            error: '车辆不存在' 
          });
        }
        throw error;
      }

      // 格式化图片数据
      const formattedData = {
        ...data,
        images: data.car_images
          .sort((a, b) => a.display_order - b.display_order)
          .map(img => img.image_url)
      };

      res.status(200).json({ 
        success: true, 
        data: formattedData 
      });

    } catch (error) {
      console.error('获取车辆详情错误:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // PUT - 更新车辆信息
  else if (req.method === 'PUT') {
    try {
      const { 
        brand, model, year, price, mileage, 
        transmission, fuel_type, color, description, images, status 
      } = req.body;

      // 更新车辆基本信息
      const { data: updatedCar, error: updateError } = await supabase
        .from('cars')
        .update({
          brand,
          model,
          year: year ? parseInt(year) : undefined,
          price: price ? parseFloat(price) : undefined,
          mileage: mileage ? parseInt(mileage) : undefined,
          transmission,
          fuel_type,
          color,
          description,
          status: status || '在售'
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        if (updateError.code === 'PGRST116') {
          return res.status(404).json({ 
            success: false, 
            error: '车辆不存在' 
          });
        }
        throw updateError;
      }

      // 更新图片（如果提供了新图片数组）
      if (images && Array.isArray(images)) {
        // 删除旧图片
        await supabase
          .from('car_images')
          .delete()
          .eq('car_id', id);

        // 插入新图片
        if (images.length > 0) {
          const imageData = images.map((url, index) => ({
            car_id: parseInt(id),
            image_url: url,
            display_order: index + 1
          }));

          const { error: imageError } = await supabase
            .from('car_images')
            .insert(imageData);

          if (imageError) {
            console.error('更新图片错误:', imageError);
          }
        }
      }

      res.status(200).json({ 
        success: true, 
        data: updatedCar,
        message: '车辆更新成功'
      });

    } catch (error) {
      console.error('更新车辆错误:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // DELETE - 删除车辆
  else if (req.method === 'DELETE') {
    try {
      // 删除车辆（图片会通过 CASCADE 自动删除）
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ 
            success: false, 
            error: '车辆不存在' 
          });
        }
        throw error;
      }

      res.status(200).json({ 
        success: true, 
        message: '车辆已删除' 
      });

    } catch (error) {
      console.error('删除车辆错误:', error);
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