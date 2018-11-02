<template>
    <div>
        <h2>Archive</h2>
        <bookmark-list :bookmarks="archivedBookmarks"></bookmark-list>
    </div>
</template>

<script>
    import BookmarkList from './BookmarkList';
    
    export default {
        components: {
            BookmarkList,
        },
        computed: {
          archivedBookmarks() {
              return this.$store.getters.archivedBookmarks;
          }
      },
    }
</script>

<style lang="scss">
    .app {
      
    }
</style>
