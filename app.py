import streamlit as st
import pandas as pd
import os

# 页面配置
st.set_page_config(
    page_title="雨刷尺寸查询系统",
    page_icon="🚗",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# 自定义CSS样式
st.markdown("""
<style>
    .main {
        padding-top: 2rem;
    }
    .stTextInput > div > div > input {
        font-size: 18px;
    }
    h1 {
        color: #1f77b4;
        text-align: center;
        padding-bottom: 1rem;
    }
    .search-container {
        margin-bottom: 2rem;
    }
    .stDataFrame {
        font-size: 16px;
    }
    div[data-testid="stDataFrame"] {
        width: 100%;
    }
    .info-box {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }
</style>
""", unsafe_allow_html=True)

# 标题
st.markdown("# 🚗 雨刷尺寸查询系统")
st.markdown("---")

# 加载数据
@st.cache_data
def load_data():
    """从Excel文件加载数据"""
    try:
        if os.path.exists('wiper_data.xlsx'):
            df = pd.read_excel('wiper_data.xlsx')
            # 确保数据类型正确
            df = df.fillna('-')  # 将空值替换为 '-'
            return df
        else:
            st.error("⚠️ 未找到 wiper_data.xlsx 文件！")
            return pd.DataFrame()
    except Exception as e:
        st.error(f"❌ 读取数据文件时出错: {str(e)}")
        return pd.DataFrame()

# 加载数据
df = load_data()

if not df.empty:
    # 显示数据统计信息
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("品牌数量", df['品牌'].nunique())
    with col2:
        st.metric("车型数量", len(df))
    with col3:
        st.metric("数据更新", "实时")
    
    st.markdown("---")
    
    # 搜索栏
    st.markdown('<div class="search-container">', unsafe_allow_html=True)
    search_term = st.text_input(
        "🔍 请输入车型名称进行搜索",
        placeholder="例如：A4、X5、凯美瑞...",
        key="search_input"
    )
    st.markdown('</div>', unsafe_allow_html=True)
    
    # 搜索逻辑
    if search_term:
        # 模糊搜索车型
        filtered_df = df[df['车型'].str.contains(search_term, case=False, na=False)]
        
        if not filtered_df.empty:
            st.success(f"✅ 找到 {len(filtered_df)} 条相关结果")
            st.dataframe(
                filtered_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "品牌": st.column_config.TextColumn("品牌", width="medium"),
                    "车型": st.column_config.TextColumn("车型", width="medium"),
                    "年份": st.column_config.TextColumn("年份", width="medium"),
                    "主驾": st.column_config.TextColumn("主驾", width="small"),
                    "副驾": st.column_config.TextColumn("副驾", width="small"),
                    "接头": st.column_config.TextColumn("接头", width="small"),
                    "后雨刷": st.column_config.TextColumn("后雨刷", width="small"),
                }
            )
        else:
            st.warning(f"⚠️ 未找到包含 '{search_term}' 的车型")
            st.info("💡 提示：请尝试其他关键词或查看下方完整数据列表")
    else:
        st.info("💡 在上方搜索框输入车型名称开始查询，或浏览下方完整列表")
    
    # 显示完整数据表
    with st.expander("📋 查看完整数据列表", expanded=not bool(search_term)):
        st.dataframe(
            df,
            use_container_width=True,
            hide_index=True,
            column_config={
                "品牌": st.column_config.TextColumn("品牌", width="medium"),
                "车型": st.column_config.TextColumn("车型", width="medium"),
                "年份": st.column_config.TextColumn("年份", width="medium"),
                "主驾": st.column_config.TextColumn("主驾", width="small"),
                "副驾": st.column_config.TextColumn("副驾", width="small"),
                "接头": st.column_config.TextColumn("接头", width="small"),
                "后雨刷": st.column_config.TextColumn("后雨刷", width="small"),
            }
        )
    
    # 页脚
    st.markdown("---")
    st.markdown(
        "<div style='text-align: center; color: #666; padding: 1rem;'>"
        "🔧 雨刷尺寸查询系统 | 数据来源: wiper_data.xlsx"
        "</div>",
        unsafe_allow_html=True
    )
else:
    st.error("❌ 无法加载数据，请确保 wiper_data.xlsx 文件存在且格式正确！")
    st.info("""
    📝 Excel文件应包含以下列：
    - 品牌
    - 车型
    - 年份
    - 主驾
    - 副驾
    - 接头
    - 后雨刷
    """)
