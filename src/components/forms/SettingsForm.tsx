"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  settingsSchema,
  type SettingsValues,
} from "@/lib/data/schemas/settingsSchema";

import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import { updateUser } from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";

interface SettingsFormProps {
  user?: {
    name?: string | null;
    email?: string | null;
    hasPassword?: boolean;
  };
}
export default function SettingsForm({ user }: SettingsFormProps) {
  const hasPassword = user?.hasPassword;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      isOAuth: !hasPassword,
    },
  });

  async function onSubmit(values: SettingsValues) {
    if (!hasPassword) {
      toast.error("Google accounts cannot be modified here.");
      return;
    }

    try {
      await updateUser(values);
      toast.success("Settings updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-y-xl flex flex-col">
      {/* Profile Section */}
      <div
        className={cn(
          "gap-y-lg flex flex-col",
          !hasPassword && "pointer-events-none opacity-50 select-none",
        )}
      >
        <SettingRow id="name" label="Name" description="Enter your name">
          <Input
            {...register("name")}
            placeholder="Mark Smith"
            disabled={!hasPassword}
          />
        </SettingRow>

        <SettingRow id="email" label="Email" description="Enter your email">
          <Input
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
            disabled={!hasPassword}
          />
        </SettingRow>
      </div>

      {/* Divider with Header */}
      <header className="pt-xl border-outline gap-y-xs flex flex-col border-t border-dashed">
        <h3 className="text-md leading-none font-semibold">Security</h3>
        <p className="text-foreground-secondary text-sm">
          Manage your password and authentication methods.
        </p>
      </header>

      {/* Password Section */}
      <div
        className={cn(
          "gap-y-lg flex flex-col",
          !hasPassword && "pointer-events-none opacity-50 select-none",
        )}
      >
        <SettingRow
          id="currentPassword"
          label="Current Password"
          description="Old password"
        >
          <Input
            {...register("currentPassword")}
            type="password"
            placeholder="********"
            disabled={!hasPassword}
          />
        </SettingRow>

        <SettingRow
          id="newPassword"
          label="New Password"
          description="Create new password"
        >
          <Input
            {...register("newPassword")}
            type="password"
            placeholder="********"
            disabled={!hasPassword}
          />
        </SettingRow>
      </div>

      <div className="pt-md gap-y-sm flex flex-col items-end">
        {!hasPassword && (
          <p className="text-foreground-secondary text-xs italic">
            This account is linked with Google. Profile details cannot be
            changed here.
          </p>
        )}
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!hasPassword}
          className="px-xl w-full md:w-fit"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

function SettingRow({
  label,
  description,
  children,
  error,
  id,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
  error?: string;
  id: string;
}) {
  return (
    <div className="gap-x-xl gap-y-xs grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      <div className="gap-y-xs flex flex-col">
        <Label htmlFor={id} className="text-sm font-semibold">
          {label}
        </Label>
        <p className="text-foreground-secondary">{description}</p>
      </div>
      <div className="gap-y-xs flex flex-col">
        {children}
        {error && <FormMessage>{error}</FormMessage>}
      </div>
    </div>
  );
}
