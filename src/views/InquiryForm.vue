<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const title = ref("");
const content = ref("");
const router = useRouter();
const route = useRoute();
const isEditMode = ref(false); // 수정 모드 확인
const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];

if (route.params.id) {
  const existingInquiry = inquiries.find(
    (inquiry) => inquiry.id === route.params.id
  );
  if (existingInquiry) {
    title.value = existingInquiry.title;
    content.value = existingInquiry.content;
    isEditMode.value = true;
  }
}

const submitInquiry = () => {
  if (isEditMode.value) {
    // 수정 모드일 경우
    const index = inquiries.findIndex(
      (inquiry) => inquiry.id === route.params.id
    );
    inquiries[index].title = title.value;
    inquiries[index].content = content.value;
  } else {
    // 새 문의 작성
    inquiries.push({
      id: new Date().getTime().toString(),
      title: title.value,
      content: content.value,
      date: new Date().toISOString(),
    });
  }
  localStorage.setItem("inquiries", JSON.stringify(inquiries));
  router.push("/inquiries");
};
</script>

<template>
  <div class="form-container">
    <h1>{{ isEditMode ? "문의 수정" : "문의 작성" }}</h1>
    <form @submit.prevent="submitInquiry">
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <button type="submit">{{ isEditMode ? "수정 완료" : "작성" }}</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  padding: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
form label {
  display: block;
  margin-bottom: 0.5rem;
}
form input,
form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
form button {
  color: white;
  background-color: #007bff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
form button:hover {
  background-color: #0056b3;
}
</style>
