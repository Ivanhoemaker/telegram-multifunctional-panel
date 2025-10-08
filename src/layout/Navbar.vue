<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTelegramStore } from "../stores/telegram";
import LanguageSelector from "../components/LanguageSelector.vue";
const { t } = useI18n();
const showDownloader = ref(false);
const telegramStore = useTelegramStore();

// 检查登录状态
onMounted(async () => {
    showDownloader.value = await telegramStore.checkAuthStatus();
});

// 退出登录处理
async function handleLogout() {
    try {
        await telegramStore.logout();
        showDownloader.value = false;
    } catch (error) {
        console.error("退出登录失败:", error);
    }
}
</script>
<template>
    <v-container class="d-flex align-center pa-0 gradient-app-bar" fluid>
        <div class="d-flex align-center">
            <v-avatar class="me-3" size="40">
                <v-icon size="24" color="white">mdi-telegram</v-icon>
            </v-avatar>
            <div>
                <v-app-bar-title class="text-h6 font-weight-bold">
                    {{ $t("app.title") }}
                </v-app-bar-title>
                <div class="text-caption opacity-80">
                    {{ $t("app.description") }}
                </div>
            </div>
        </div>

        <v-spacer></v-spacer>
        <div class="d-flex align-center">
            <!-- 语言选择器 -->
            <LanguageSelector class="me-2" />

            <!-- 项目链接按钮 -->
            <v-btn icon variant="text"
                :href="'https://github.com/just-another-account/electron-telegram-channel-downloader'" target="_blank"
                class="me-1" size="large">
                <v-icon color="white">mdi-github</v-icon>
                <v-tooltip activator="parent" location="bottom">
                    {{ $t("common.sourceCode") }}
                </v-tooltip>
                <template #append></template>
            </v-btn>

            <v-btn icon variant="text" :href="'https://t.me/oooooh_hooooo'" target="_blank" class="me-1" size="large">
                <v-icon color="white">mdi-send</v-icon>
                <v-tooltip activator="parent" location="bottom">
                    {{ $t("common.developer") }}
                </v-tooltip>
            </v-btn>

            <v-btn icon variant="text" :href="'https://t.me/channel_downloader_chat'" target="_blank" class="me-2"
                size="large">
                <v-icon color="white">mdi-chat</v-icon>
                <v-tooltip activator="parent" location="bottom">
                    {{ $t("common.support") }}
                </v-tooltip>
            </v-btn>

            <v-btn icon variant="text" @click="showTokenDialog = true" class="me-2" size="large">
                <v-icon color="white">mdi-key-variant</v-icon>
                <v-tooltip activator="parent" location="bottom">
                    {{ $t("common.viewToken") }}
                </v-tooltip>
            </v-btn>

            <v-btn icon variant="text" @click="handleLogout" size="large">
                <v-icon color="white">mdi-logout-variant</v-icon>
                <v-tooltip activator="parent" location="bottom">
                    {{ $t("common.logout") }}
                </v-tooltip>
            </v-btn>
        </div>
    </v-container>
</template>

<style scoped>
/* 现代渐变应用栏 */
.gradient-app-bar {
    background: linear-gradient(135deg,
            rgb(var(--v-theme-gradient-start)) 0%,
            rgb(var(--v-theme-gradient-end)) 100%) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}
</style>
