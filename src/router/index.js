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
  if (to.matched.some((route) => route.meta?.isLogined)) {
    if (!localStorage.getItem("token")) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    if (to.meta.redirect && localStorage.getItem("token")) {
      next({
        name: to.meta.redirect,
      });
    }
    next();
  }
});

export default router;
