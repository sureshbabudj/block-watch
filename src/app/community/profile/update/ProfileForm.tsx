"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toast } from "@capacitor/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/appStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import useAuth from "@/hooks/useAuth";

const genders = ["Male", "Female", "Non Binary", "Prefer not to say"] as const;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 2000000;

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  gender: z
    .enum(genders, {
      required_error: "Please select an gender to display.",
    })
    .default("Prefer not to say"),
  email: z
    .string({
      required_error: "Please input an email to display.",
    })
    .email(),
  bio: z.string().max(160).optional(),
  dateOfBirth: z.date().optional(),
  profilePicture:
    typeof window === "undefined"
      ? z.any()
      : z
          .any()
          .optional()
          .refine(
            (file) =>
              file.length == 1
                ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
                  ? true
                  : false
                : true,
            "Invalid file. choose either JPEG or PNG image"
          )
          .refine(
            (file) =>
              file.length == 1
                ? file[0]?.size <= MAX_FILE_SIZE
                  ? true
                  : false
                : true,
            "Max file size allowed is 8MB."
          ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [user] = useAtom(userAtom);
  if (!user) {
    router.replace("/signin");
    return <></>;
  }

  const defaultValues: Partial<ProfileFormValues> = {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    dateOfBirth: user.dateOfBirth || undefined,
    gender: user.gender
      ? (user.gender as (typeof genders)[0])
      : "Prefer not to say",
    bio: user.bio ?? "",
    profilePicture: undefined,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(formData: ProfileFormValues) {
    try {
      const parsed = profileFormSchema.safeParse(formData);
      if (!parsed.success) {
        throw "Payload validation failed";
      }
      const refinedFormData: any = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "dateOfBirth") {
            refinedFormData.append(key, new Date(value).toISOString());
          } else if (key === "profilePicture") {
            debugger;
            refinedFormData.append(key, value[0]);
          } else {
            refinedFormData.append(key, value);
          }
        }
      });
      for (const pair of refinedFormData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const response = await fetch(`/api/auth/profile`, {
        method: "PATCH",
        body: refinedFormData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      await refreshAuth();
      router.replace("/community/profile");
    } catch (err: any) {
      await Toast.show({
        text:
          err.message || "An error occurred while updating user information",
      });
    }
  }

  const fileRef = form.register("profilePicture");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  className="resize-none"
                  {...fileRef}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                />
              </FormControl>
              <FormDescription>
                You can upload oan image with the size that does not exceeds
                1mb.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    fromYear={1930}
                    toYear={new Date().getFullYear()}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
