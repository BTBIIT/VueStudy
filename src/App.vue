<script setup>
import { useRouter } from "vue-router";

// Vue Router 인스턴스 가져오기
const router = useRouter();

// 로고 클릭 핸들러
const goToHome = () => {
  router.push("/"); // "/" 경로로 이동 (홈)
};
</script>

<template>
  <header>
    <!-- 로고 이미지 클릭 시 홈으로 이동 -->
    <img
      class="logo"
      src="./assets/images/vue.svg"
      alt="Vue Logo"
      @click="goToHome"
    />
    <h1>부동산</h1>
    <nav>
      <!-- Home 링크 -->
      <router-link to="/">Home</router-link>
      <!-- 즐겨찾기 링크 -->
      <router-link to="/favorites">즐겨찾기</router-link>
      <!-- 문의사항 링크 -->
      <router-link to="/inquiries">문의사항</router-link>
    </nav>
  </header>
  <router-view />
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #69e073;
}

/* 로고 스타일 */
.logo {
  width: 50px; /* 로고 크기 */
  height: auto;
  cursor: pointer; /* 클릭 가능하도록 포인터 표시 */
  transition: transform 0.2s; /* 애니메이션 */
}

.logo:hover {
  transform: scale(1.1); /* 마우스 오버 시 약간 확대 */
}

/* 네비게이션 링크 스타일 */
nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #333333;
}

nav a:hover {
  text-decoration: underline;
}
</style>
