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

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex className={classes.root} direction="column">
      <footer className={classes.navbar}>
        <Flex justify="between">
          <Text size="2">LOGO</Text>
          <Flex align="center" gap="4">
            <Flex direction="column" align="end">
              <Text style={{ color: "#41A0E4", fontSize: "10px" }}>
                Hallo Admin,
              </Text>
              <Text size="2">Aden S. Putra</Text>
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
                    <Text size="2">Aden S. Putra</Text>
                    <Text style={{ fontSize: 10 }}>Aden@gmail.com</Text>
                  </Flex>
                  <Button variant="outline" className={classes.logoutButton}>
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
                <Flex
                  align="center"
                  gap="2"
                  className={clsx(
                    classes.sidebarItem,
                    classes.sidebarItemActive
                  )}
                >
                  <HomeIcon />
                  <Text size="2">Dashboard</Text>
                </Flex>
              </li>
              <li>
                <Flex
                  align="center"
                  gap="2"
                  className={clsx(classes.sidebarItem)}
                >
                  <UserIcon />
                  <Text size="2">Manajemen User</Text>
                </Flex>
              </li>
              <li>
                <Flex
                  align="center"
                  gap="2"
                  className={clsx(classes.sidebarItem)}
                >
                  <ProductIcon />
                  <Text size="2">Manajemen Pesanan</Text>
                </Flex>
              </li>
            </ul>
          </nav>
        </aside>
        <main className={classes.main}>{children}</main>
      </Flex>
    </Flex>
  );
}
