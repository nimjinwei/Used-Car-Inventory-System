# Vercel 快速配置指南 🚀

## 5 分钟快速配置

### 步骤 1: 进入 Vercel 项目设置
1. 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 选择你的项目 `used-car-inventory`
3. 点击 **Settings** → **Environment Variables**

### 步骤 2: 添加环境变量
点击 **"Add"** 按钮，依次添加以下 4 个变量：

#### 变量 1: Supabase URL
```
名称: NEXT_PUBLIC_SUPABASE_URL
值: https://你的项目ID.supabase.co
环境: ✅ Production ✅ Preview ✅ Development
```

#### 变量 2: Supabase Anon Key
```
名称: NEXT_PUBLIC_SUPABASE_ANON_KEY
值: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
环境: ✅ Production ✅ Preview ✅ Development
```

#### 变量 3: Supabase Service Role Key ⚠️
```
名称: SUPABASE_SERVICE_ROLE_KEY
值: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
环境: ✅ Production ✅ Preview ✅ Development
```

#### 变量 4: WhatsApp 电话（可选）
```
名称: NEXT_PUBLIC_WHATSAPP_PHONE
值: 60123456789
环境: ✅ Production ✅ Preview ✅ Development
```

### 步骤 3: 获取 Supabase 配置值
1. 访问 [app.supabase.com](https://app.supabase.com)
2. 选择项目 → **Settings** → **API**
3. 复制：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 步骤 4: 保存并部署
1. 点击 **Save** 保存所有变量
2. 返回 **Deployments** 标签
3. 点击最新部署的 **"..."** → **"Redeploy"**

### 步骤 5: 完成！✅
等待部署完成，访问你的网站测试功能。

---

## 📋 检查清单

- [ ] 已添加 `NEXT_PUBLIC_SUPABASE_URL`
- [ ] 已添加 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] 已添加 `SUPABASE_SERVICE_ROLE_KEY`
- [ ] 已添加 `NEXT_PUBLIC_WHATSAPP_PHONE`（可选）
- [ ] 所有变量都选择了正确的环境
- [ ] 已保存环境变量
- [ ] 已重新部署项目
- [ ] 网站功能正常

---

## ❓ 遇到问题？

查看详细文档：**`VERCEL_SETUP.md`**

常见问题：
- 变量不生效？→ 重新部署项目
- 找不到 Supabase 配置？→ 查看 `VERCEL_SETUP.md` 中的详细步骤
- 部署失败？→ 检查 Vercel 部署日志中的错误信息

