"use client";
import React from "react";
import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Route } from "lucide-react";
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
  const [isAlert, setAlert] = useState(null);
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

      form.reset({
        Name: "",
        Email: "",
        Password: "",
      });

      const message = await res.json();
      console.log(message);

      if (res.status === 209) {
        setAlert(message.message);
      }
    } catch (error: any) {
      console.error("Found Error : " + error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex gap-2">
          <Button
            type="submit"
            className=" bg-[#141414] hover:bg-black mt-5 w-full"
          >
            Submit
          </Button>
        </div>
      </form>
      <div className=" w-full text-center mt-1">
        <span
          className=" w-full justify-center items-center hover:underline  text-white hover:cursor-pointer text-xs"
          onClick={() => router.push("/signin")}
        >
          Already a User ?
        </span>
      </div>
      <div className=" w-full flex justify-center mt-2">
        <Button
          className=" bg-[#141414] hover:bg-black mt-1 w-auto flex gap-2 "
          onClick={() => SignInWithGoogle()}
        >
          <img src="./GoogleLogo.png" width={20} height={20} />
          <span>Continue with Google</span>
        </Button>
      </div>
      {isAlert != "" ? (
        <div className=" w-full justify-center items-center text-[#ff3131] font-semibold text-center mt-1">
          <span className=" w-full">{isAlert}</span>
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default SignUpForm;
