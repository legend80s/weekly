(() => {
	// 创建样式
	const style = document.createElement("style");
	style.textContent = `
        .batch-download-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        .batch-download-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .batch-download-btn.downloading {
            background: #ff9800;
            pointer-events: none;
        }
        .batch-progress {
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 99999;
            background: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: none;
            max-width: 300px;
            font-family: monospace;
            border: 1px solid #ddd;
        }
    `;
	document.head.appendChild(style);

	// 创建下载按钮
	const btn = document.createElement("button");
	btn.className = "batch-download-btn";
	btn.textContent = "📥 批量下载图片";
	document.body.appendChild(btn);

	// 创建进度显示
	const progress = document.createElement("div");
	progress.className = "batch-progress";
	progress.innerHTML = "准备下载...";
	document.body.appendChild(progress);

	// 下载单个图片的函数
	function downloadImage(url, index) {
		return new Promise((resolve, reject) => {
			// 处理相对路径
			const fullUrl = new URL(url, window.location.href).href;

			// 获取文件名
			const fileName =
				url.split("/").pop().split("?")[0] || `image-${index}.jpg`;
			const ext = fileName.split(".").pop().toLowerCase();

			// 如果URL是data URI，直接下载
			if (fullUrl.startsWith("data:")) {
				const link = document.createElement("a");
				link.href = fullUrl;
				link.download = `image-${index}.${fullUrl.split(";")[0].split("/")[1] || "png"}`;
				link.click();
				resolve();
				return;
			}

			// 使用fetch下载图片
			fetch(fullUrl, {
				mode: "cors",
				credentials: "include",
			})
				.then((response) => {
					if (!response.ok) throw new Error(`HTTP ${response.status}`);
					return response.blob();
				})
				.then((blob) => {
					const blobUrl = window.URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = blobUrl;
					link.download =
						fileName || `image-${index}.${blob.type.split("/")[1] || "jpg"}`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					window.URL.revokeObjectURL(blobUrl);
					resolve();
				})
				.catch((error) => {
					console.warn(`下载失败: ${fullUrl}`, error);
					// 降级方案：使用新窗口打开（适用于同源图片）
					window.open(fullUrl, "_blank");
					resolve(); // 继续处理下一张
				});
		});
	}

	// 批量下载函数
	async function batchDownload(selector) {
		const images = document.querySelectorAll(selector);

		if (images.length === 0) {
			alert("没有找到匹配的图片！");
			return;
		}

		// 更新按钮状态
		btn.classList.add("downloading");
		btn.textContent = `下载中 0/${images.length}`;
		progress.style.display = "block";

		const urls = [];
		images.forEach((img, index) => {
			// 优先使用 src，如果没有则尝试 data-src（懒加载）
			const url = img.src || img.dataset.src || img.getAttribute("src");
			if (url) {
				urls.push({ url, index: index + 1 });
			}
		});

		if (urls.length === 0) {
			alert("没有找到有效的图片URL！");
			btn.classList.remove("downloading");
			btn.textContent = "📥 批量下载图片";
			progress.style.display = "none";
			return;
		}

		progress.innerHTML = `找到 ${urls.length} 张图片<br>开始下载...`;

		// 逐个下载，避免浏览器拦截弹窗
		for (let i = 0; i < urls.length; i++) {
			const { url, index } = urls[i];
			progress.innerHTML = `下载中: ${i + 1}/${urls.length}<br>${url.substring(0, 50)}...`;
			btn.textContent = `下载中 ${i + 1}/${urls.length}`;
			await downloadImage(url, index);
			// 添加延迟，避免请求过于频繁
			await new Promise((r) => setTimeout(r, 300));
		}

		// 恢复按钮状态
		btn.classList.remove("downloading");
		btn.textContent = "📥 批量下载图片";
		progress.innerHTML = `✅ 完成！已处理 ${urls.length} 张图片`;
		setTimeout(() => {
			progress.style.display = "none";
		}, 3000);
	}

	// 点击按钮后弹出选择器并开始下载
	btn.addEventListener("click", () => {
		const selector = prompt(
			"请输入要下载图片的CSS选择器：\n\n" +
				"📌 常用示例：\n" +
				"• img              - 所有图片\n" +
				"• .content img     - 内容区域的图片\n" +
				"• #gallery img     - 相册内的图片\n" +
				"• img.lazy         - 懒加载图片\n" +
				'• img[src*="product"] - 特定路径的图片\n',
			"img",
		);

		if (selector) {
			batchDownload(selector);
		}
	});

	// 添加一个小提示（可选）
	console.log("✅ 批量下载图片按钮已添加，点击页面右下角的绿色按钮开始使用！");
})();
