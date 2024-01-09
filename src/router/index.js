import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      meta: {
        redirect: "dashboard",
      },
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      meta: {
        isLogined: true,
      },
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
});

router.beforeEach((to, from, next) => {
  const isRouteProtected = to.matched.some(route => route.meta?.isLogined);
  const hasToken = !!localStorage.getItem("token");

  if (isRouteProtected && !hasToken) {
    // Если маршрут защищен и нет токена, перенаправляем на страницу входа
    next({ name: "login", query: { redirect: to.fullPath } });
  } else if (to.meta.redirect && hasToken) {
    // Если есть метаданные для перенаправления и пользователь аутентифицирован
    next({ name: to.meta.redirect });
  } else {
    // Во всех остальных случаях продолжаем навигацию
    next();
  }
});

export default router;
