<template>
    <div>
        <h2>Home</h2>
        <bookmark-list :bookmarks="bookmarks"></bookmark-list>
    </div>
</template>

<script>
    import BookmarkList from './BookmarkList';
    
    export default {
      name: 'app',
      components: {
          BookmarkList,
      },
      computed: {
          bookmarks() {
              return this.$store.getters.activeBookmarks;
          }
      },
    }
</script>