# Vercel 部署配置指南

## 📋 在 Vercel 上配置环境变量

### 方法一：通过 Vercel Dashboard（推荐）

#### 步骤 1: 登录 Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 登录你的账户

#### 步骤 2: 导入项目（如果还未导入）
1. 点击 **"Add New..."** → **"Project"**
2. 选择你的 Git 仓库（GitHub/GitLab/Bitbucket）
3. 选择 `used-car-inventory` 项目
4. 点击 **"Import"**

#### 步骤 3: 配置环境变量
1. 在项目页面，点击 **"Settings"** 标签
2. 在左侧菜单选择 **"Environment Variables"**
3. 添加以下环境变量：

##### 必需的环境变量：

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `你的 Supabase URL` | Production, Preview, Development | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `你的 anon key` | Production, Preview, Development | Supabase 匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | `你的 service_role key` | Production, Preview, Development | Supabase 服务端密钥（⚠️ 保密） |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | `60123456789` | Production, Preview, Development | WhatsApp 电话号码（可选） |

#### 步骤 4: 选择应用环境
对于每个变量，选择要应用的环境：
- ✅ **Production** - 生产环境（主分支部署）
- ✅ **Preview** - 预览环境（PR/分支部署）
- ✅ **Development** - 开发环境（本地开发）

#### 步骤 5: 保存并重新部署
1. 点击 **"Save"** 保存所有变量
2. 返回 **"Deployments"** 标签
3. 点击最新部署右侧的 **"..."** → **"Redeploy"**
4. 选择 **"Use existing Build Cache"** 或 **"Rebuild"**

---

### 方法二：通过 Vercel CLI

#### 安装 Vercel CLI
```bash
npm i -g vercel
```

#### 登录 Vercel
```bash
vercel login
```

#### 链接项目
```bash
cd used-car-inventory
vercel link
```

#### 设置环境变量
```bash
# 设置生产环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_WHATSAPP_PHONE production

# 设置预览环境变量（可选，与生产环境相同）
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
vercel env add NEXT_PUBLIC_WHATSAPP_PHONE preview

# 设置开发环境变量（可选）
vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
vercel env add SUPABASE_SERVICE_ROLE_KEY development
vercel env add NEXT_PUBLIC_WHATSAPP_PHONE development
```

#### 拉取环境变量到本地（可选）
```bash
vercel env pull .env.local
```

---

## 🔑 如何获取 Supabase 配置值

### 1. 登录 Supabase Dashboard
访问 [https://app.supabase.com](https://app.supabase.com)

### 2. 选择你的项目
在项目列表中选择你的项目

### 3. 进入 API 设置
1. 点击左侧菜单的 **"Settings"**（齿轮图标）
2. 选择 **"API"**

### 4. 复制配置值
在 **"Project API keys"** 部分：

- **Project URL**
  - 位置：页面顶部的 **"Project URL"**
  - 格式：`https://xxxxxxxxxxxxx.supabase.co`
  - 复制到：`NEXT_PUBLIC_SUPABASE_URL`

- **anon public key**
  - 位置：**"Project API keys"** → **"anon"** → **"public"**
  - 格式：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - 复制到：`NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **service_role key** ⚠️
  - 位置：**"Project API keys"** → **"service_role"** → **"secret"**
  - 格式：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - 复制到：`SUPABASE_SERVICE_ROLE_KEY`
  - ⚠️ **重要**：这个密钥有完整权限，不要暴露给客户端！

---

## 📝 环境变量配置示例

在 Vercel Dashboard 中，你的环境变量应该看起来像这样：

```
NEXT_PUBLIC_SUPABASE_URL
https://abcdefghijklmnop.supabase.co
[Production] [Preview] [Development]

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
[Production] [Preview] [Development]

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
[Production] [Preview] [Development]

NEXT_PUBLIC_WHATSAPP_PHONE
60123456789
[Production] [Preview] [Development]
```

---

## ✅ 验证配置

### 1. 检查环境变量是否生效
部署后，在 Vercel 的部署日志中检查：
- 构建应该成功完成
- 没有出现 "undefined" 或环境变量相关的错误

### 2. 测试功能
访问部署后的网站，测试：
- ✅ 车辆列表是否正常加载
- ✅ 图片是否正常显示
- ✅ WhatsApp 按钮是否正常工作
- ✅ 筛选功能是否正常

### 3. 检查浏览器控制台
打开浏览器开发者工具（F12），检查：
- 没有 Supabase 连接错误
- 没有环境变量相关的警告

---

## 🔧 常见问题

### Q: 环境变量设置后，网站还是报错？
**A:** 
1. 确保点击了 **"Save"** 保存变量
2. 重新部署项目（Redeploy）
3. 清除浏览器缓存后重试

### Q: 如何为不同环境设置不同的值？
**A:** 在 Vercel Dashboard 中，添加同一个变量名多次，但选择不同的环境（Production/Preview/Development），并设置不同的值。

### Q: 本地开发环境变量在哪里配置？
**A:** 在项目根目录创建 `.env.local` 文件（参考 `ENV_SETUP.md`）

### Q: 环境变量更新后需要重新部署吗？
**A:** 是的，环境变量更新后需要重新部署才能生效。

### Q: 如何查看当前部署使用的环境变量？
**A:** 在 Vercel Dashboard → Deployments → 选择部署 → 查看构建日志

---

## 🚀 部署流程总结

1. ✅ 在 Vercel Dashboard 配置所有环境变量
2. ✅ 确保所有变量都选择了正确的环境（Production/Preview/Development）
3. ✅ 点击 "Save" 保存
4. ✅ 触发新的部署（推送代码或手动 Redeploy）
5. ✅ 等待部署完成
6. ✅ 测试网站功能

---

## 📚 相关文档

- [Vercel 环境变量文档](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase 文档](https://supabase.com/docs)

---

**提示**: 如果遇到问题，检查 Vercel 的部署日志，通常会有详细的错误信息。

