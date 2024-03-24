"use client";

import { Button, Input } from "@/ui_kit";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import classes from "./login.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import { PageLoader } from "@/ui_kit/PageLoader";
import { useAuthStore } from "@/store/auth";
import { getCurrentUser } from "@/api/user";
import { LoggedInUser } from "@/type/user";

const Login = () => {
  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "madnanrizqullah@gmail.com",
      password: "rahasia",
    },
  });

  const [loading, setLoading] = useState<"loading" | "none">("none");

  const router = useRouter();

  const authStore = useAuthStore();

  return (
    <PageLoader isLoading={loading !== "none"}>
      <Flex className={classes.root}>
        <Flex grow="1" justify="center" align="center">
          <Box className={classes.section} style={{ textAlign: "center" }}>
            <Heading style={{ fontSize: 48 }}>Nama Aplikasi</Heading>
            <Text style={{ fontSize: 14, marginTop: 40, display: "block" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </Text>
          </Box>
        </Flex>
        <Flex grow="1" justify="center" align="center">
          <Box className={classes.section}>
            <header>
              <Heading as="h2">Selamat Datang</Heading>
              <Text
                style={{
                  fontSize: 12,
                  color: "#9B9B9B",
                  marginTop: 8,
                  display: "block",
                }}
              >
                Silahkan masukkan email dan password Anda untuk mulai
                menggunakan aplikasi
              </Text>
              <Flex direction="column" gap="3" style={{ marginTop: 24 }}>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>Email</label>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }}
                    name="email"
                    render={({ field }) => (
                      <Input
                        className={classes.input}
                        placeholder="Contoh: admin@gmail.com"
                        {...field}
                      ></Input>
                    )}
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>Password</label>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="password"
                    render={({ field }) => (
                      <Input
                        className={classes.input}
                        placeholder="Masukkan password"
                        {...field}
                      ></Input>
                    )}
                  />
                </Flex>
              </Flex>
              <Button
                style={{ width: "100%", marginTop: 24 }}
                onClick={handleSubmit(async (formValues) => {
                  try {
                    setLoading("loading");
                    const res = await login({
                      email: formValues.email,
                      password: formValues.password,
                    });
                    setLoading("none");

                    const data = await getCurrentUser();

                    console.log(data?.user);

                    authStore.setUser(data?.user as LoggedInUser);
                    authStore.setToken(res?.access_token as string);

                    toast("Berhasil login, mengarahkan ke dashboard...", {
                      autoClose: 2500,
                      onClose: () => {
                        router.push("/dashboard");
                      },
                    });
                  } catch (error) {
                    setLoading("none");
                    toast("Terjadi kesalahan");
                  }
                })}
              >
                Masuk
              </Button>
            </header>
          </Box>
        </Flex>
      </Flex>
    </PageLoader>
  );
};

export default Login;
