<template>
    <div>
        <h2>Tagged with: {{ tagName }}</h2>
        <bookmark-list :bookmarks="getBookmarksWithTagName(tagName)"></bookmark-list>
    </div>
</template>

<script>
    import BookmarkList from './BookmarkList';
    
    export default {
      props: ['tagName'],
      components: {
          BookmarkList,
      },
      methods: {
          getBookmarksWithTagName(tagName) {
              let tagWithName = this.$store.getters.tagWithName(tagName);
              
              if (!tagWithName) {
                  return [];
              }
              
              return this.$store.getters.bookmarksWithTagIds([tagWithName.id]);
          },
      },
    }
</script>