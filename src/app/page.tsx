import { Button, Flex, Image, Input, Box } from "@/ui_kit";
import { SearchIcon } from "@/ui_kit/icons";

export default function Home() {
  return (
    <>
      <header>
        <Flex
          align="center"
          gap="9"
          px="5"
          py="3"
          style={{ borderBottom: "2px solid #EDEDED" }}
        >
          <Box style={{ height: 27 }}>
            <Image
              alt="Vascomm logo"
              src="/images/vascomm_logo.png"
              width={168}
              height={27}
            />
          </Box>
          <Box grow="1">
            <Input
              rightIcon={<SearchIcon />}
              style={{ background: "#F9F9F9" }}
              placeholder="Cari parfum kesukaanmu"
            ></Input>
          </Box>
          <Flex gap="2">
            <Button variant="outline">MASUK</Button>
            <Button>DAFTAR</Button>
          </Flex>
        </Flex>
      </header>
    </>
  );
}
