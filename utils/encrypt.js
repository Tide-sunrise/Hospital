// 将公钥内容作为字符串嵌入代码中
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWMohPHMTSNqInq18yZcw3r91g
qmZ57lE53pxpEBPcSNaA2vZa2LM2ccmULgFgX2t3b4bdu6Ur+RPFVGiQdxd2pqAt
yEGyToCITKStNFJtwpQ9PWEVES+3+tC1IWT+TnqLYiTYBkY2+RTVQZg1Wa9iktTj
KLdCLa8OUtJCfpMrywIDAQAB
-----END PUBLIC KEY-----`;

// 将 PEM 格式的公钥转换为 CryptoKey 对象
async function importPublicKey(pem) {
	// 移除 PEM 标头和尾部，解码 Base64 字符串为二进制 DER 数据
	const binaryDerString = window.atob(pem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, ''));
	const binaryDer = str2ab(binaryDerString);

	return window.crypto.subtle.importKey(
		'spki', // 公钥格式
		binaryDer, // DER 格式的公钥二进制数据
		{
			name: 'RSA-OAEP', // 使用 RSA-OAEP 算法
			hash: 'SHA-256' // 使用 SHA-256 哈希
		},
		true, // 密钥可以导出
		['encrypt'] // 该密钥的用途为加密
	);
}

// 将字符串转换为 ArrayBuffer
function str2ab(str) {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

// 使用公钥加密明文并返回加密后的 Base64 字符串
export async function encryptWithPublicKey(cleartext) {
	// 导入公钥
	const publicKey = await importPublicKey(publicKeyPem);

	// 将明文数据转换为字节数组
	const encoder = new TextEncoder();
	const data = encoder.encode(cleartext);

	// 使用公钥进行加密
	const encrypted = await window.crypto.subtle.encrypt({
			name: 'RSA-OAEP' // 加密算法
		},
		publicKey, // 公钥
		data // 明文数据
	);

	// 将加密后的数据转换为 Base64 字符串并返回
	return window.btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}