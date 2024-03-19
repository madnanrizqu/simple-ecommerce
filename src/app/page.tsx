import { Button, Flex, Image, Input, Box } from "@/ui_kit";
import { SearchIcon } from "@/ui_kit/icons";
import { Container, Text } from "@radix-ui/themes";

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
      <main>
        <Container size="3" py="4">
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
            aspernatur! Atque nobis facere distinctio recusandae pariatur.
            Itaque porro harum id, labore totam numquam provident amet, fugit,
            neque soluta officiis reprehenderit! Reiciendis suscipit non ex
            iusto ut? Accusamus, consectetur eaque. Quam natus libero provident
            facilis accusamus vero labore nesciunt in voluptates, deleniti,
            adipisci sapiente tenetur porro eaque recusandae iure iusto placeat?
            Possimus labore vel unde saepe dignissimos, magnam ex aspernatur ab
            dolores aperiam nostrum voluptatum beatae odit totam cumque odio
            maxime? Laudantium, vero itaque ex alias natus fugiat excepturi
            reiciendis blanditiis? Natus error odit deserunt? Voluptatum, fugiat
            repellat suscipit, quia laboriosam facilis non eum nemo
            reprehenderit, explicabo dolor sed consectetur excepturi quae eaque.
            Non ab harum natus esse aspernatur. Cum, debitis!
          </Text>
        </Container>
      </main>
    </>
  );
}
