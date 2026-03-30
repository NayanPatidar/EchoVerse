"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInWithGoogle = () => {
  signIn("google", { callbackUrl: "/", redirect: false });
};

const formSchema = z.object({
  Name: z.string().min(1, { message: "Enter the name !" }),
  Email: z.string().email({
    message: "Enter a valid email address !",
  }),
  Password: z
    .string()
    .min(8, { message: "Password should be at least of 8 characters" })
    .regex(/[A-Z]/, { message: "Must Contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must Contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must Contain at least one number" })
    .regex(/[\W_]/, { message: "Must Contain at least one special character" }),
});

const SignUpForm = () => {
  const [isAlert, setAlert] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/userSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.Name,
          email: values.Email,
          password: values.Password,
        }),
      });

      form.reset({ Name: "", Email: "", Password: "" });

      const message = await res.json();
      if (res.status === 209) {
        setAlert(message.message);
      } else if (res.status === 200) {
        router.push("/signin");
      }
    } catch (error: any) {
      console.error("Found Error : " + error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-[#aaa] text-xs font-medium uppercase tracking-wider">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="bg-[#222] border-white/10 text-white placeholder:text-[#555] focus:border-white/30 h-11 rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-[#aaa] text-xs font-medium uppercase tracking-wider">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  className="bg-[#222] border-white/10 text-white placeholder:text-[#555] focus:border-white/30 h-11 rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-[#aaa] text-xs font-medium uppercase tracking-wider">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  className="bg-[#222] border-white/10 text-white placeholder:text-[#555] focus:border-white/30 h-11 rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {isAlert && (
          <p className="text-[#ff4d4d] text-sm text-center font-medium">
            {isAlert}
          </p>
        )}

        <button
          type="submit"
          className="w-full h-11 mt-1 bg-white hover:bg-white/90 text-black font-semibold text-sm rounded-full transition-colors"
        >
          Create Account
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#555] text-xs">or</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={SignInWithGoogle}
        className="w-full h-11 bg-[#222] hover:bg-[#2a2a2a] border border-white/10 text-white text-sm font-medium rounded-full flex items-center justify-center gap-2.5 transition-colors"
      >
        <Image src="/GoogleLogo.png" width={18} height={18} alt="Google" />
        Continue with Google
      </button>

      {/* Switch to sign in */}
      <p className="text-center text-sm text-[#666] mt-5">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signin")}
          className="text-white hover:underline font-medium"
        >
          Sign in
        </button>
      </p>
    </Form>
  );
};

export default SignUpForm;
