import AuthTabs from "@/components/AuthTabs";
import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function Page() {
  return (
    <>
      <AuthTabs />
      <RegisterForm />
    </>
  );
}
