import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;

    try {
      // 先获取当前点击次数，然后加1
      const { data: currentCar } = await supabaseAdmin
        .from('cars')
        .select('whatsapp_click_count')
        .eq('id', id)
        .single();

      const { error: updateError } = await supabaseAdmin
        .from('cars')
        .update({ 
          whatsapp_click_count: (currentCar?.whatsapp_click_count || 0) + 1 
        })
        .eq('id', id);

      if (updateError) throw updateError;

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}