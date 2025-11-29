import { supabase } from '@/lib/supabase';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { file, fileName } = req.body;

      if (!file) {
        return res.status(400).json({ error: '没有上传文件' });
      }

      // file 是 base64 字符串，转换为 Buffer
      const buffer = Buffer.from(file, 'base64');
      const uploadFileName = `${Date.now()}_${fileName}`;

      // 上传到 Supabase
      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(uploadFileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // 获取公开 URL
      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(uploadFileName);

      res.status(200).json({ success: true, url: publicUrl });
    } catch (error) {
      res.status(500).json({ error: '上传失败: ' + error.message });
    }
  } else {
    res.status(405).json({ error: '方法不允许' });
  }
}