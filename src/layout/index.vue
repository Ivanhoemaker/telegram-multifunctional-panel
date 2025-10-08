<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./Navbar.vue";
import { useLayoutShowStore } from "../stores/layoutshow";

const layoutShowStore = useLayoutShowStore();
const route = useRoute();

// 根据当前路由计算选中的导航项
const selectedItem = computed(() => {
    const routeName = route.name;
    switch (routeName) {
        case "Mainscreen":
            return "myfiles";
        case "User":
            return "shared";
        case "controlPanel":
            return "starred";
        default:
            return "myfiles";
    }
});
</script>

<template>
    <div class="flex ">

        <v-layout>
            <v-navigation-drawer expand-on-hover permanent rail>
                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                        subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="compact" nav v-model="selectedItem">
                    <v-list-item prepend-icon="mdi-folder" title="文件下载" value="myfiles" to="/"
                        :active="selectedItem === 'myfiles'"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" to="/user"
                        :active="selectedItem === 'shared'"></v-list-item>
                    <v-list-item prepend-icon="mdi-star" title="操控台" value="starred" to="/controlPanel"
                        :active="selectedItem === 'starred'"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <div class="flex flex-col gap-3 ">
                    <Navbar />
                    <RouterView v-slot="{ Component, route }">
                        <keep-alive>
                            <component v-if="route.meta.keepAlive" :is="Component" class="px-3 py-3 " />
                        </keep-alive>
                        <component v-if="!route.meta.keepAlive" :is="Component" class="px-3 py-3 " />
                    </RouterView>
                </div>
            </v-main>
        </v-layout>
        <!-- <v-tabs slider-color="purple" direction="vertical" v-model="layoutShowStore.show">
                <v-tab value="Mainscreen" to="/">下载内容
                    <template #append></template>
</v-tab>
<v-tab value="user" to="/user">我的TG
    <template #append></template>
</v-tab>
<v-tab value="controlPanel" to="/controlPanel">控制台</v-tab>
</v-tabs> -->


    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: row;
}
</style>
