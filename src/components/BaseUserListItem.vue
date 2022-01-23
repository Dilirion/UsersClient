<template>
<!-- list item for users list -->
    <div class="text-decoration-none" style="cursor: pointer;" @click="$emit('selectItem')">
        <div class="d-flex flex-column flex-lg-row justify-content-between">
            <h5 class="mb-1">{{user.firstname}} {{user.lastname}} {{user.middlename}}</h5>
            <p class="mb-1">{{user.phone}} {{user.email}}</p>
        </div>            
    </div>
</template>

<script>
export default {
    props: {
        'user': Object
    }
}
</script>
