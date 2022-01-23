<template>
<!-- nav bar for edit form (later it can be extended with photo item) -->
    <ul class="nav nav-tabs">
        <li class="nav-item me-1">
            <p class="nav-link" :class="{'active': isFirstSelected}" href="#" @click="select">Контактная информация</p>
        </li>
        <li class="nav-item">
            <p class="nav-link" :class="{'active': isSecondSelected}" href="#" @click="select">Детальная информация</p>
        </li>
    </ul>
</template>
<script>

export default {
    data() {
        return {
            isFirstSelected: true
        }
    },
    computed: {
        isSecondSelected() {
            return !this.isFirstSelected
        }
    },
    methods: {
        // changes selected item
        select() {
            this.isFirstSelected = ! this.isFirstSelected
            this.$emit('select', this.isFirstSelected)
        }
    }
}
</script>
