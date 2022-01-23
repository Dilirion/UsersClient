<template>
<!-- edit form for user -->
    <div class="container px-0 px-lg-2">
        <form-navbar class="mb-5" @select="showForms" />
        <div class="px-2">
        <form @submit.prevent="$emit('save')">
            <!-- fields for contact info editing -->
            <div v-if="showContactInfoForm">
                <form-item label="Телефон" type="tel" id="phone" v-model="user.phone" />
                <form-item label="E-mail" type="email" id="email" v-model="user.email" /> 
            </div>
            <!-- fields for detail info editing -->
            <div v-else>
                <form-item label="Имя" type="text" id="firstname" v-model="user.firstname" />
                <form-item label="Отчество" type="text" id="middlename" v-model="user.middlename" />            
                <form-item label="Фамилия" type="text" id="lastname" v-model="user.lastname" />
            </div>
            <!-- buttons for saving and and deleting user and canceling changes  -->
            <div class="d-flex justify-content-center mb-5">
                <button type="submit" class="btn btn-primary me-3">
                    <span v-if="createNew">Создать</span> 
                    <span v-else>Сохранить</span>
                </button>
                <button type="button" class="btn btn-secondary me-3" @click="$emit('cancel')">Отмена</button>
                <button v-if="!createNew" type="button" class="btn btn-danger" @click="$emit('delete')">Удалить</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import FormItem from './BaseEditFormItem.vue'
import FormNavbar from './BaseUserEditFormNavbar.vue'

export default {
    name: "Edit",
    data() {
        return {
            showContactInfoForm: true,
            showError: false,
        };
    },
    props: {
        'modelValue': Object,
        'createNew': Boolean
    },
    
    computed: {
        user() {
            return this.modelValue
        }
    },
    components: {
        FormItem, FormNavbar
    },
    methods: {
        // changes displayed fields to edit (child nav bar event)
        showForms(showFlag) {
            this.showContactInfoForm = showFlag
        }
    }
}
</script>
