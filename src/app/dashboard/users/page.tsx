"use client";

import { Button } from "@/ui_kit";
import {
  Box,
  DialogContent,
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
} from "@radix-ui/themes";
import { Cross1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import classes from "./page.module.css";
import DashboardChip from "../components/DashboardChip";
import { Pagination } from "../components/Pagination";
import { UserForm } from "../components/UserForm";
import { useFetch } from "@/hooks/useFetch";
import { createUser, deleteUser, getUsers, updateUser } from "@/api/user";
import { pagination } from "@/utils/pagination";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { PageLoader } from "@/ui_kit/PageLoader";
import { User, UserAsResponse } from "@/type/user";

const userData = [
  {
    id: 1,
    number: 1,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    role: "CUSTOMER" as "CUSTOMER",
    deleted: false,
  },
  {
    id: 2,
    number: 2,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: true,
    role: "CUSTOMER" as "CUSTOMER",
  },
  {
    id: 3,
    number: 3,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: false,
    role: "CUSTOMER" as "CUSTOMER",
  },
  {
    id: 4,
    number: 4,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: true,
    role: "CUSTOMER" as "CUSTOMER",
  },
];

const Users = () => {
  const [dialog, setDialog] = useState<"create" | "update" | "delete" | "none">(
    "none"
  );
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState<
    "create" | "update" | "delete" | "none"
  >("none");

  const [page, setPage] = useState(1);
  const take = 5;
  const tableQuery = useFetch(
    () => getUsers({ take, skip: pagination.calcSkip({ take, page }) }),
    [page]
  );

  return (
    <PageLoader isLoading={loading !== "none"}>
      <Box className={classes.root}>
        <Flex justify="between" align="center">
          <Heading className={classes.headline}>Manajemen User</Heading>
          <Button
            style={{ padding: "8px 24px", fontWeight: 700 }}
            onClick={() => setDialog("create")}
          >
            Tambah User
          </Button>
        </Flex>

        {tableQuery.status === "success" ? (
          <TableRoot className={classes.table}>
            <TableHeader>
              <TableRow>
                <TableColumnHeaderCell>No</TableColumnHeaderCell>
                <TableColumnHeaderCell>Nama Lengkap</TableColumnHeaderCell>
                <TableColumnHeaderCell>Email</TableColumnHeaderCell>
                <TableColumnHeaderCell>No Telepon</TableColumnHeaderCell>
                <TableColumnHeaderCell>Status</TableColumnHeaderCell>
                <TableColumnHeaderCell></TableColumnHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableQuery.data?.users &&
                tableQuery.data.users.map((v, index) => (
                  <TableRow key={v.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.email}</TableCell>
                    <TableCell>{v.contact_number}</TableCell>
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
                            setSelectedUserId(v.id);
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
                              setSelectedUserId(v.id);
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
          maxPage={pagination.calcMaxPage({
            total: tableQuery.data?.total,
            take,
          })}
          page={page}
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
              {dialog === "create" ? "Tambah Data User" : "Ubah Data User"}
            </DialogTitle>

            <UserForm
              initialData={(function () {
                if (
                  dialog === "update" &&
                  selectedUserId &&
                  tableQuery.data?.users
                ) {
                  const user = tableQuery.data.users.find(
                    (v) => v.id === selectedUserId
                  ) as UserAsResponse;

                  return {
                    name: user.name,
                    email: user.email,
                    contactNumber: user.contact_number,
                    role: user.role,
                  };
                } else {
                  return undefined;
                }
              })()}
              onSubmit={async (v) => {
                if (dialog === "create") {
                  try {
                    setLoading("create");
                    const user = await createUser({
                      ...v,
                      contactNumberExtension: "+62",
                    });

                    setLoading("none");
                    setDialog("none");
                    toast(`Berhasil membuat user ${user?.name ?? ""}`);

                    await tableQuery.refetch();
                  } catch (error) {
                    setLoading("none");
                    if (isAxiosError(error)) {
                      toast(
                        `Terjadi kesalahan: ${
                          error.response?.data?.message ?? ""
                        }`
                      );
                    } else {
                      toast("Terjadi kesalahan");
                    }
                  }
                } else if (dialog === "update") {
                  try {
                    setLoading("update");
                    console.log(v);

                    const user = await updateUser(selectedUserId as number, v);

                    setLoading("none");
                    setDialog("none");
                    toast(`Berhasil mengubah user ${user?.name ?? ""}`);
                    await tableQuery.refetch();
                  } catch (error) {
                    setLoading("none");
                    if (isAxiosError(error)) {
                      toast(
                        `Terjadi kesalahan: ${
                          error.response?.data?.message ?? ""
                        }`
                      );
                    } else {
                      toast("Terjadi kesalahan");
                    }
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
                (tableQuery.data?.users &&
                  tableQuery.data.users.find((v) => v.id === selectedUserId)
                    ?.name) ??
                "user"
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
                      await deleteUser(selectedUserId as number);

                      setLoading("none");
                      setDialog("none");
                      toast(
                        `Berhasil menghapus user dengan id: ${selectedUserId}`
                      );
                      tableQuery.refetch();
                    } catch (error) {
                      setLoading("none");
                      setDialog("none");
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
