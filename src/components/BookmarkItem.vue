<template>
    <div class="bookmark">
        <bookmark-form
            v-if="isEditing"
            :initialBookmark="bookmark"
            @submit="handleSubmitBookmarkForm"
            @delete="deleteBookmark(bookmark.id)"
            @cancel="isEditing = !isEditing"
        />
        <template v-else>
            <div class="bookmark__title-row">
                <Button
                    class="bookmark__favorite"
                    :class="{ 'is-favorite': bookmark.isFavorite }"
                    @click="setBookmarkIsFavorite(bookmark.id, !bookmark.isFavorite)"
                >
                    ★
                </Button>
                <div class="bookmark__title">
                    <a
                        v-if="bookmark.url"
                        :href="bookmark.url"
                        target="_blank"
                        class="bookmark__link"
                    >
                        {{ bookmark.title || bookmark.url }}
                    </a>
                    <span v-else>
                        {{ bookmark.title || bookmark.url }}
                    </span>
                </div>
                <div class="bookmark__actions">
                    <Button @click="startEditing">
                        edit
                    </Button>
                    <Button
                        v-if="bookmark.isToRead"
                        @click="setBookmarkIsToRead(bookmark.id, false)"
                    >
                        mark as read
                    </Button>
                    <Button
                        v-if="!bookmark.isArchived"
                        @click="setBookmarkIsArchived(bookmark.id, true)"
                    >
                        archive
                    </Button>
                    <Button
                        v-if="bookmark.isArchived"
                        @click="setBookmarkIsArchived(bookmark.id, false)"
                    >    
                        unarchive
                    </Button>
                </div>
            </div>
            <tag-list
                class="bookmark__tags"
                :tags="tags"
            />
        </template>
    </div>
</template>

<script>
    import Button from './Button';
    import BookmarkForm from './BookmarkForm';
    import TagList from './TagList';
    
    export default {
        props: ['bookmark'],
        components: {
            BookmarkForm,
            TagList,
            Button,
        },
        data: () => {
            return {
                isEditing: false,
            };
        },
        computed: {
            tags() {
                return this.$store.getters.tagsOfBookmarkWithId(this.$props.bookmark.id);
            },
            bookmarkSource() {
                return new URL(this.bookmark.url).hostname;
            }
        },
        methods: {
            startEditing() {
                this.isEditing = true;
            },
            handleSubmitBookmarkForm(bookmark) {
                this.$store.commit('updateBookmark', bookmark);
                this.isEditing = false;
            },
            setBookmarkIsToRead(bookmarkId, isToRead) {
                this.$store.commit('setBookmarkIsToRead', {
                    id: bookmarkId,
                    isToRead,
                });
            },
            setBookmarkIsFavorite(bookmarkId, isFavorite) {
                this.$store.commit('setBookmarkIsFavorite', {
                    id: bookmarkId,
                    isFavorite,
                });
            },
            setBookmarkIsArchived(bookmarkId, isArchived) {
                this.$store.commit('setBookmarkIsArchived', {
                    id: bookmarkId,
                    isArchived,
                });
            },
            deleteBookmark(bookmarkId) {
                this.$store.commit('deleteBookmark', {
                    id: bookmarkId,
                });
            },
        },
    }
</script>

<style lang="scss">
    @import './../styles/settings';
    
    .bookmark {
        margin-bottom: $base-line-height;
    }
    
    .bookmark__title-row {
        display: flex;
        align-items: flex-start;
    }
    
    .bookmark__title {
        flex: 0 1 auto;
        line-height: $base-line-height;
    }
    
    .bookmark__link {
        color: #0044ab;
    }
    
    .bookmark__actions {
        display: flex;
        flex: 1 1 auto;
        justify-content: flex-end;
    }
    
    .bookmark__tags {
        flex: 0 1 100%;
        margin-left: 25px;
    }
    
    .bookmark__favorite {
        color: #ccc;
        font-size: 17px;
        
        &.is-favorite {
            color: gold;
        }
    }
</style>