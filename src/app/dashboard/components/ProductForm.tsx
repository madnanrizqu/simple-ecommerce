import { Button, Input } from "@/ui_kit";
import { Flex } from "@radix-ui/themes";
import React from "react";
import classes from "./ProductForm.module.css";
import { useForm, Controller } from "react-hook-form";

type Product = { name: string; createdAt: string; price: number };
type ProductForm = {
  initialData?: Product;
  onSubmit?: (v: Product) => void;
};

export const ProductForm = (props: ProductForm) => {
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: {
      name: props.initialData?.name ?? "",
      createdAt: props.initialData?.createdAt ?? "",
      price: props.initialData?.price ?? undefined,
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
          <label className={classes.label}>Tanggal Dibuat</label>
          <Controller
            name="createdAt"
            rules={{
              required: true,
              pattern:
                /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
            }}
            control={control}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="DD/MM/YYYY"
                {...field}
              ></Input>
            )}
          ></Controller>
        </Flex>

        <Flex direction="column" gap="2">
          <label className={classes.label}>Harga (IDR)</label>
          <Controller
            name="price"
            rules={{ required: true, pattern: /\d/ }}
            control={control}
            render={({ field }) => (
              <Input
                className={classes.input}
                placeholder="Contoh: 10000"
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
