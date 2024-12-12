export function formatDateToChinese(date) {
	const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
	const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

	let dayOfWeek = daysOfWeek[date.getDay()]; // 获取星期几并映射到中文
	let month = months[date.getMonth()]; // 获取月份并确保两位数表示
	let day = date.getDate().toString();

	let ans = {
		week: '周' + dayOfWeek,
		date: `${month}-${day}`,
	}
	return ans;
}

export function convertToCurrentYearDate(dateStr) {
    // 获取当前年份
    const currentYear = new Date().getFullYear();
    
    // 分割输入的日期字符串
    const [month, day] = dateStr.split('-');
    
    // 创建新的 Date 对象
    const date = new Date(currentYear, month - 1, day);
    
    return date;
}