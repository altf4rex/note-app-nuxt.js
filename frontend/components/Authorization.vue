<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

const authStore = useAuthStore();

const showModal = ref(false);
const isLogin = ref(true); // Контролирует режим: логин или регистрация
const username = ref('');
const password = ref('');

// Открытие и закрытие модального окна
function toggleModal(mode) {
  isLogin.value = mode === 'login';
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  username.value = '';
  password.value = '';
}

// Функция для логина
async function login() {
  try {
    const response = await $fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      credentials: 'include', // Для отправки cookie с токеном
    });

    if (!response.message) {
      throw new Error('Login failed: ' + response.message);
      console.log(!response.ok)
      console.log(response)
    }

    await authStore.loadCurrentUser();
    console.log(authStore.currentUser)

    alert('Login successful!');
    closeModal();

  } catch (error) {
    alert(error.message || 'Login failed');
  }
}

// Функция для регистрации
async function register() {
  try {
    const response = await $fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Registration failed: ' + response.statusText);
    }

    await authStore.loadCurrentUser();

    const data = await response.json();
    alert('Registration successful!');
    closeModal();
  } catch (error) {
    alert(error.message || 'Registration failed');
  }
}

// onMounted(async() => {
//   await authStore.loadCurrentUser();
// });

async function logout() {
 await authStore.logout();
}

</script>


<template>
  <div>
    <p v-if="authStore.currentUser">
      Вы вошли как: {{ authStore.currentUser.username }}
      <button @click="logout">Logout</button>
    </p>
    <p v-else>Не зарегистрировано</p>
  </div>
  <!-- Остальная часть шаблона -->


  <div>
    <!-- <p v-if="authStore.currentUser">Вы вошли как: {{ authStore.currentUser.username }}</p>
    <p v-else>Не зарегистрировано</p> -->

    <button v-if="authStore.isAuthenticated" @click="authStore.logout">Logout</button>
    <button v-else @click="toggleModal('login')">Login</button>
    <button v-if="!authStore.isAuthenticated" @click="toggleModal('register')">Register</button>

    <!-- Модальное окно остается как есть -->
    <div v-if="showModal" class="modal">
      <form @submit.prevent="isLogin ? login() : register()">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
        <button type="button" @click="closeModal">Close</button>
      </form>
    </div>
  </div>
</template>
