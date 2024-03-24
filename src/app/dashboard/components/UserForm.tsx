import { Button, Input } from "@/ui_kit";
import { Flex } from "@radix-ui/themes";
import React from "react";
import classes from "./UserForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { User } from "@/type/user";

type FormUser = Omit<User, "contactNumberExtension">;
type UserForm = {
  initialData?: Omit<FormUser, "password">;
  onSubmit?: (v: FormUser) => void;
};

export const UserForm = (props: UserForm) => {
  const { control, handleSubmit } = useForm<FormUser>({
    defaultValues: {
      name: props.initialData?.name ?? "",
      email: props.initialData?.email ?? "",
      contactNumber: props.initialData?.contactNumber ?? "",
      role: props.initialData?.role ?? undefined,
    },
  });

  return (
    <>
      <Flex direction="column" gap="3">
        <Flex direction="column" gap="2">
          <label className={classes.label}>Nama</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="Masukkan nama"
                {...field}
              ></Input>
            )}
          ></Controller>
        </Flex>

        <Flex direction="column" gap="2">
          <label className={classes.label}>Email</label>
          <Controller
            name="email"
            rules={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            control={control}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="Masukkan email"
                type="email"
                {...field}
              ></Input>
            )}
          ></Controller>
        </Flex>

        {!props.initialData && (
          <Flex direction="column" gap="2">
            <label className={classes.label}>Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <Input
                  className={classes.input}
                  placeholder="Masukkan password"
                  {...field}
                ></Input>
              )}
            ></Controller>
          </Flex>
        )}

        <Flex direction="column" gap="2">
          <label className={classes.label}>Role</label>
          <Controller
            name="role"
            control={control}
            rules={{ required: true, pattern: /ADMIN|CUSTOMER/ }}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="Masukkan jenis user (ADMIN | CUSTOMER)"
                {...field}
              ></Input>
            )}
          ></Controller>
        </Flex>

        <Flex direction="column" gap="2">
          <label className={classes.label}>No Kontak</label>
          <Controller
            name="contactNumber"
            rules={{ required: true, pattern: /\d/ }}
            control={control}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="Contoh: 886124123"
                type="number"
                {...field}
              ></Input>
            )}
          ></Controller>
        </Flex>
      </Flex>

      <Flex gap="3" mt="4">
        <Button
          style={{
            flex: 1,
            textTransform: "uppercase",
            padding: "20px",
          }}
          onClick={props.onSubmit ? handleSubmit(props.onSubmit) : undefined}
        >
          Simpan
        </Button>
      </Flex>
    </>
  );
};
