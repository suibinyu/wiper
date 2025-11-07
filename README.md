# 🚗 雨刷尺寸查询系统

一个基于 Streamlit 的简洁美观的雨刷尺寸查询网站，支持从 Excel 表格读取数据并进行车型搜索。

## ✨ 功能特点

- 🔍 **快速搜索**：输入车型名称快速查询雨刷规格（支持模糊搜索）
- 📋 **数据展示**：清晰展示品牌、车型、年份、主驾、副驾、接头、后雨刷信息
- 🎨 **简洁界面**：现代化设计，响应式布局，支持移动端
- 📊 **Excel数据源**：直接从 wiper_data.xlsx 读取数据
- ⚡ **实时统计**：显示品牌数量和车型数量
- 📱 **响应式设计**：自动适配各种屏幕尺寸

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. **安装依赖**
```bash
pip install -r requirements.txt
```

3. **准备数据文件**

确保 `wiper_data.xlsx` 文件在项目根目录中。Excel表格应包含以下列：
- 品牌
- 车型
- 年份
- 主驾
- 副驾
- 接头
- 后雨刷

4. **运行应用**
```bash
streamlit run app.py
```

5. **访问网站**

浏览器会自动打开，或手动访问：`http://localhost:8501`

## 🌐 GitHub 部署（Streamlit Cloud）

### 方法一：通过 GitHub 直接部署

1. **将代码推送到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

2. **访问 Streamlit Cloud**
   - 前往 [share.streamlit.io](https://share.streamlit.io)
   - 使用 GitHub 账号登录
   - 点击 "New app"

3. **配置应用**
   - Repository: 选择你的 GitHub 仓库
   - Branch: main
   - Main file path: app.py
   - 点击 "Deploy"

4. **等待部署完成**
   - Streamlit Cloud 会自动安装依赖并启动应用
   - 部署完成后会获得一个公开访问的 URL

### 方法二：使用 Streamlit Cloud 配置文件

创建 `.streamlit/config.toml` 文件来自定义配置（可选）：

```toml
[theme]
primaryColor="#1f77b4"
backgroundColor="#FFFFFF"
secondaryBackgroundColor="#f0f2f6"
textColor="#262730"
font="sans serif"

[server]
headless = true
port = 8501
```

### 注意事项

- 确保 `wiper_data.xlsx` 文件已推送到 GitHub 仓库
- 仓库必须是公开的（或者使用 Streamlit Cloud 的私有仓库功能）
- Streamlit Cloud 免费版有资源限制，适合中小型应用

## 📁 文件结构

```
.
├── app.py                  # Streamlit 应用主文件
├── wiper_data.xlsx        # 雨刷数据 Excel 表格
├── requirements.txt       # Python 依赖
├── README.md             # 说明文档
└── .streamlit/           # Streamlit 配置（可选）
    └── config.toml
```

## 🛠️ 技术栈

- **框架**：Streamlit
- **数据处理**：Pandas
- **数据存储**：Excel (xlsx格式)
- **部署**：Streamlit Cloud / GitHub

## 📝 使用方法

1. **搜索车型**：在搜索框输入车型名称（支持模糊搜索）
2. **查看结果**：系统会自动显示匹配的车型及其雨刷规格
3. **浏览全部**：展开"查看完整数据列表"查看所有数据

## 🔄 更新数据

要更新雨刷数据：

1. 编辑 `wiper_data.xlsx` 文件
2. 确保保持列名不变：品牌、车型、年份、主驾、副驾、接头、后雨刷
3. 保存文件
4. 如果是本地运行，刷新页面即可（Streamlit 会自动重新加载）
5. 如果是云端部署，将更新推送到 GitHub，Streamlit Cloud 会自动更新

## 💡 开发提示

### 添加新功能

在 `app.py` 中添加代码，Streamlit 会自动检测更改并提示重新运行。

### 调试

使用 Streamlit 的开发者工具：
- 按下 `R` 键重新运行应用
- 按下 `C` 键清除缓存

### 性能优化

- 使用 `@st.cache_data` 装饰器缓存数据加载
- 大数据集时考虑分页显示

## 🐛 常见问题

**Q: 为什么看不到数据？**
A: 确保 wiper_data.xlsx 文件在正确的位置，并包含正确的列名。

**Q: 如何修改界面样式？**
A: 在 app.py 中的 `st.markdown()` CSS 部分修改样式。

**Q: 部署到 Streamlit Cloud 失败？**
A: 检查 requirements.txt 文件是否正确，确保所有依赖都列出。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ using Streamlit**
