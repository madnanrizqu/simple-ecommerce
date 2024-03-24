"use client";

import { Button, Input } from "@/ui_kit";
import {
  Box,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  Flex,
  Heading,
  IconButton,
  Inset,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { Cross1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import classes from "./page.module.css";
import DashboardChip from "../components/DashboardChip";
import { ProductForm } from "../components/ProductForm";
import { Pagination } from "../components/Pagination";
import { useFetch } from "@/hooks/useFetch";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getTotalProducts,
  updateProduct,
} from "@/api/products";
import { pagination } from "@/utils/pagination";
import Skeleton from "react-loading-skeleton";
import { PageLoader } from "@/ui_kit/PageLoader";
import { toast } from "react-toastify";
import { Product } from "@/type/product";
import dayjs from "dayjs";

const productData = [
  {
    id: 1,
    number: 1,
    name: "Aden S. Putra",
    createdAt: "23/03/2024",
    price: 100000,
    deleted: false,
  },
  {
    id: 2,
    number: 2,
    name: "Aden S. Putra",
    createdAt: "23/03/2024",
    price: 100000,
    deleted: true,
  },
  {
    id: 3,
    number: 3,
    name: "Aden S. Putra",
    createdAt: "23/03/2024",
    price: 100000,
    deleted: false,
  },
  {
    id: 4,
    number: 4,
    name: "Aden S. Putra",
    createdAt: "23/03/2024",
    price: 100000,
    deleted: true,
  },
];

const Users = () => {
  const [dialog, setDialog] = useState<"create" | "update" | "delete" | "none">(
    "none"
  );

  const [loading, setLoading] = useState<
    "create" | "update" | "delete" | "none"
  >("none");

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const [page, setPage] = useState(1);
  const take = 5;
  const tableQuery = useFetch(
    () => getProducts({ take, skip: pagination.calcSkip({ take, page }) }),
    [page]
  );

  return (
    <PageLoader isLoading={loading !== "none"}>
      <Box className={classes.root}>
        <Flex justify="between" align="center">
          <Heading className={classes.headline}>Manajemen Produk</Heading>
          <Button
            style={{ padding: "8px 24px", fontWeight: 700 }}
            onClick={() => setDialog("create")}
          >
            Tambah Produk
          </Button>
        </Flex>

        {tableQuery.status === "success" ? (
          <TableRoot className={classes.table}>
            <TableHeader>
              <TableRow>
                <TableColumnHeaderCell>No</TableColumnHeaderCell>
                <TableColumnHeaderCell>Nama</TableColumnHeaderCell>
                <TableColumnHeaderCell>Tanggal Dibuat</TableColumnHeaderCell>
                <TableColumnHeaderCell>Harga (IDR)</TableColumnHeaderCell>
                <TableColumnHeaderCell>Status</TableColumnHeaderCell>
                <TableColumnHeaderCell></TableColumnHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableQuery.data?.products &&
                tableQuery.data.products.map((v, index) => (
                  <TableRow key={v.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>
                      {new Date(v.created_at).toDateString()}
                    </TableCell>
                    <TableCell>{v.price}</TableCell>
                    <TableCell>
                      <DashboardChip
                        variant={v.deleted ? "inActive" : "active"}
                      />
                    </TableCell>
                    <TableCell>
                      <Flex gap="3">
                        <IconButton
                          variant="solid"
                          size="1"
                          radius="full"
                          style={{ background: "#EC9024", cursor: "pointer" }}
                          onClick={() => {
                            setDialog("update");
                            setSelectedProductId(v.id);
                          }}
                        >
                          <Pencil1Icon />
                        </IconButton>
                        {!v.deleted && (
                          <IconButton
                            variant="solid"
                            size="1"
                            radius="full"
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setDialog("delete");
                              setSelectedProductId(v.id);
                            }}
                          >
                            <TrashIcon />
                          </IconButton>
                        )}
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableRoot>
        ) : (
          <Skeleton count={15} />
        )}

        <Pagination
          page={page}
          maxPage={pagination.calcMaxPage({
            take,
            total: tableQuery.data?.total,
          })}
          style={{ marginTop: "16px", justifyContent: "end" }}
          onClickNext={(newPage) => setPage(newPage)}
          onClickPrev={(newPage) => setPage(newPage)}
        />

        <DialogRoot open={dialog === "create" || dialog === "update"}>
          <DialogContent style={{ maxWidth: 450, position: "relative" }}>
            <IconButton
              radius="full"
              variant="ghost"
              size="2"
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "16px",
                top: "16px",
              }}
              onClick={() => setDialog("none")}
            >
              <Cross1Icon height="24px" width="24px" />
            </IconButton>
            <DialogTitle style={{ textAlign: "center" }}>
              {dialog === "create" ? "Tambah Data Produk" : "Ubah Data Produk"}
            </DialogTitle>

            <ProductForm
              initialData={(() => {
                if (
                  dialog === "update" &&
                  selectedProductId &&
                  tableQuery.data?.products
                ) {
                  const product = tableQuery.data.products.find(
                    (v) => v.id === selectedProductId
                  ) as Product;

                  return {
                    name: product.name,
                    price: product.price,
                    createdAt: dayjs(new Date(product.created_at)).format(
                      "DD/MM/YYYY"
                    ),
                  };
                } else {
                  return undefined;
                }
              })()}
              onSubmit={async (v) => {
                if (dialog === "create") {
                  try {
                    setLoading("create");
                    const product = await createProduct({
                      ...v,
                      currency: "IDR",
                    });

                    setLoading("none");
                    setDialog("none");

                    toast(`Berhasil membuat produk ${product?.name}`);

                    tableQuery.refetch();
                  } catch (error) {
                    setLoading("none");

                    toast("Terjadi kesahalan");
                  }
                } else if (dialog === "update") {
                  try {
                    setLoading("update");
                    const product = await updateProduct(
                      selectedProductId as number,
                      v
                    );

                    setLoading("none");
                    setDialog("none");

                    toast(`Berhasil mengubah produk ${product?.name}`);

                    tableQuery.refetch();
                  } catch (error) {
                    setLoading("none");

                    toast("Terjadi kesahalan");
                  }
                }
              }}
            />
          </DialogContent>
        </DialogRoot>

        <DialogRoot open={dialog === "delete"}>
          <DialogContent style={{ maxWidth: 450, position: "relative" }}>
            <Inset>
              <Box style={{ position: "relative", height: 120 }}>
                <Box
                  width="100%"
                  style={{
                    background: "#41A0E4",
                    height: 72,
                    borderRadius: "0px 0px 1px 1px",
                  }}
                ></Box>
                <Box
                  style={{
                    height: 75,
                    width: 75,
                    borderRadius: "100%",
                    background: "#D83A56",
                    position: "absolute",
                    zIndex: 1,
                    top: 32,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                ></Box>
              </Box>
            </Inset>
            <Flex
              direction="column"
              gap="3"
              style={{ textAlign: "center", marginTop: "48px" }}
            >
              <Text style={{ fontSize: 24, fontWeight: 700 }}>
                Konfirmasi Hapus
              </Text>
              <Text
                style={{ color: "#A4A4A4" }}
              >{`Apakah kamu yakin menghapus ${
                (tableQuery.data?.products &&
                  tableQuery.data.products.find(
                    (v) => v.id === selectedProductId
                  )?.name) ??
                "produk"
              }?`}</Text>
            </Flex>
            <Inset side="x" mt="2">
              <Flex
                justify="end"
                gap="5"
                style={{
                  marginTop: "12px",
                  borderTop: "1px solid #E0E0E0",
                  paddingTop: "24px",
                  paddingRight: "24px",
                }}
              >
                <Button variant="outline" onClick={() => setDialog("none")}>
                  Batal
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      setLoading("delete");
                      await deleteProduct(selectedProductId as number);

                      setDialog("none");
                      setLoading("none");

                      toast(
                        `Berhasil menghapus produk dengan id: ${selectedProductId}`
                      );

                      tableQuery.refetch();
                    } catch (error) {
                      setDialog("none");
                      setLoading("none");

                      toast("Terjadi kesalahan");
                    }
                  }}
                >
                  Hapus
                </Button>
              </Flex>
            </Inset>
          </DialogContent>
        </DialogRoot>
      </Box>
    </PageLoader>
  );
};

export default Users;
