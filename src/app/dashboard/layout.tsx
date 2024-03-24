"use client";

import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Text,
} from "@radix-ui/themes";
import HomeIcon from "@/ui_kit/icons/HomeIcon";
import ProductIcon from "@/ui_kit/icons/ProductIcon";
import UserIcon from "@/ui_kit/icons/UserIcon";
import PowerIcon from "@/ui_kit/icons/PowerIcon";

import classes from "./layout.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { logout } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const authStore = useAuthStore();

  return (
    <Flex className={classes.root} direction="column">
      <footer className={classes.navbar}>
        <Flex justify="between">
          <Text size="2">LOGO</Text>
          <Flex align="center" gap="4">
            <Flex direction="column" align="end">
              <Text style={{ color: "#41A0E4", fontSize: "10px" }}>
                {`Halo ${authStore.user?.role}`}
              </Text>
              <Text size="2">{authStore.user?.name ?? "-"}</Text>
            </Flex>
            <PopoverRoot>
              <PopoverTrigger>
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    background: "#C4C4C4",
                    cursor: "pointer",
                  }}
                ></Box>
              </PopoverTrigger>
              <PopoverContent style={{ width: 200 }}>
                <Flex gap="2" direction="column" align="center">
                  <Flex
                    gap="1"
                    direction="column"
                    align="center"
                    style={{ borderBottom: "1px solid #F2F2F2" }}
                  >
                    <Box
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "100%",
                        background: "#C4C4C4",
                      }}
                    ></Box>
                    <Text size="2">{authStore.user?.name ?? "-"}</Text>
                    <Text style={{ fontSize: 10 }}>
                      {authStore.user?.email ?? "-"}
                    </Text>
                  </Flex>
                  <Button
                    variant="outline"
                    className={classes.logoutButton}
                    onClick={async () => {
                      try {
                        await logout();
                        toast("Berhasil!");
                        router.push("/login");
                      } catch (error) {
                        toast("Terjadi kesalahan");
                      }
                    }}
                  >
                    <PowerIcon /> Keluar
                  </Button>
                </Flex>
              </PopoverContent>
            </PopoverRoot>
          </Flex>
        </Flex>
      </footer>
      <Flex grow="1" className={classes.mainContainer}>
        <aside style={{ paddingTop: "20px" }}>
          <nav>
            <ul>
              <li>
                <Link href="/dashboard">
                  <Flex
                    align="center"
                    gap="2"
                    className={clsx(classes.sidebarItem, {
                      [classes.sidebarItemActive]: pathname === "/dashboard",
                    })}
                  >
                    <HomeIcon />
                    <Text size="2">Dashboard</Text>
                  </Flex>
                </Link>
              </li>
              {authStore.user?.role === "ADMIN" && (
                <>
                  <li>
                    <Link href="/dashboard/users">
                      <Flex
                        align="center"
                        gap="2"
                        className={clsx(classes.sidebarItem, {
                          [classes.sidebarItemActive]:
                            pathname === "/dashboard/users",
                        })}
                      >
                        <UserIcon />
                        <Text size="2">Manajemen User</Text>
                      </Flex>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/products">
                      <Flex
                        align="center"
                        gap="2"
                        className={clsx(classes.sidebarItem, {
                          [classes.sidebarItemActive]:
                            pathname === "/dashboard/products",
                        })}
                      >
                        <ProductIcon />
                        <Text size="2">Manajemen Pesanan</Text>
                      </Flex>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>
        <main className={classes.main}>{children}</main>
      </Flex>
    </Flex>
  );
}
