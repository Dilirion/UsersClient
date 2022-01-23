<template>
    <header> 
        <h1 class="mb-5"> Редактирование пользователей </h1>
    </header>
    <section class="container">
        <p v-if="showError"> {{error}} </p>
        <p v-else-if="!users">Загрузка...</p>
        <div v-else class="row">
            <!-- user list -->
            <!-- if item of this list is selected on small viewports the list is not displaying -->
            <div class="list-group col ms-2" :class="{'d-none d-lg-block': selectedUser}">
                <!-- first item for creating new user -->
                <div class="list-group-item list-group-item-action bg-secondary" 
                 style="cursor: pointer;" @click="selectUser(null)">
                    <strong class="text-white">Создать пользователя</strong>
                </div>
                <!-- existing users -->
                <list-item v-for="user in users" :key="user.id" 
                 :selectedItem="selectedUser" :user="user" 
                 @select-item="selectUser(user)"
                 class="list-group-item list-group-item-action" 
                 :class="{'active': selectedUser && selectedUser.id == user.id}"/>
            </div>
            <!-- user edit form -->
            <div class="col-lg">
                <user-edit-form v-if="selectedUser" v-model="selectedUser" :createNew="createNew"
                 @save="save" @delete="deleteUser" @cancel="cancelEdit"/>
                <p class="mt-5" v-else> Выберете пользователя </p>
                <p v-if="showEditError"> {{editError}} </p>                
            </div>
        </div>        
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import ListItem from '../components/BaseUserListItem.vue'
import UserEditForm from '../components/UserEditForm.vue'

export default {
    data() {
        return {
            selectedUser: null,
            showError: false,
            error: "Что-то пошло не так",
            showEditError: false,
            editError: "Что-то пошло не так",
            createNew: false
        }
    },
    computed: {
        users() {
            return this.$store.getters.data
        }
    },
    created() {
        // getting all users
        try{
            this.$store.dispatch('GetUsers')  
            console.log(1, this.$store.getters.data)          
            this.loading = false
            this.showError = false
        }
        catch(err){
            this.error = err.message
            this.loading = false
            this.showError = true
        }
        
    },
    components: {
        ListItem, UserEditForm
    },
    methods: {
        ...mapActions(["EditUser", "DeleteUser", "CreateUser"]),
        
        // initializes slectedUser both for editing and creating
        selectUser(user) {
            if (user) {
                this.createNew = false
                this.selectedUser = Object.assign({}, user)     
            }
            else {
                this.createNew = true
                this.selectedUser = {
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    phone: "",
                    email: ""
                }
            }       
        },

        // sends edited or created user to server
        async save() {
            // prevents empty user to send
            if (this.selectedUser.firstname == "" && this.selectedUser.lastname == "" 
              && this.selectedUser.middlename == "" && this.selectedUser.phone == "" && this.selectedUser.email == "") 
            {
                this.editError = "Хотя бы одно поле должно быть заполнено!"
                this.showEditError = true
            }
            else {
                this.showEditError = false 
                this.editError = "Что-то пошло не так"
                try 
                {
                    if (this.createNew) this.CreateUser(this.selectedUser)
                    else this.EditUser(this.selectedUser)
                    this.selectedUser = null
                }         
                catch (err) {
                    this.editError = err.message
                    this.showEditError = true
                }
            }
        },

        // sends delete request to server
        async deleteUser() {
            try {
                this.DeleteUser({"id": this.selectedUser.id})
                this.selectedUser = null
            }         
            catch (err) {
                this.editError = err.message
                this.showEditError = true
            }
        },

        // cancelling changes
        cancelEdit() {
            this.selectedUser = null
        }
    }
}
</script>
