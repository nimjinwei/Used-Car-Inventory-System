// 检查 .env.local 文件格式的脚本
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔍 检查 .env.local 文件...\n');

// 检查文件是否存在
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local 文件不存在！');
  console.log('\n请创建 .env.local 文件，并添加以下内容：');
  console.log(`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_WHATSAPP_PHONE=60123456789
  `);
  process.exit(1);
}

// 读取文件内容
const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

// 必需的变量
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

// 可选的变量
const optionalVars = [
  'NEXT_PUBLIC_WHATSAPP_PHONE'
];

// 解析环境变量
const envVars = {};
lines.forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

console.log('📋 检查结果：\n');

let hasErrors = false;
let hasWarnings = false;

// 检查必需的变量
console.log('✅ 必需的环境变量：');
requiredVars.forEach(varName => {
  if (envVars[varName]) {
    const value = envVars[varName];
    if (value === `your_${varName.toLowerCase().replace(/next_public_/g, '').replace(/_/g, '_')}` || 
        value.includes('your_') || 
        value === '') {
      console.log(`  ❌ ${varName}: 未设置或使用占位符`);
      hasErrors = true;
    } else {
      // 检查格式
      if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
        if (!value.startsWith('https://') || !value.includes('.supabase.co')) {
          console.log(`  ⚠️  ${varName}: 格式可能不正确（应该以 https:// 开头并包含 .supabase.co）`);
          hasWarnings = true;
        } else {
          console.log(`  ✅ ${varName}: 已设置`);
        }
      } else if (varName.includes('KEY')) {
        if (value.length < 50) {
          console.log(`  ⚠️  ${varName}: 长度似乎太短（Supabase key 通常很长）`);
          hasWarnings = true;
        } else {
          console.log(`  ✅ ${varName}: 已设置`);
        }
      } else {
        console.log(`  ✅ ${varName}: 已设置`);
      }
    }
  } else {
    console.log(`  ❌ ${varName}: 缺失`);
    hasErrors = true;
  }
});

// 检查可选的变量
console.log('\n📌 可选的环境变量：');
optionalVars.forEach(varName => {
  if (envVars[varName]) {
    const value = envVars[varName];
    if (varName === 'NEXT_PUBLIC_WHATSAPP_PHONE') {
      if (!/^\d+$/.test(value)) {
        console.log(`  ⚠️  ${varName}: 格式可能不正确（应该只包含数字）`);
        hasWarnings = true;
      } else {
        console.log(`  ✅ ${varName}: ${value}`);
      }
    } else {
      console.log(`  ✅ ${varName}: 已设置`);
    }
  } else {
    console.log(`  ⚠️  ${varName}: 未设置（可选）`);
  }
});

// 检查是否有未识别的变量
console.log('\n🔍 其他环境变量：');
const allKnownVars = [...requiredVars, ...optionalVars];
Object.keys(envVars).forEach(key => {
  if (!allKnownVars.includes(key)) {
    console.log(`  ℹ️  ${key}: 已设置（未在检查列表中）`);
  }
});

// 总结
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ 发现错误！请修复上述问题。');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  检查完成，但有一些警告。');
  console.log('💡 提示：如果这些警告不影响使用，可以忽略。');
} else {
  console.log('✅ 所有检查通过！环境变量配置正确。');
}
console.log('='.repeat(50));

