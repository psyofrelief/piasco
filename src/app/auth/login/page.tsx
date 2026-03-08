import AuthTabs from "@/components/AuthTabs";
import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Page() {
  return (
    <>
      <AuthTabs />
      <LoginForm />
    </>
  );
}
