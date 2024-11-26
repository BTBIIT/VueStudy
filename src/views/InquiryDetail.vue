<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const inquiries = ref(JSON.parse(localStorage.getItem("inquiries")) || []);
const inquiry = ref(inquiries.value.find((i) => i.id === route.params.id));
</script>

<template>
  <div class="detail-container">
    <h1>문의 상세</h1>
    <div v-if="inquiry">
      <p><strong>제목:</strong> {{ inquiry.title }}</p>
      <p>
        <strong>작성일:</strong>
        {{ new Date(inquiry.date).toLocaleDateString() }}
      </p>
      <p><strong>내용:</strong></p>
      <p>{{ inquiry.content }}</p>
    </div>
    <router-link to="/inquiries" class="back-link">뒤로가기</router-link>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 1rem;
}
.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
</style>
