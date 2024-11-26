import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/property/:id",
    name: "PropertyDetail",
    component: () => import("../views/PropertyDetail.vue"),
  },
  {
    path: "/inquiries",
    name: "InquiryBoard",
    component: () => import("../views/InquiryBoard.vue"),
  },
  {
    path: "/inquiries/new",
    name: "InquiryForm",
    component: () => import("../views/InquiryForm.vue"),
  },
  {
    path: "/inquiries/:id",
    name: "InquiryDetail",
    component: () => import("../views/InquiryDetail.vue"),
  },
  {
    path: "/inquiries/edit/:id",
    name: "InquiryEdit",
    component: () => import("../views/InquiryForm.vue"), // InquiryForm.vue를 수정용으로 재사용
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/Favorites.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
