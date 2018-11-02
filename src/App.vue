<template>
    <div class="app">
        <aside class="sidebar">
            <main-menu></main-menu>
        </aside>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import MainMenu from './components/MainMenu';
    import BookmarkForm from './components/BookmarkForm';

    export default {
        name: 'app',
        components: {
            MainMenu,
            BookmarkForm,
        },
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    body {
        font-family: sans-serif;
    }
    
    h2 {
        line-height: 48px;
    }
    
    .app {
        display: grid;
        grid-template-columns: 150px 1fr;
        grid-template-rows: 48px 1fr;
    }
    
    .sidebar {
        grid-column: 1 / span 1;
        grid-row: 2 / -1;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .main {
        grid-column: span 1 / -1;
        grid-row: 1 / -1;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
