<template>
    <form v-on:submit="onSubmit">
        <div>
            <label for="url">Link</label>
            <input id="url" name="url" type="text" v-model="bookmark.url" />
        </div>
        
        <div>
            <label for="title">Title</label>
            <input id="title" name="title" type="text" v-model="bookmark.title" />
        </div>
        
        <div>
            <input id="isToRead" name="isToRead" type="checkbox" v-model="bookmark.isToRead" />
            <label for="isToRead">To read</label>
        </div>
        
        <div>
            <input id="isFavorite" name="isFavorite" type="checkbox" v-model="bookmark.isFavorite" />
            <label for="isFavorite">Favorite</label>
        </div>
        
        <div>
            <input id="isArchived" name="isArchived" type="checkbox" v-model="bookmark.isArchived" />
            <label for="isArchived">Archived</label>
        </div>
        
        <button type="submit">Add new bookmark</button>
        <button>Cancel</button>
        <button>Delete</button>
    </form>
</template>

<script>
    export default {
        props: ['bookmark', 'onSubmit'],
    }
</script>