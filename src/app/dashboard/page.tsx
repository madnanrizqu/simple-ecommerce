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
import React from "react";

import classes from "./page.module.css";
import DashboardCard from "./components/DashboardCard";
import { Pagination } from "./components/Pagination";
import { useFetch } from "@/hooks/useFetch";
import { getTotalUsers } from "@/api/user";
import Skeleton from "react-loading-skeleton";
import { getTotalProducts } from "@/api/products";

const Dashboard = () => {
  const usersQuery = useFetch(getTotalUsers);
  const productsQuery = useFetch(getTotalProducts);

  return (
    <Box className={classes.root}>
      <Heading>Dashboard</Heading>
      {usersQuery.status === "success" && productsQuery.status === "success" ? (
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
      )}
      <Flex direction="column" gap="2" className={classes.newProduct}>
        <Text className={classes.newProductTitle}>Produk Terbaru</Text>
        <TableRoot>
          <TableHeader>
            <TableRow className={classes.tableHeaderRow}>
              <TableColumnHeaderCell>Produk</TableColumnHeaderCell>
              <TableColumnHeaderCell>Tanggal Dibuat</TableColumnHeaderCell>
              <TableColumnHeaderCell>Harga (Rp)</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Microsoft Surface 7</TableCell>
              <TableCell>12 Mei 2023</TableCell>
              <TableCell>Rp. 1000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Microsoft Surface 7</TableCell>
              <TableCell>12 Mei 2023</TableCell>
              <TableCell>Rp. 1000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Microsoft Surface 7</TableCell>
              <TableCell>12 Mei 2023</TableCell>
              <TableCell>Rp. 1000</TableCell>
            </TableRow>
          </TableBody>
        </TableRoot>
      </Flex>
      <Pagination
        page={1}
        style={{ marginTop: "16px", justifyContent: "end" }}
      />
    </Box>
  );
};

export default Dashboard;
