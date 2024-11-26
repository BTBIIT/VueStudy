<script setup>
import { ref } from "vue";
import properties from "../data/properties"; // 매물 데이터 가져오기

// 즐겨찾기 상태 (localStorage 사용)
const favorites = ref(
  JSON.parse(localStorage.getItem("favorites")) || [] // localStorage에서 즐겨찾기 불러오기
);

// 즐겨찾기한 매물 필터링
const favoriteProperties = ref(
  properties.filter((property) => favorites.value.includes(property.id))
);

// 즐겨찾기 해제 함수
const removeFavorite = (propertyId) => {
  // 즐겨찾기 목록에서 해당 매물 제거
  favorites.value = favorites.value.filter((id) => id !== propertyId);
  localStorage.setItem("favorites", JSON.stringify(favorites.value)); // localStorage 업데이트

  // 즐겨찾기 목록 업데이트
  favoriteProperties.value = properties.filter((property) =>
    favorites.value.includes(property.id)
  );
};
</script>

<template>
  <div>
    <h1>즐겨찾기 매물</h1>
    <div v-if="favoriteProperties.length > 0" class="property-list">
      <div
        v-for="property in favoriteProperties"
        :key="property.id"
        class="property-card"
      >
        <img :src="property.images[0]" alt="대표 매물 이미지" />
        <h3>{{ property.title }}</h3>
        <p>가격: {{ property.price }} 만원</p>
        <p>위치: {{ property.location }}</p>
        <router-link :to="`/property/${property.id}`">상세보기</router-link>

        <!-- 즐겨찾기 해제 버튼 -->
        <button
          @click="removeFavorite(property.id)"
          class="remove-favorite-btn"
        >
          즐겨찾기 해제
        </button>
      </div>
    </div>
    <div v-else>
      <p>즐겨찾기한 매물이 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.property-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5열 */
  gap: 1rem;
}

.property-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.property-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.property-card a {
  display: block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: none;
}

.property-card a:hover {
  text-decoration: underline;
}

.property-card .remove-favorite-btn {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #007bff; /* 빨간색 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.property-card .remove-favorite-btn:hover {
  background-color: #007bff;
}
</style>
