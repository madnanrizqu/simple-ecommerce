import { Button, Input } from "@/ui_kit";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

import classes from "./login.module.css";

const Login = () => {
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
            <Heading as="h2">Selamat Datang Admin</Heading>
            <Text
              style={{
                fontSize: 12,
                color: "#9B9B9B",
                marginTop: 8,
                display: "block",
              }}
            >
              Silahkan masukkan email atau nomor telepon dan password Anda untuk
              mulai menggunakan aplikasi
            </Text>

            <Flex direction="column" gap="3" style={{ marginTop: 24 }}>
              <Flex direction="column" gap="1">
                <label className={classes.label}>Email / Nomor Telpon</label>
                <Input
                  className={classes.input}
                  placeholder="Contoh: admin@gmail.com"
                ></Input>
              </Flex>
              <Flex direction="column" gap="1">
                <label className={classes.label}>Password</label>
                <Input
                  className={classes.input}
                  placeholder="Masukkan passward"
                ></Input>
              </Flex>
            </Flex>
            <Button style={{ width: "100%", marginTop: 24 }}>Masuk</Button>
          </header>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
