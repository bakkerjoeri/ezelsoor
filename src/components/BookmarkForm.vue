<template>
    <form class="bookmark-form" @submit.prevent="onSubmitForm">
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
        
        <div class="form-actions">
            <Button type="submit">Save</Button>
            <Button @click="$emit('cancel')">Cancel</Button>
            <Button @click="$emit('delete')">Delete</Button>
        </div>
    </form>
</template>

<script>
    import { DEFAULT_BOOKMARK_PROPERTIES } from './../store';
    import Button from './Button';
    
    export default {
        components: {
            Button,
        },
        props: {
            initialBookmark: {
                type: Object,
                default: () => ({ ...DEFAULT_BOOKMARK_PROPERTIES }),
            },
        },
        data: function() {
            return {
                bookmark: { ...this.initialBookmark },
                tagString: this.$store.getters.tagsOfBookmarkWithId(this.initialBookmark.id).map((tag) => {
                    return tag.name;
                }).join(' '),
            }
        },
        methods: {
            onSubmitForm() {
                this.$emit('submit', { ...this.bookmark });
            },
        }
    }
</script>

<style lang="scss">
    @import './../styles/settings';
    
    .form-actions {
        display: flex;
    }

    .form-item__label {
        font-size: 14px;
        line-height: $base-line-height;
    }
    
    .form-item--text .form-item__label {
        display: block;
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