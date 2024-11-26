<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const inquiries = ref(JSON.parse(localStorage.getItem("inquiries")) || []);
const router = useRouter();

// 문의 삭제
const deleteInquiry = (id) => {
  inquiries.value = inquiries.value.filter((inquiry) => inquiry.id !== id);
  localStorage.setItem("inquiries", JSON.stringify(inquiries.value));
};

// 문의 수정으로 이동
const editInquiry = (id) => {
  router.push(`/inquiries/edit/${id}`);
};
</script>

<template>
  <div class="board-container">
    <h1>문의사항</h1>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성일</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(inquiry, index) in inquiries" :key="inquiry.id">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="`/inquiries/${inquiry.id}`">
              {{ inquiry.title }}
            </router-link>
          </td>
          <td>{{ new Date(inquiry.date).toLocaleDateString() }}</td>
          <td>
            <button class="edit-btn" @click="editInquiry(inquiry.id)">
              수정
            </button>
            <button class="delete-btn" @click="deleteInquiry(inquiry.id)">
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/inquiries/new" class="new-inquiry-link"
      >문의 작성</router-link
    >
  </div>
</template>

<style scoped>
.board-container {
  padding: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
.new-inquiry-link {
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}
.new-inquiry-link:hover {
  text-decoration: underline;
}
button {
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
.edit-btn {
  background-color: #4caf50;
  color: white;
  margin-right: 5px;
}
.edit-btn:hover {
  background-color: #388e3c;
}
.delete-btn {
  background-color: #ff4d4d;
  color: white;
}
.delete-btn:hover {
  background-color: #cc0000;
}
</style>
