# 环境变量配置说明

## 必需的环境变量

在项目根目录创建 `.env.local` 文件，并添加以下配置：

```env
# Supabase 配置
# 从 Supabase 项目设置中获取这些值
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (仅用于服务端，有完整权限)
# ⚠️ 警告：不要将此密钥暴露给客户端！
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# WhatsApp 电话号码（可选，用于联系功能）
# 格式：国家代码+号码，例如：60123456789
NEXT_PUBLIC_WHATSAPP_PHONE=60123456789
```

## 如何获取 Supabase 配置

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 Settings > API
4. 复制以下值：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## 注意事项

- `.env.local` 文件已添加到 `.gitignore`，不会被提交到版本控制
- `NEXT_PUBLIC_*` 前缀的变量会暴露给客户端
- `SUPABASE_SERVICE_ROLE_KEY` 具有完整权限，务必保密

## Vercel 部署配置

如果你使用 Vercel 部署，请参考 **`VERCEL_SETUP.md`** 文件获取详细的配置步骤。

### 快速步骤：
1. 在 Vercel Dashboard → 项目 → Settings → Environment Variables
2. 添加所有必需的环境变量
3. 选择应用环境（Production/Preview/Development）
4. 保存并重新部署

详细说明请查看 `VERCEL_SETUP.md`

