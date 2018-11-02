<template>
    <div>
        <h2>Favorites</h2>
        <bookmark-list :bookmarks="favoriteBookmarks"></bookmark-list>
    </div>
</template>

<script>
    import BookmarkList from './BookmarkList';
    
    export default {
      components: {
          BookmarkList,
      },
      computed: {
          favoriteBookmarks() {
              return this.$store.getters.favoriteBookmarks;
          }
      },
    }
</script>