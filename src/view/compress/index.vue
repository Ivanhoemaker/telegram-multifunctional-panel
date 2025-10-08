<script setup>
import { ref } from "vue";
import VideoItem from "./VideoItem.vue";
import electronAPI from "../../utils/electronAPI";
const videoList = ref([]);

const onClickAction = async () => {
    const result = await electronAPI.dialog.showOpenDialogItemName();
    videoList.value = result;
    console.log("🚀 ~ onClickAction ~ result:", result)
};

</script>
<template>
    <div v-if="videoList.length > 0" class="container">
        <div v-for="item in videoList" class="vid
        <template #default></template>eo-item">
            <VideoItem :key="item.fullPath" :item="item" />
        </div>
        <!-- base64展示图片 -->
        <!-- <img :src="item.preview" v-for="item in videoList" :key="item.title" /> -->
    </div>
    <div v-else>
        <v-empty-state action-text="选择文件夹"
            image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
            @click:action="onClickAction"></v-empty-state>
    </div>
</template>

<style scoped>
.container {
    padding: 16px;
    display: flex;
    gap: 16px;
}

.video-item {}
</style>
