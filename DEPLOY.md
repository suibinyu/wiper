# 🚀 部署指南

本指南将帮助你将雨刷尺寸查询系统部署到 Streamlit Cloud。

## 📋 准备工作

### 1. 检查文件清单

确保你的项目包含以下文件：
- ✅ `app.py` - 主应用程序
- ✅ `requirements.txt` - Python 依赖
- ✅ `wiper_data.xlsx` - 数据文件
- ✅ `README.md` - 项目说明
- ✅ `.streamlit/config.toml` - Streamlit 配置（可选）
- ✅ `.gitignore` - Git 忽略文件

### 2. 本地测试

在部署前，先在本地测试应用：

```bash
# 安装依赖
pip install -r requirements.txt

# 运行应用
streamlit run app.py
```

确保应用运行正常，搜索功能工作正常。

## 🌐 部署到 Streamlit Cloud

### 步骤 1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 `+` → `New repository`
3. 填写仓库信息：
   - Repository name: 例如 `wiper-size-query`
   - Description: 雨刷尺寸查询系统
   - 选择 **Public**（公开仓库）
   - 不要勾选 "Initialize this repository with a README"
4. 点击 `Create repository`

### 步骤 2：推送代码到 GitHub

在项目目录下执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 雨刷尺寸查询系统"

# 设置主分支名称
git branch -M main

# 添加远程仓库（替换为你的 GitHub 用户名和仓库名）
git remote add origin https://github.com/你的用户名/wiper-size-query.git

# 推送到 GitHub
git push -u origin main
```

**注意**：如果遇到权限问题，需要配置 GitHub 身份验证：
- 使用 Personal Access Token（推荐）
- 或配置 SSH 密钥

### 步骤 3：部署到 Streamlit Cloud

1. **访问 Streamlit Cloud**
   - 打开 [share.streamlit.io](https://share.streamlit.io)
   - 点击右上角 `Sign in` 使用 GitHub 账号登录

2. **创建新应用**
   - 点击 `New app` 按钮
   - 或点击 `Create app`

3. **配置应用**
   填写以下信息：
   - **Repository**: 选择你刚创建的仓库（例如：`你的用户名/wiper-size-query`）
   - **Branch**: `main`
   - **Main file path**: `app.py`
   - **App URL** (可选): 自定义你的应用 URL

4. **高级设置**（可选）
   点击 `Advanced settings` 可以配置：
   - Python 版本
   - 环境变量
   - Secrets（如果需要）

5. **部署应用**
   - 点击 `Deploy!` 按钮
   - Streamlit Cloud 会自动：
     - 检出你的 GitHub 仓库
     - 安装 requirements.txt 中的依赖
     - 运行你的应用

6. **等待部署完成**
   - 部署通常需要 2-5 分钟
   - 你可以在部署日志中查看进度
   - 成功后会显示应用 URL

### 步骤 4：访问你的应用

部署成功后，你会获得一个类似这样的 URL：
```
https://你的用户名-wiper-size-query-main-app-xxxxx.streamlit.app
```

分享这个链接，任何人都可以访问你的雨刷查询系统！

## 🔄 更新应用

当你需要更新应用时：

1. **修改代码或数据**
   ```bash
   # 编辑文件...
   
   # 提交更改
   git add .
   git commit -m "更新说明"
   git push
   ```

2. **自动重新部署**
   - Streamlit Cloud 会自动检测 GitHub 仓库的更新
   - 自动重新部署应用
   - 通常在 1-2 分钟内完成

## 🔧 故障排除

### 问题 1：部署失败 - 找不到模块

**错误信息**：`ModuleNotFoundError: No module named 'xxx'`

**解决方案**：
- 检查 `requirements.txt` 是否包含所有必要的依赖
- 确保依赖版本兼容

### 问题 2：找不到数据文件

**错误信息**：`未找到 wiper_data.xlsx 文件`

**解决方案**：
- 确保 `wiper_data.xlsx` 已提交到 Git
- 检查文件名大小写是否正确
- 确认文件在项目根目录

```bash
# 检查文件是否被追踪
git ls-files | grep wiper_data.xlsx

# 如果没有，添加并提交
git add wiper_data.xlsx
git commit -m "添加数据文件"
git push
```

### 问题 3：Excel 文件无法读取

**错误信息**：与 pandas 或 openpyxl 相关的错误

**解决方案**：
- 确保 `requirements.txt` 中包含 `openpyxl`
- 检查 Excel 文件格式是否正确（应为 .xlsx）
- 确保 Excel 文件没有损坏

### 问题 4：应用运行缓慢

**解决方案**：
- 使用 `@st.cache_data` 缓存数据加载
- 减小 Excel 文件大小
- 考虑数据分页显示

### 问题 5：中文显示乱码

**解决方案**：
- 确保 Excel 文件使用 UTF-8 编码
- 检查代码文件编码是否为 UTF-8

## 📊 监控和管理

### Streamlit Cloud 控制台

在 Streamlit Cloud 控制台，你可以：
- 📈 查看应用使用统计
- 🔄 手动重启应用
- 📝 查看应用日志
- ⚙️ 修改应用设置
- 🗑️ 删除应用

### 访问控制台

1. 登录 [share.streamlit.io](https://share.streamlit.io)
2. 点击你的应用
3. 在应用页面右上角点击 `Manage app`

## 💰 资源限制

### Streamlit Cloud 免费版限制

- ✅ 无限公开应用
- ✅ 1GB 内存
- ✅ 1 CPU 核心
- ✅ 自动休眠（不活动时）
- ⚠️ 不适合大流量应用

### 升级选项

如果需要更多资源，可以考虑：
- Streamlit Cloud 付费计划
- 自托管（使用 Docker）
- 其他云平台（AWS、Google Cloud、Azure）

## 🎯 最佳实践

1. **定期备份数据**：在本地保存 Excel 文件的备份
2. **版本控制**：使用有意义的 commit 信息
3. **测试后部署**：始终在本地测试后再推送到 GitHub
4. **监控日志**：定期检查应用日志，发现问题
5. **文档更新**：保持 README 和文档更新

## 📞 获取帮助

- **Streamlit 文档**：[docs.streamlit.io](https://docs.streamlit.io)
- **Streamlit 社区**：[discuss.streamlit.io](https://discuss.streamlit.io)
- **GitHub Issues**：在你的仓库创建 Issue

---

祝你部署顺利！🎉

