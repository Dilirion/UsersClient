<template>
  <header>
    <h1 class="mb-5">Войдите в систему</h1>
  </header>
  <section class="container">
    <div style="max-width: 500px; margin: auto;">
      <form @submit.prevent="submit">
        <div class="d-sm-flex row-sm mb-3">
          <label for="username" class="col-sm-4 d-flex justify-content-start">Имя пользователя:</label>
          <input type="text" class="form-control col-sm" name="username" v-model="form.username" />
        </div>
        <div class="d-sm-flex row-sm mb-3">
          <label for="password" class="col-sm-4 d-flex justify-content-start">Пароль:</label>
          <input type="password" class="form-control col-sm" name="password" v-model="form.password" />
        </div>
        <button type="submit" class="btn btn-primary mb-5">Войти</button>
      </form>
      <p v-if="showError" class="text-danger" id="error">{{error}}</p>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false,
      error: "Что-то пошло не так"
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {      
      const User = new FormData()
      User.append("username", this.form.username)
      User.append("password", this.form.password)
      //trying to login
      try {
        await this.LogIn(User)
        this.$router.push("/")
        this.showError = false
      } 
      catch(err){  
        if (err.message == 'Request failed with status code 404') this.error = "Пользователь не найден!"  
        else if (err.message == 'Request failed with status code 401') this.error = 'Неверный пароль!' 
        this.showError = true
      }
    }
  }
};
</script>