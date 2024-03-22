import { Button } from "@/ui_kit";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import classes from "./page.module.css";
import DashboardChip from "../components/DashboardChip";

const userData = [
  {
    number: 1,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: false,
  },
  {
    number: 2,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: true,
  },
  {
    number: 3,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: false,
  },
  {
    number: 4,
    name: "Aden S. Putra",
    email: "aden@gmail.com",
    contactNumber: "0818782328",
    deleted: true,
  },
];

const Users = () => {
  return (
    <Box className={classes.root}>
      <Flex justify="between" align="center">
        <Heading className={classes.headline}>Manajemen User</Heading>
        <Button style={{ padding: "8px 24px", fontWeight: 700 }}>
          Tambah User
        </Button>
      </Flex>

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
          {userData.map((v) => (
            <TableRow key={v.number}>
              <TableCell>{v.number}</TableCell>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.email}</TableCell>
              <TableCell>{v.contactNumber}</TableCell>
              <TableCell>
                <DashboardChip variant={v.deleted ? "inActive" : "active"} />
              </TableCell>
              <TableCell>
                <Flex gap="3">
                  <IconButton
                    variant="solid"
                    size="1"
                    radius="full"
                    style={{ background: "#EC9024", cursor: "pointer" }}
                  >
                    <Pencil1Icon />
                  </IconButton>
                  <IconButton
                    variant="solid"
                    size="1"
                    radius="full"
                    color="red"
                    style={{ cursor: "pointer" }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
};

export default Users;
