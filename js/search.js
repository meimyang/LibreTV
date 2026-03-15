/**
 * 优化后的搜索函数 - 提升结果精准度
 * @param {string} apiId - API标识（内置/自定义）
 * @param {string} query - 搜索关键词
 * @param {object} options - 精准搜索配置（新增）
 * @param {boolean} options.exactMatch - 是否开启关键词精确匹配
 * @param {boolean} options.filterEmpty - 是否过滤空内容结果
 * @param {boolean} options.removeDuplicate - 是否去重
 * @returns {Array} 精准过滤后的搜索结果
 */
async function searchByAPIAndKeyWord(apiId, query, options = {}) {
    // 默认精准搜索配置
    const {
        exactMatch = true,    // 开启精确匹配
        filterEmpty = true,   // 过滤空内容
        removeDuplicate = true // 结果去重
    } = options;

    try {
        let apiUrl, apiName, apiBaseUrl;
        
        // 处理自定义API
        if (apiId.startsWith('custom_')) {
            const customIndex = apiId.replace('custom_', '');
            const customApi = getCustomApiInfo(customIndex);
            if (!customApi) return [];
            
            apiBaseUrl = customApi.url;
            // 优化1：API调用参数精准化 - 区分编码方式（适配不同API）
            // 可在自定义API配置中增加needEncode字段，控制是否编码
            const encodedQuery = customApi.needEncode !== false 
                ? encodeURIComponent(query) 
                : query;
            apiUrl = apiBaseUrl + API_CONFIG.search.path + encodedQuery;
            apiName = customApi.name;
        } else {
            // 内置API
            if (!API_SITES[apiId]) return [];
            apiBaseUrl = API_SITES[apiId].api;
            // 优化1：API调用参数精准化 - 适配内置API的编码规则
            const encodedQuery = API_SITES[apiId].needEncode !== false 
                ? encodeURIComponent(query) 
                : query;
            apiUrl = apiBaseUrl + API_CONFIG.search.path + encodedQuery;
            apiName = API_SITES[apiId].name;
        }

        // 调试日志：打印最终调用的URL，方便排查参数问题
        console.log(`[精准搜索] 调用API: ${apiId}, URL: ${apiUrl}, 关键词: ${query}`);
        
        // 添加超时处理
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        // 添加鉴权参数到代理URL
        const proxiedUrl = await window.ProxyAuth?.addAuthToProxyUrl ? 
            await window.ProxyAuth.addAuthToProxyUrl(PROXY_URL + encodeURIComponent(apiUrl)) :
            PROXY_URL + encodeURIComponent(apiUrl);
        
        const response = await fetch(proxiedUrl, {
            headers: API_CONFIG.search.headers,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.warn(`[精准搜索] API响应异常: ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        
        if (!data || !data.list || !Array.isArray(data.list) || data.list.length === 0) {
            return [];
        }

        // 优化2：结果预处理 - 先格式化，再精准过滤
        let results = data.list.map(item => ({
            ...item,
            source_name: apiName,
            source_code: apiId,
            api_url: apiId.startsWith('custom_') ? getCustomApiInfo(apiId.replace('custom_', ''))?.url : undefined
        }));

        // ========== 核心精准过滤逻辑 ==========
        // 1. 精确匹配过滤：只保留包含完整关键词的结果（可匹配标题/内容/关键词字段）
        if (exactMatch && query.trim()) {
            const lowerQuery = query.trim().toLowerCase();
            results = results.filter(item => {
                // 自定义需要匹配的字段（根据实际API返回的字段调整）
                const matchFields = [
                    item.title || '', 
                    item.content || '', 
                    item.keywords || '',
                    item.description || ''
                ];
                // 精确匹配：至少一个字段包含完整关键词（忽略大小写）
                return matchFields.some(field => 
                    field.toLowerCase().includes(lowerQuery)
                );
            });
        }

        // 2. 过滤空内容/无效结果
        if (filterEmpty) {
            results = results.filter(item => {
                // 排除标题/内容为空的结果
                const hasValidTitle = item.title && item.title.trim().length > 0;
                const hasValidContent = item.content && item.content.trim().length > 0;
                // 排除明显的广告/无关标识
                const isNotAd = !item.title?.includes('广告') && !item.content?.includes('推广');
                return (hasValidTitle || hasValidContent) && isNotAd;
            });
        }

        // 3. 去重：根据唯一标识（如id/链接）去重
        if (removeDuplicate) {
            const uniqueKeys = new Set();
            results = results.filter(item => {
                // 自定义去重键（优先用唯一id，无则用链接/标题）
                const uniqueKey = item.id || item.url || item.title?.trim();
                if (!uniqueKey) return true; // 无唯一标识则保留
                if (uniqueKeys.has(uniqueKey)) return false;
                uniqueKeys.add(uniqueKey);
                return true;
            });
        }
        
        // 获取总页数
        const pageCount = data.pagecount || 1;
        const pagesToFetch = Math.min(pageCount - 1, API_CONFIG.search.maxPages - 1);
        
        // 如果有额外页数，获取更多页的结果（同样应用精准过滤）
        if (pagesToFetch > 0) {
            const additionalPagePromises = [];
            
            for (let page = 2; page <= pagesToFetch + 1; page++) {
                const pagePromise = (async () => {
                    try {
                        const pageController = new AbortController();
                        const pageTimeoutId = setTimeout(() => pageController.abort(), 15000);
                        
                        // 优化1：分页URL参数精准化
                        const encodedQuery = (apiId.startsWith('custom_') 
                            ? getCustomApiInfo(apiId.replace('custom_', ''))?.needEncode !== false
                            : API_SITES[apiId].needEncode !== false)
                            ? encodeURIComponent(query) 
                            : query;
                        
                        const pageUrl = apiBaseUrl + API_CONFIG.search.pagePath
                            .replace('{query}', encodedQuery)
                            .replace('{page}', page);
                        
                        const proxiedPageUrl = await window.ProxyAuth?.addAuthToProxyUrl ? 
                            await window.ProxyAuth.addAuthToProxyUrl(PROXY_URL + encodeURIComponent(pageUrl)) :
                            PROXY_URL + encodeURIComponent(pageUrl);
                        
                        const pageResponse = await fetch(proxiedPageUrl, {
                            headers: API_CONFIG.search.headers,
                            signal: pageController.signal
                        });
                        
                        clearTimeout(pageTimeoutId);
                        
                        if (!pageResponse.ok) return [];
                        
                        const pageData = await pageResponse.json();
                        
                        if (!pageData || !pageData.list || !Array.isArray(pageData.list)) return [];
                        
                        // 对分页结果同样应用精准过滤逻辑
                        let pageResults = pageData.list.map(item => ({
                            ...item,
                            source_name: apiName,
                            source_code: apiId,
                            api_url: apiId.startsWith('custom_') ? getCustomApiInfo(apiId.replace('custom_', ''))?.url : undefined
                        }));

                        // 复用精准过滤逻辑（和第一页一致）
                        if (exactMatch && query.trim()) {
                            const lowerQuery = query.trim().toLowerCase();
                            pageResults = pageResults.filter(item => {
                                const matchFields = [item.title || '', item.content || '', item.keywords || ''];
                                return matchFields.some(field => field.toLowerCase().includes(lowerQuery));
                            });
                        }
                        if (filterEmpty) {
                            pageResults = pageResults.filter(item => 
                                (item.title && item.title.trim()) || (item.content && item.content.trim())
                            );
                        }
                        
                        return pageResults;
                    } catch (error) {
                        console.warn(`API ${apiId} 第${page}页搜索失败:`, error);
                        return [];
                    }
                })();
                
                additionalPagePromises.push(pagePromise);
            }
            
            const additionalResults = await Promise.all(additionalPagePromises);
            
            additionalResults.forEach(pageResults => {
                if (pageResults.length > 0) {
                    results.push(...pageResults);
                }
            });

            // 最终去重（合并所有分页后再次去重）
            if (removeDuplicate && results.length > 0) {
                const uniqueKeys = new Set();
                results = results.filter(item => {
                    const uniqueKey = item.id || item.url || item.title?.trim();
                    if (!uniqueKey) return true;
                    if (uniqueKeys.has(uniqueKey)) return false;
                    uniqueKeys.add(uniqueKey);
                    return true;
                });
            }
        }
        
        return results;
    } catch (error) {
        console.warn(`API ${apiId} 搜索失败:`, error);
        return [];
    }
}

// ========== 使用示例 ==========
// 调用时可自定义精准搜索规则
// searchByAPIAndKeyWord('baidu', 'JavaScript教程', {
//     exactMatch: true,    // 开启精确匹配
//     filterEmpty: true,   // 过滤空内容
//     removeDuplicate: true // 结果去重
// });
