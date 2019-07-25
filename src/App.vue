<template>
    <div class="app">
        <aside class="sidebar">
            <main-menu></main-menu>
        </aside>
        <div class="top-bar">
            <bookmark-url-form :onSubmit="addNewBookmark"></bookmark-url-form>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import MainMenu from './components/MainMenu';
    import BookmarkUrlForm from './components/BookmarkUrlForm';

    export default {
        name: 'app',
        methods: {
            addNewBookmark(newBookmark) {
                this.$store.commit('addBookmark', newBookmark);
            },
        },
        components: {
            MainMenu,
            BookmarkUrlForm,
        },
    }
</script>

<style lang="scss">
    @import './styles/debug-baseline';
    @import './styles/settings';
    
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    body {
        @include debug-baseline($base-line-height);
        font-size: $base-font-size;
        font-family: sans-serif;
    }
    
    h2 {
        line-height: 2 * $base-line-height;
    }
    
    .app {
        max-width: 960px;
        padding-top: $base-line-height;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 150px 1fr;
        grid-template-rows: 2 * $base-line-height 1fr;
    }
    
    .top-bar {
        grid-column: 2 / span 1;
        grid-row: 1 / span 1;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .sidebar {
        grid-column: 1 / span 1;
        grid-row: 2 / -1;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .main {
        grid-column: span 1 / -1;
        grid-row: 2 / -1;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
