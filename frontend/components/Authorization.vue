<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { loginUser, registerUser } from '@/utils/apiService';

const authStore = useAuthStore();

const showModal = ref(false); // Показывать ли модальное окно
const isLogin = ref(true); // Режим: true для Login, false для Register
const username = ref(''); // Имя пользователя
const password = ref(''); // Пароль

// Открытие модального окна
function toggleModal(mode) {
  isLogin.value = mode === 'login'; // Установить режим
  showModal.value = true; // Показать модальное окно
}

// Закрытие модального окна
function closeModal() {
  showModal.value = false; // Скрыть окно
  username.value = ''; // Очистить поля
  password.value = '';
}

// Логин
async function login() {
  try {
    await loginUser(username.value, password.value);
    await authStore.loadCurrentUser();
    alert('Login successful!');
    closeModal(); // Закрыть окно
  } catch (error) {
    alert(error.message || 'Login failed');
  }
}

// Регистрация
async function register() {
  try {
    await registerUser(username.value, password.value);
    await authStore.loadCurrentUser();
    alert('Registration successful!');
    closeModal(); // Закрыть окно
  } catch (error) {
    alert(error.message || 'Registration failed');
  }
}

// Выход
async function logout() {
  await authStore.logout();
}

</script>

<template>
  <div class="">
    <!-- Проверяем, авторизован ли пользователь -->
    <p v-if="authStore.currentUser">
      {{ authStore.currentUser.username }}
      <button @click="logout">Logout</button>
    </p>
    <div v-else class="log-buttons">
      <button class="register-button" v-if="!authStore.isAuthenticated" @click="toggleModal('login')">Login</button>
      <button class="register-button" v-if="!authStore.isAuthenticated" @click="toggleModal('register')">Register</button>
    </div>
    
    <!-- <p v-else>Не зарегистрировано</p>
    <button v-if="!authStore.isAuthenticated" @click="toggleModal('login')">Login</button>
    <button v-if="!authStore.isAuthenticated" @click="toggleModal('register')">Register</button> -->
  </div>

  <!-- Модальное окно -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <form @submit.prevent="isLogin ? login() : register()">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button class="register-button" type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
        <button class="register-button" type="button" @click="closeModal">Close</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

.log-buttons{
  display: flex;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.register-button:hover {
  background-color: #444;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

</style>
