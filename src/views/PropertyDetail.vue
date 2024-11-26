<script setup>
import { useRoute } from "vue-router";
import properties from "../data/properties";
import { formatPrice } from "../utils/format";
const route = useRoute();
const propertyId = route.params.id;
const property = properties.find((p) => p.id === parseInt(propertyId));
</script>

<template>
  <div v-if="property">
    <!-- 제목 -->
    <h2>{{ property.title }}</h2>

    <!-- 이미지 슬라이더 -->
    <div class="image-slider">
      <img
        v-for="(image, index) in property.images"
        :key="index"
        :src="image"
        :alt="`Image ${index + 1}`"
      />
    </div>

    <!-- 기본 정보 -->
    <p><strong>가격:</strong> {{ formatPrice(property.price) }} 만원</p>
    <p><strong>위치:</strong> {{ property.location }}</p>

    <!-- 요약된 특징 -->
    <p><strong>특징:</strong> {{ property.feature }}</p>

    <!-- 상세 설명 -->
    <h3>상세 정보</h3>
    <table class="description-table">
      <tbody>
        <tr v-for="(value, key) in property.description" :key="key">
          <th>{{ key }}</th>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 매물이 없을 경우 -->
  <div v-else>
    <p>해당 매물을 찾을 수 없습니다.</p>
  </div>
</template>

<style scoped>
.image-slider {
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  margin-bottom: 1rem;
}
.image-slider img {
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}
.description-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.description-table th,
.description-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
.description-table th {
  background-color: #f9f9f9;
  font-weight: bold;
  width: 30%;
}
</style>
