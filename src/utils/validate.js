/* 验证用户名 */
export function validUsername(str) {
	const valid_map = ['admin', 'editor'];
	return valid_map.indexOf(str.trim()) >= 0;
}

/* 是否是外部路径 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}
