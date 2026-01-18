<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>AMDR</b> System</a>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form @submit.prevent="login">
        <div class="form-group has-feedback mb-3">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox"> Remember Me
              </label>
            </div>
          </div>
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  // Mock login
  if (email.value && password.value) {
     router.push('/dashboard')
  } else {
     alert('Please enter credentials')
  }
}
</script>

<style scoped>
.login-box {
  width: 360px;
  margin: 7% auto;
}
.login-logo {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 300;
}
.login-box-body {
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
}
</style>
