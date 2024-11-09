"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import { Separator } from "@radix-ui/react-select";
import { z } from "zod";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/appStore";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toast } from "@capacitor/toast";

const changePasswordFormSchema = z.object({
  email: z.string().email(),
  currentPassword: z
    .string()
    .min(8, {
      message: "Current Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Current Password must not be longer than 30 characters.",
    }),
  newPassword: z
    .string()
    .min(8, {
      message: "New Password must be at least 8 characters.",
    })
    .max(30, {
      message: "New Password must not be longer than 30 characters.",
    })
    .refine((val) => /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(val), {
      message: "Password should contain at least one special character:",
    }),
});
type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

function ChangePasswordPage() {
  const [error, setError] = useState(false);
  const [user] = useAtom(userAtom);
  if (!user) {
    return null;
  }

  const defaultValues: ChangePasswordFormValues = {
    email: user.email,
    currentPassword: "",
    newPassword: "",
  };

  const form = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error ?? "");
      }
      setError(false);
      form.reset();
      await Toast.show({
        text: "New password has been successfully updated!",
      });
    } catch (err: any) {
      setError(err?.message ?? "An error occurred during signup");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your password here...
        </p>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    autoCapitalize="off"
                    type="password"
                    className="bg-white"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    autoCapitalize="off"
                    type="password"
                    className="bg-white"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Save password</Button>
        </form>
      </Form>
    </div>
  );
}

export default withAuthRedirect(ChangePasswordPage);
