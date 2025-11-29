import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('brand')
      .eq('status', '在售')
      .order('brand');

    if (error) throw error;

    // 去重
    const brands = [...new Set(data.map(item => item.brand))];

    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}