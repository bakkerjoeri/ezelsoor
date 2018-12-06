<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li class="navigation__item">
                <router-link class="navigation__link" to="/">Home</router-link>
            </li>
            <li class="navigation__item">
                <router-link class="navigation__link" to="/toread">Read later</router-link>
            </li>
            <li class="navigation__item">
                <router-link class="navigation__link" to="/favorites">Favorites</router-link>
            </li>
            <li class="navigation__item">
                <router-link class="navigation__link" to="/archive">Archive</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
    @import './../styles/settings';
    
    .navigation__list {
        list-style: none;
    }
    
    .navigation__item {
        line-height: $base-line-height;
    }
    
    .navigation__link {
        text-decoration: none;
        color: #000;
        
        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
</style>