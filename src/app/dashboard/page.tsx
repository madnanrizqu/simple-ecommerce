"use client";

import {
  Box,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from "@radix-ui/themes";
import React, { useCallback, useState } from "react";

import classes from "./page.module.css";
import DashboardCard from "./components/DashboardCard";
import { Pagination } from "./components/Pagination";
import { useFetch } from "@/hooks/useFetch";
import { getTotalUsers } from "@/api/user";
import Skeleton from "react-loading-skeleton";
import {
  getProducts,
  getPublicProducts,
  getTotalProducts,
} from "@/api/products";
import { pagination } from "@/utils/pagination";
import { useAuthStore } from "@/store/auth";

const Dashboard = () => {
  const authStore = useAuthStore();
  const usersQuery = useFetch(
    getTotalUsers,
    [],
    null,
    authStore.user?.role !== "ADMIN"
  );
  const productsQuery = useFetch(
    getTotalProducts,
    [],
    null,
    authStore.user?.role !== "ADMIN"
  );

  const [page, setPage] = useState(1);
  const take = 5;
  const tableQuery = useFetch(
    () =>
      authStore.user?.role === "ADMIN"
        ? getProducts({ take, skip: pagination.calcSkip({ take, page }) })
        : getPublicProducts({
            take,
            skip: pagination.calcSkip({ take, page }),
          }),
    [page]
  );

  return (
    <Box className={classes.root}>
      <Heading>Dashboard</Heading>
      {authStore.user?.role === "ADMIN" ? (
        usersQuery.status === "success" &&
        productsQuery.status === "success" ? (
          <Flex gap="4" className={classes.cards}>
            <DashboardCard
              title="Jumlah User"
              value={String(usersQuery.data?.total as number)}
              valueLabel="User"
            />
            <DashboardCard
              title="Jumlah User Aktif"
              value={String(usersQuery.data?.notDeleted as number)}
              valueLabel="User"
            />
            <DashboardCard
              title="Jumlah Produk"
              value={String(productsQuery.data?.total as number)}
              valueLabel="User"
            />
            <DashboardCard
              title="Jumlah Produk Aktif"
              value={String(productsQuery.data?.notDeleted as number)}
              valueLabel="User"
            />
          </Flex>
        ) : (
          <Skeleton count={5} />
        )
      ) : null}
      <Flex direction="column" gap="2" className={classes.newProduct}>
        <Text className={classes.newProductTitle}>Produk Terbaru</Text>
        {tableQuery.status === "success" ? (
          <TableRoot>
            <TableHeader>
              <TableRow className={classes.tableHeaderRow}>
                <TableColumnHeaderCell>Produk</TableColumnHeaderCell>
                <TableColumnHeaderCell>Tanggal Dibuat</TableColumnHeaderCell>
                <TableColumnHeaderCell>Harga (Rp)</TableColumnHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tableQuery.data?.products &&
                tableQuery.data.products.map((v) => (
                  <>
                    <TableRow key={v.id}>
                      <TableCell>{v.name}</TableCell>
                      <TableCell>
                        {new Date(v.created_at).toDateString()}
                      </TableCell>
                      <TableCell>{v.price}</TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </TableRoot>
        ) : (
          <Skeleton count={7} />
        )}
      </Flex>
      <Pagination
        page={page}
        style={{ marginTop: "16px", justifyContent: "end" }}
        onClickNext={(newPage) => setPage(newPage)}
        onClickPrev={(newPage) => setPage(newPage)}
        maxPage={pagination.calcMaxPage({
          take,
          total: tableQuery.data?.total,
        })}
      />
    </Box>
  );
};

export default Dashboard;
