<script setup>
import { ref, computed } from "vue";
import properties from "../data/properties"; // 매물 데이터 가져오기
import { formatPrice } from "../utils/format"; // 가격 포맷 유틸리티

// 상태 관리
const minPrice = ref(""); // 최소 가격
const maxPrice = ref(""); // 최대 가격
const selectedCity = ref(""); // 선택된 도시
const filteredProperties = ref(properties); // 필터링된 매물 목록 초기값은 모든 매물
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 5; // 페이지당 매물 개수

// 즐겨찾기 상태
const favorites = ref(
  JSON.parse(localStorage.getItem("favorites")) || [] // localStorage에서 즐겨찾기 불러오기
);

// 도시 목록 정의
const cities = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

// 검색 버튼 클릭 시 실행
const searchProperties = () => {
  const matchingProperties = properties.filter((property) => {
    const matchesPrice =
      (minPrice.value === "" ||
        property.price >= (parseInt(minPrice.value) || 0)) &&
      (maxPrice.value === "" ||
        property.price <= (parseInt(maxPrice.value) || Infinity));

    const matchesCity =
      selectedCity.value === "" ||
      property.location.includes(selectedCity.value);

    return matchesPrice && matchesCity;
  });

  filteredProperties.value = matchingProperties;
  currentPage.value = 1; // 페이지 초기화
};

// 초기화 버튼 클릭 시 실행
const resetFilters = () => {
  minPrice.value = "";
  maxPrice.value = "";
  selectedCity.value = "";
  filteredProperties.value = properties; // 초기 매물 리스트로 복원
  currentPage.value = 1; // 페이지 초기화
};

// 즐겨찾기 추가/제거 함수
const toggleFavorite = (propertyId) => {
  if (favorites.value.includes(propertyId)) {
    favorites.value = favorites.value.filter((id) => id !== propertyId); // 즐겨찾기 제거
  } else {
    favorites.value.push(propertyId); // 즐겨찾기 추가
  }
  localStorage.setItem("favorites", JSON.stringify(favorites.value)); // localStorage 업데이트
};

// 현재 페이지의 매물 계산
const paginatedProperties = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProperties.value.slice(startIndex, endIndex);
});

// 총 페이지 수 계산
const totalPages = computed(() =>
  Math.ceil(filteredProperties.value.length / itemsPerPage)
);

// 페이지 변경
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div>
    <h1>부동산 매물 검색</h1>

    <!-- 검색 필터 -->
    <div class="filters">
      <label>최소 가격 (만원):</label>
      <input type="number" v-model="minPrice" placeholder="최소 가격 입력" />

      <label>최대 가격 (만원):</label>
      <input type="number" v-model="maxPrice" placeholder="최대 가격 입력" />

      <label>도시:</label>
      <select v-model="selectedCity">
        <option value="">전체</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>

      <button @click="searchProperties">검색</button>
      <button @click="resetFilters" class="reset-button">초기화</button>
    </div>

    <!-- 검색 결과 -->
    <h2>검색 결과</h2>
    <div v-if="paginatedProperties.length > 0" class="property-list">
      <div
        v-for="property in paginatedProperties"
        :key="property.id"
        class="property-card"
      >
        <img :src="property.images[0]" alt="대표 매물 이미지" />
        <h3>{{ property.title }}</h3>
        <p>가격: {{ formatPrice(property.price) }} 만원</p>
        <p>위치: {{ property.location }}</p>
        <router-link :to="`/property/${property.id}`">상세보기</router-link>

        <!-- 즐겨찾기 버튼 -->
        <button @click="toggleFavorite(property.id)">
          {{ favorites.includes(property.id) ? "즐겨찾기 해제" : "즐겨찾기" }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>검색 조건에 맞는 매물이 없습니다.</p>
    </div>

    <!-- 즐겨찾기 목록 -->
    <h2>즐겨찾기 목록</h2>
    <div v-if="favorites.length > 0" class="property-list">
      <div
        v-for="property in properties.filter((p) => favorites.includes(p.id))"
        :key="property.id"
        class="property-card"
      >
        <img :src="property.images[0]" alt="대표 매물 이미지" />
        <h3>{{ property.title }}</h3>
        <p>가격: {{ formatPrice(property.price) }} 만원</p>
        <p>위치: {{ property.location }}</p>
        <router-link :to="`/property/${property.id}`">상세보기</router-link>

        <!-- 즐겨찾기 해제 버튼 -->
        <button @click="toggleFavorite(property.id)">즐겨찾기 해제</button>
      </div>
    </div>
    <div v-else>
      <p>즐겨찾기한 매물이 없습니다.</p>
    </div>

    <!-- 페이징 -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        이전
      </button>
      <span v-for="page in totalPages" :key="page" @click="changePage(page)">
        <button :class="{ active: page === currentPage }">{{ page }}</button>
      </span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        다음
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reset-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #d32f2f;
}

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

.property-card button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.property-card button:hover {
  background-color: #0056b3;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
