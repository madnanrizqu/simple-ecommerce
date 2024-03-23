"use client";

import { Button, Input } from "@/ui_kit";
import {
  Box,
  DialogContent,
  DialogRoot,
  DialogTitle,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";

import classes from "./register.module.css";
import { useForm, Controller } from "react-hook-form";
import { User } from "@/type/user";
import { registerUser } from "@/api/auth";
import { toast } from "react-toastify";
import { PageLoader } from "@/ui_kit/PageLoader";
import { isAxiosError } from "axios";

const Register = () => {
  const { control, handleSubmit } = useForm<
    Pick<User, "email" | "name" | "password" | "contactNumber">
  >({
    defaultValues: {
      name: "test3",
      email: "test3@gmail.com",
      contactNumber: "8612412315",
      password: "test12",
    },
  });
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<"verifyEmail" | "none">("none");
  const [verifyEmailLink, setVerifyEmailLink] = useState<string | null>(null);

  return (
    <PageLoader isLoading={loading}>
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
              <Heading as="h2">Registrasi Kustomer</Heading>
              <Text
                style={{
                  fontSize: 12,
                  color: "#9B9B9B",
                  marginTop: 8,
                  display: "block",
                }}
              >
                Silahkan mendaftar dengan memasukkan informasi yang tertera
              </Text>

              <Flex direction="column" gap="3" style={{ marginTop: 24 }}>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>Nama</label>
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className={classes.input}
                        placeholder="Masukkan nama lengkap"
                        {...field}
                      ></Input>
                    )}
                  ></Controller>
                </Flex>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>Email</label>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <Input
                        className={classes.input}
                        placeholder="Contoh: budi@gmail.com"
                        {...field}
                      ></Input>
                    )}
                  ></Controller>
                </Flex>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>No Kontak</label>
                  <Controller
                    control={control}
                    name="contactNumber"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className={classes.input}
                        placeholder="Contoh: 8512521325"
                        {...field}
                      ></Input>
                    )}
                  ></Controller>
                </Flex>
                <Flex direction="column" gap="1">
                  <label className={classes.label}>Password</label>
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: true, minLength: 6 }}
                    render={({ field }) => (
                      <Input
                        type="password"
                        className={classes.input}
                        placeholder="Masukkan password. Minimal 6 karakter"
                        {...field}
                      ></Input>
                    )}
                  ></Controller>
                </Flex>
              </Flex>
              <Button
                style={{ width: "100%", marginTop: 24 }}
                onClick={handleSubmit(async (formValues) => {
                  try {
                    setLoading(true);
                    const res = await registerUser({
                      name: formValues.name,
                      password: formValues.password,
                      email: formValues.email,
                      contactNumber: formValues.contactNumber,
                      contactNumberExtension: "+62",
                      role: "CUSTOMER",
                    });

                    console.log(res);
                    setLoading(false);
                    setVerifyEmailLink(res);
                    setDialog("verifyEmail");
                  } catch (error) {
                    if (isAxiosError(error)) {
                      setLoading(false);
                      toast(
                        `Terjadi kesalahan: ${error.response?.data?.message}`
                      );
                    } else {
                      toast(`Terjadi kesalahan`);
                    }
                  }
                })}
              >
                Submit
              </Button>
            </header>
          </Box>
        </Flex>

        <DialogRoot open={dialog === "verifyEmail"}>
          <DialogContent>
            <DialogTitle>Berhasil! Silahkan valdiasi email</DialogTitle>
            <Text>Go and visit this url: </Text>
            <a href={verifyEmailLink as string}>{verifyEmailLink}</a>
          </DialogContent>
        </DialogRoot>
      </Flex>
    </PageLoader>
  );
};

export default Register;
