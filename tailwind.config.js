/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
        "./src/components/**/*.{js,vue,ts}",
        "./src/layout/**/*.{js,vue,ts}",
        "./src/view/**/*.{js,vue,ts}",
    ],
    important: true, // 确保 Tailwind 样式不被其他框架覆盖
    corePlugins: {
        preflight: false, // 禁用 Tailwind 的 CSS 重置，避免与 Vuetify 冲突
    },
    theme: {
        extend: {},
    },
    plugins: [],
};
