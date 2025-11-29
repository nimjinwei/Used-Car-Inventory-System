import { supabase } from '@/lib/supabase';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: '上传失败' });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        return res.status(400).json({ error: '没有上传文件' });
      }

      const fileBuffer = fs.readFileSync(file.filepath);
      const fileName = `${Date.now()}_${file.originalFilename}`;

      // 上传到 Supabase
      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // 获取公开 URL
      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(fileName);

      res.status(200).json({ success: true, url: publicUrl });
    });
  }
}