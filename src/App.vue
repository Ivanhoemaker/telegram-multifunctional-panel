<script setup>
import { ref, onMounted, watch } from "vue";
import "./index.css";
import { useTelegramStore } from "./stores/telegram";
import TelegramLogin from "./components/TelegramLogin.vue";
import DownloadManager from "./components/DownloadManager.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import { useI18n } from "vue-i18n";
import Navbar from "./layout/Navbar.vue";
const { t } = useI18n();

const telegramStore = useTelegramStore();

// Token查看相关
const showTokenDialog = ref(false);
const currentToken = ref("");
const showDownloader = ref(false);
// 检查登录状态
onMounted(async () => {
    showDownloader.value = await telegramStore.checkAuthStatus();
});

// 监听token对话框的打开，更新当前token
watch(showTokenDialog, (newValue) => {
    if (newValue) {
        updateCurrentToken();
    }
});

// 登录成功处理
function handleLoginSuccess() {
    showDownloader.value = true;
}

// Token相关方法
function updateCurrentToken() {
    try {
        const token = telegramStore.getCurrentToken();
        currentToken.value = token || "";
    } catch (error) {
        console.error("获取当前Token失败:", error);
        currentToken.value = "";
    }
}

async function copyToken() {
    try {
        await navigator.clipboard.writeText(currentToken.value);
        // 这里可以添加一个成功提示
        console.log("Token已复制到剪贴板");
    } catch (error) {
        console.error("复制Token失败:", error);
        // 降级方案：选择文本
        try {
            const textArea = document.createElement("textarea");
            textArea.value = currentToken.value;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            console.log("Token已复制到剪贴板（降级方案）");
        } catch (fallbackError) {
            console.error("复制Token失败（降级方案也失败）:", fallbackError);
        }
    }
}
</script>

<template>
    <router-view />
</template>

<style scoped>
/* 现代主内容区域 */
.modern-main {
    background: linear-gradient(180deg,
            rgb(var(--v-theme-background)) 0%,
            rgb(var(--v-theme-surface-variant)) 100%);
    min-height: 100vh;
}

/* 登录容器 */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    padding: 24px;
    overflow: hidden;
    background: linear-gradient(135deg,
            rgb(var(--v-theme-gradient-start)) 0%,
            rgb(var(--v-theme-gradient-end)) 100%);
}

/* 主内容区域 */
.main-content {
    background: rgb(var(--v-theme-background));

}

/* 响应式设计 */
@media (max-width: 960px) {
    .login-container {
        padding: 16px;
        height: 100vh;
        overflow: hidden;
    }

    .gradient-app-bar .v-container {
        padding: 0 16px;
    }
}

/* 添加细腻的动画效果 */
.v-app-bar {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-btn:hover {
    transform: translateY(-1px);
}

/* Token查看对话框样式 */
.token-view-dialog .v-overlay__content {
    margin: 24px;
}

.token-view-card {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.token-view-header {
    background: linear-gradient(135deg,
            rgb(var(--v-theme-gradient-start)) 0%,
            rgb(var(--v-theme-gradient-end)) 100%);
    color: white;
    padding: 24px !important;
    border-radius: 12px 12px 0 0 !important;
}

.token-display .v-field {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace !important;
    font-size: 12px !important;
    line-height: 1.4 !important;
}

.token-display .v-field__input {
    word-break: break-all !important;
    white-space: pre-wrap !important;
}

.v-theme--dark .token-view-card {
    background: rgba(30, 41, 59, 0.98) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 项目链接按钮样式优化 */
.v-btn[href] {
    text-decoration: none !important;
}

.v-btn[href]:hover {
    opacity: 0.8;
}
</style>
