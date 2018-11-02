<template>
    <ul class="bookmark-list">
        <li
            class="bookmark-list__item"
            v-for="bookmark in bookmarks"
            :key="bookmark.id"
        >
            <bookmark-item :bookmark="bookmark"></bookmark-item>
        </li>
    </ul>
</template>

<script>
    import BookmarkItem from './BookmarkItem';
    
    export default {
        props: ['bookmarks'],
        components: {
            BookmarkItem
        }
    };
</script>

<style lang="scss">
    .bookmark-list {
        list-style: none;
    }
</style>