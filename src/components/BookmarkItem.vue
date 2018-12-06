<template>
    <div class="bookmark">
        <bookmark-form v-if="isEditing" :initialBookmark="bookmark" :onSubmit="handleSubmitBookmarkForm"></bookmark-form>
        <template v-else>
            <div class="bookmark__title-row">
                <button
                    class="button button--favorite"
                    :class="{ 'is-favorite': bookmark.isFavorite }"
                    v-on:click="setBookmarkIsFavorite(bookmark.id, !bookmark.isFavorite)"
                >
                    ★
                </button>
                <div class="bookmark__title">
                    <a class="bookmark__link" v-if="bookmark.url" :href="bookmark.url" target="_blank">
                        {{ bookmark.title || bookmark.url }}
                    </a>
                    <span v-else>
                        {{ bookmark.title || bookmark.url }}
                    </span>
                </div>
                <div class="bookmark__actions">
                    <button class="button" v-on:click="startEditing">edit</button>
                    <button class="button" v-if="bookmark.isToRead" v-on:click="setBookmarkIsToRead(bookmark.id, false)">mark as read</button>
                    <button class="button" v-if="!bookmark.isArchived" v-on:click="setBookmarkIsArchived(bookmark.id, true)">archive</button>
                    <button class="button" v-if="bookmark.isArchived" v-on:click="setBookmarkIsArchived(bookmark.id, false)">unarchive</button>
                    <button class="button" v-on:click="deleteBookmark(bookmark.id)">delete</button>
                </div>
            </div>
            <tag-list class="bookmark__tags" :tags="tags"></tag-list>
        </template>
    </div>
</template>

<script>
    import BookmarkForm from './BookmarkForm';
    import TagList from './TagList';
    
    export default {
        props: ['bookmark'],
        components: {
            BookmarkForm,
            TagList,
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
                return new URL(this.$props.bookmark.url).hostname;
            }
        },
        methods: {
            startEditing() {
                this.$data.isEditing = true;
            },
            handleSubmitBookmarkForm() {
                this.$data.isEditing = false;
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
    
    .button {
        display: block;
        padding-right: 5px;
        padding-left: 5px;
        line-height: $base-line-height;
        
        background-color: transparent;
        white-space: nowrap;
        border: none;
        outline: none;
        
        cursor: pointer;
    }
    
    .button--favorite {
        color: #ccc;
        font-size: 17px;
        
        &.is-favorite {
            color: gold;
        }
    }
</style>