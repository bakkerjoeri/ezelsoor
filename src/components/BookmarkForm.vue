<template>
    <form class="bookmark-form" v-on:submit="onSubmitForm">
        <div class="form-item form-item--text">
            <label class="form-item__label" for="url">Link</label>
            <input class="form-item__input" id="url" name="url" type="text" v-model="bookmark.url" />
        </div>
        
        <div class="form-item form-item--text">
            <label class="form-item__label" for="title">Title</label>
            <input class="form-item__input" id="title" name="title" type="text" v-model="bookmark.title" />
        </div>
        
        <div class="form-item form-item--text">
            <label class="form-item__label" for="summary">Summary</label>
            <input class="form-item__input" id="summary" name="summary" type="text" v-model="bookmark.summary" />
        </div>
        
        <div class="form-item form-item--text">
            <label class="form-item__label" for="tags">Tags</label>
            <input class="form-item__input" id="tags" name="tags" type="text" v-model="tagString" />
        </div>
        
        <div class="form-item form-item--option">
            <input class="form-item__input" id="isToRead" name="isToRead" type="checkbox" v-model="bookmark.isToRead" />
            <label class="form-item__label" for="isToRead">To read</label>
        </div>
        
        <div class="form-item">
            <button type="submit">Save</button>
        </div>
    </form>
</template>

<script>
    import { DEFAULT_BOOKMARK_PROPERTIES } from './../store';
    import ActionButton from './ActionButton';
    
    export default {
        components: {
            ActionButton,
        },
        props: {
            initialBookmark: {
                type: Object,
                default: () => DEFAULT_BOOKMARK_PROPERTIES,
            },
            onSubmit: {
                type: Function,
            }
        },
        data: function() {
            return {
                bookmark: this.initialBookmark,
                tagString: this.$store.getters.tagsOfBookmarkWithId(this.initialBookmark.id).map((tag) => {
                    return tag.name;
                }).join(' '),
            }
        },
        methods: {
            onSubmitForm(event) {
                event.preventDefault();
                this.$props.onSubmit({ ...this.$data.bookmark });
                this.resetForm();
            },
            resetForm() {
                this.$data.bookmark = { ...DEFAULT_BOOKMARK_PROPERTIES };
            }
        }
    }
</script>

<style lang="scss">
    @import './../styles/settings';

    .form-item {
    }
    
    .form-item--text {
        display: flex;
        justify-content: space-between;
        max-width: 300px;
    }
    
    .form-item--text .form-item__label {
        font-size: 11px;
        margin-right: 5px;
    }
    
    .form-item--text .form-item__input {
        font-size: 14px;
        height: $base-line-height;
        padding-right: 4px;
        padding-left: 4px;
    }
    
    .form-item--option .form-item__label {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 14px;
    }
</style>