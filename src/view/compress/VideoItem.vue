<script setup>
import { ref } from "vue";

const show = ref(false);

defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <v-card class="mx-auto" max-width="344">
        <v-img height="200px" :src="item.preview" contain color="primary"></v-img>

        <v-card-title> {{ item.fileName }} </v-card-title>

        <v-card-subtitle> {{ item.fullPath }} </v-card-subtitle>

        <v-card-actions>
            <v-btn color="orange-lighten-2" text="播放"></v-btn>
            <v-btn color="orange-lighten-2" text="视频压缩"></v-btn>
            <v-btn color="orange-lighten-2" text="水印操作"></v-btn>
            <!-- <v-btn color="orange-lighten-2" text="遮盖水印"></v-btn> -->

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                sd123123
            </div>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped></style>
