<template>
    <div class="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
        <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900">Tailwind 测试</h2>
            <p class="text-gray-500">
                如果你看到这个卡片有样式，说明 Tailwind 工作正常
            </p>
        </div>

        <div class="space-y-2">
            <div class="w-full h-4 bg-red-500 rounded"></div>
            <div class="w-full h-4 bg-blue-500 rounded"></div>
            <div class="w-full h-4 bg-green-500 rounded"></div>
        </div>

        <button
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
            测试按钮
        </button>
    </div>
</template>

<script setup>
// 测试组件，无需额外逻辑
</script>
