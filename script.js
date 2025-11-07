// 存储Excel数据
let wiperData = [];

// DOM元素
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const downloadTemplate = document.getElementById('downloadTemplate');

// 文件上传处理
fileInput.addEventListener('change', handleFileUpload);

// 搜索功能
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 下载模板
downloadTemplate.addEventListener('click', downloadExcelTemplate);

// 处理Excel文件上传
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    fileName.textContent = `已加载: ${file.name}`;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // 读取第一个工作表
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            wiperData = jsonData;
            
            // 启用搜索功能
            searchInput.disabled = false;
            searchBtn.disabled = false;
            
            // 显示成功消息
            resultsDiv.innerHTML = `
                <div class="no-results">
                    ✅ 成功加载 ${wiperData.length} 条数据<br>
                    请在搜索栏输入车型名称进行查询
                </div>
            `;
        } catch (error) {
            alert('读取Excel文件失败，请确保文件格式正确！');
            console.error(error);
        }
    };
    reader.readAsArrayBuffer(file);
}

// 执行搜索
function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    
    if (!keyword) {
        alert('请输入搜索关键词');
        return;
    }
    
    // 搜索匹配的数据（搜索品牌、车型字段）
    const results = wiperData.filter(item => {
        const brand = (item['品牌'] || '').toString().toLowerCase();
        const model = (item['车型'] || '').toString().toLowerCase();
        return brand.includes(keyword) || model.includes(keyword);
    });
    
    displayResults(results, keyword);
}

// 显示搜索结果
function displayResults(results, keyword) {
    if (results.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                😕 未找到与 "${keyword}" 相关的车型<br>
                请尝试其他关键词
            </div>
        `;
        return;
    }
    
    let html = '';
    results.forEach(item => {
        html += `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-title">
                        ${item['品牌'] || '-'} ${item['车型'] || '-'}
                    </div>
                    <div class="result-year">${item['年份'] || '-'}</div>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">主驾驶位</span>
                        <span class="detail-value">${item['主驾'] || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">副驾驶位</span>
                        <span class="detail-value">${item['副驾'] || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">接头类型</span>
                        <span class="detail-value">${item['接头'] || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">后雨刷</span>
                        <span class="detail-value">${item['后雨刷'] || '-'}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// 下载Excel模板
function downloadExcelTemplate() {
    // 创建示例数据
    const templateData = [
        {
            '品牌': '丰田',
            '车型': '卡罗拉',
            '年份': '2020-2023',
            '主驾': '26寸',
            '副驾': '16寸',
            '接头': 'U型',
            '后雨刷': '12寸'
        },
        {
            '品牌': '本田',
            '车型': '雅阁',
            '年份': '2018-2022',
            '主驾': '26寸',
            '副驾': '18寸',
            '接头': 'U型',
            '后雨刷': '无'
        },
        {
            '品牌': '大众',
            '车型': '迈腾',
            '年份': '2019-2023',
            '主驾': '24寸',
            '副驾': '19寸',
            '接头': 'U型',
            '后雨刷': '无'
        },
        {
            '品牌': '奔驰',
            '车型': 'C级',
            '年份': '2015-2020',
            '主驾': '24寸',
            '副驾': '24寸',
            '接头': 'U型',
            '后雨刷': '无'
        },
        {
            '品牌': '宝马',
            '车型': '3系',
            '年份': '2016-2021',
            '主驾': '24寸',
            '副驾': '20寸',
            '接头': 'U型',
            '后雨刷': '无'
        }
    ];
    
    // 创建工作簿
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '雨刷数据');
    
    // 设置列宽
    ws['!cols'] = [
        { wch: 10 },  // 品牌
        { wch: 15 },  // 车型
        { wch: 12 },  // 年份
        { wch: 10 },  // 主驾
        { wch: 10 },  // 副驾
        { wch: 10 },  // 接头
        { wch: 10 }   // 后雨刷
    ];
    
    // 下载文件
    XLSX.writeFile(wb, '雨刷尺寸数据模板.xlsx');
}

