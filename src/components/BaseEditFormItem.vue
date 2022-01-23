<template>
<!-- custom input for edit form -->
    <div class="d-sm-flex row-sm mb-3">
        <label :for="id" class="col-sm-3 d-flex justify-content-start">{{label}}:</label>
        <input :type="type" class="form-control col-sm" :name="id" 
         :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        type: String,
        id: String,
        modelValue: String
    }
}
</script>
