// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
// 注意：PASSWORD 环境变量是必需的，所有部署都必须设置密码以确保安全
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 存储验证状态的键名
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 验证有效期（90天，约3个月）
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API站点配置
const API_SITES = {
    "iqiyizyapi.com": {
      "name": "🎬-爱奇艺-",
      "api": "https://iqiyizyapi.com/api.php/provide/vod",
      "detail": "https://iqiyizyapi.com"
    },
    "dbzy.tv": {
      "name": "🎬豆瓣资源",
      "api": "https://caiji.dbzy5.com/api.php/provide/vod",
      "detail": "https://dbzy.tv"
    },
    "mtzy.me": {
      "name": "🎬茅台资源",
      "api": "https://caiji.maotaizy.cc/api.php/provide/vod",
      "detail": "https://mtzy.me"
    },
    "wolongzyw.com": {
      "name": "🎬卧龙资源",
      "api": "https://wolongzyw.com/api.php/provide/vod",
      "detail": "https://wolongzyw.com"
    },
    "ikunzy.com": {
      "name": "🎬iKun资源",
      "api": "https://ikunzyapi.com/api.php/provide/vod",
      "detail": "https://ikunzy.com"
    },
    "dyttzyapi.com": {
      "name": "🎬电影天堂",
      "api": "http://caiji.dyttzyapi.com/api.php/provide/vod",
      "detail": "http://caiji.dyttzyapi.com"
    },
    "www.maoyanzy.com": {
      "name": "🎬猫眼资源",
      "api": "https://api.maoyanapi.top/api.php/provide/vod",
      "detail": "https://www.maoyanzy.com"
    },
    "cj.lzcaiji.com": {
      "name": "🎬量子资源",
      "api": "https://cj.lzcaiji.com/api.php/provide/vod",
      "detail": "https://cj.lzcaiji.com"
    },
    "360zy.com": {
      "name": "🎬360 资源",
      "api": "https://360zyzz.com/api.php/provide/vod",
      "detail": "https://360zy.com"
    },
    "jszyapi.com": {
      "name": "🎬极速资源",
      "api": "https://jszyapi.com/api.php/provide/vod",
      "detail": "https://jszyapi.com"
    },
    "www.moduzy.net": {
      "name": "🎬魔都资源",
      "api": "https://www.mdzyapi.com/api.php/provide/vod",
      "detail": "https://www.moduzy.net"
    },
    "ffzyapi.com": {
      "name": "🎬非凡资源",
      "api": "https://api.ffzyapi.com/api.php/provide/vod",
      "detail": "https://cj.ffzyapi.com"
    },
    "bfzy.tv": {
      "name": "🎬暴风资源",
      "api": "https://bfzyapi.com/api.php/provide/vod",
      "detail": "https://bfzy.tv"
    },
    "zuida.xyz": {
      "name": "🎬最大资源",
      "api": "https://api.zuidapi.com/api.php/provide/vod",
      "detail": "https://zuida.xyz"
    },
    "wujinzy.me": {
      "name": "🎬无尽资源",
      "api": "https://api.wujinapi.me/api.php/provide/vod",
      "detail": "https://wujinzy.com"
    },
    "xinlangapi.com": {
      "name": "🎬新浪资源",
      "api": "https://api.xinlangapi.com/xinlangapi.php/provide/vod",
      "detail": "https://xinlangapi.com"
    },
    "api.wwzy.tv": {
      "name": "🎬旺旺资源",
      "api": "https://api.wwzy.tv/api.php/provide/vod",
      "detail": "https://api.wwzy.tv"
    },
    "www.subozy.com": {
      "name": "🎬速播资源",
      "api": "https://subocaiji.com/api.php/provide/vod",
      "detail": "https://www.subozy.com"
    },
    "jinyingzy.com": {
      "name": "🎬金鹰点播",
      "api": "https://jinyingzy.com/api.php/provide/vod",
      "detail": "https://jinyingzy.com"
    },
    "p2100.net": {
      "name": "🎬飘零资源",
      "api": "https://p2100.net/api.php/provide/vod",
      "detail": "https://p2100.net"
    },
    "api.ukuapi88.com": {
      "name": "🎬U酷影视",
      "api": "https://api.ukuapi88.com/api.php/provide/vod",
      "detail": "https://www.ukuzy.com"
    },
    "api.guangsuapi.com": {
      "name": "🎬光速资源",
      "api": "https://api.guangsuapi.com/api.php/provide/vod",
      "detail": "https://api.guangsuapi.com"
    },
    "www.hongniuzy.com": {
      "name": "🎬红牛资源",
      "api": "https://www.hongniuzy2.com/api.php/provide/vod",
      "detail": "https://www.hongniuzy.com"
    },
    "caiji.moduapi.cc": {
      "name": "🎬魔都动漫",
      "api": "https://caiji.moduapi.cc/api.php/provide/vod",
      "detail": "https://caiji.moduapi.cc"
    },
    "www.ryzyw.com": {
      "name": "🎬如意资源",
      "api": "https://pz.168188.dpdns.org/?url=https://cj.rycjapi.com/api.php/provide/vod",
      "detail": "https://www.ryzyw.com"
    },
    "www.haohuazy.com": {
      "name": "🎬豪华资源",
      "api": "https://pz.168188.dpdns.org/?url=https://hhzyapi.com/api.php/provide/vod",
      "detail": "https://www.haohuazy.com"
    },
    "bdzy1.com": {
      "name": "🎬百度云zy",
      "api": "https://pz.168188.dpdns.org/?url=https://api.apibdzy.com/api.php/provide/vod",
      "detail": "https://bdzy1.com"
    },
    "lovedan.net": {
      "name": "🎬艾旦影视",
      "api": "https://pz.168188.dpdns.org/?url=https://lovedan.net/api.php/provide/vod",
      "detail": "https://lovedan.net"
    }
    //ARCHIVE https://telegra.ph/APIs-08-12
};

// 定义合并方法
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;


// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 只拼接参数部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大获取页数
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接参数部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    // allowedApiDomains 不再需要，因为所有请求都通过内部代理
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult' // 用于标记成人内容的属性名
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = false;
