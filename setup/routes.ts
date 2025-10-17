import { defineRoutesSetup } from "@slidev/types";

export default defineRoutesSetup((routes) => {
  return [
    ...routes,
    {
      path: "/survey",
      component: () => import("../components/survey.vue"),
    },
  ];
});
