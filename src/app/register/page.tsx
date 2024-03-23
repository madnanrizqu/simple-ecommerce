"use client";

import { Button, Input } from "@/ui_kit";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

import classes from "./register.module.css";
import { useForm, Controller } from "react-hook-form";
import { User } from "@/type/user";

const Register = () => {
  const { control } =
    useForm<Pick<User, "email" | "name" | "password" | "contactNumber">>();

  return (
    <Flex className={classes.root}>
      <Flex grow="1" justify="center" align="center">
        <Box className={classes.section} style={{ textAlign: "center" }}>
          <Heading style={{ fontSize: 48 }}>Nama Aplikasi</Heading>
          <Text style={{ fontSize: 14, marginTop: 40, display: "block" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
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
                  render={() => (
                    <Input
                      className={classes.input}
                      placeholder="Masukkan nama lengkap"
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
                  render={() => (
                    <Input
                      className={classes.input}
                      placeholder="Contoh: budi@gmail.com"
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
                  render={() => (
                    <Input
                      className={classes.input}
                      placeholder="Contoh: 8512521325"
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
                  render={() => (
                    <Input
                      className={classes.input}
                      placeholder="Masukkan password. Minimal 6 karakter"
                    ></Input>
                  )}
                ></Controller>
              </Flex>
            </Flex>
            <Button style={{ width: "100%", marginTop: 24 }}>Masuk</Button>
          </header>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
