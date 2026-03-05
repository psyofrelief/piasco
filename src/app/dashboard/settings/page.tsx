import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import SettingsForm from "@/components/forms/SettingsForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      name: true,
      email: true,
      password: true,
    },
  });

  if (!dbUser) {
    redirect("/auth/signin");
  }
  return (
    <Panel className="gap-y-2xl relative flex flex-col">
      <header className="gap-y-xs pb-sm border-b-outline flex flex-col border-b border-dashed">
        <Headline>Your Account</Headline>
        <p className="text-foreground-secondary text-sm">
          Manage your account settings and preferences.
        </p>
      </header>

      <SettingsForm
        user={{
          name: dbUser?.name,
          email: dbUser?.email,
          hasPassword: Boolean(dbUser?.password),
        }}
      />
    </Panel>
  );
}
