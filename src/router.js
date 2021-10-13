import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "@/components/admin/LoginPage.vue";
import AdminDashboard from "@/components/admin/AdminDashboard.vue";
import SubjectPage from "@/components/admin/SubjectPage.vue";
import NewSubjectPage from "@/components/admin/NewSubjectPage.vue";
import StudyGroupsPage from "@/components/admin/StudyGroupsPage.vue";
import EditSubjectPage from "@/components/admin/EditSubjectPage.vue";
import ScheduledNotificationsPage from "@/components/admin/ScheduledNotificationsPage.vue";
import LogViewerPage from "@/components/admin/LogViewerPage.vue";
import Privacy from "@/components/pages/Privacy.vue";
import Terms from "@/components/pages/Terms.vue";

import store from "./store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/",
    name: "Home Page",
    component: AdminDashboard
  },
  {
    path: "/subjects/new",
    name: "New Subject Page",
    component: NewSubjectPage
  },
  {
    path: "/study-groups",
    name: "Study Groups Page",
    component: StudyGroupsPage
  },
  {
    path: "/subjects/:subjectId",
    name: "Subject Page",
    component: SubjectPage
  },
  {
    path: "/subjects/:subjectId/edit",
    name: "Edit Subject Page",
    component: EditSubjectPage
  },
  {
    path: "/scheduled-notifications",
    name: "Scheduled Reminders Page",
    component: ScheduledNotificationsPage
  },
  {
    path: "/logs",
    name: "Log Viewer Page",
    component: LogViewerPage
  },
  {
    path: "/privacy",
    name: "PrivacyPolicyPage",
    component: Privacy
  },
  {
    path: "/terms",
    name: "TermsOfUsePage",
    component: Terms
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const unprotectedRoutes = ["Login", "PrivacyPolicyPage", "TermsOfUsePage"];

router.beforeEach((to, _from, next) => {
  if (unprotectedRoutes.includes(to.name) || store.getters.isLoggedIn) {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
