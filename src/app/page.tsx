"use client";
import { Button, Flex, Image, Input, Box } from "@/ui_kit";
import { SearchIcon } from "@/ui_kit/icons";
import { Container, Heading, Text } from "@radix-ui/themes";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import classes from "./page.module.css";
import clsx from "clsx";
import { playfairDisplay, sfProRegular } from "@/styles/font";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import { Product } from "@/type/product";

// const products: Array<Product> = [
//   {
//     imageSrc: "/images/product_1.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
//   {
//     imageSrc: "/images/product_2.png",
//     name: "Euodia",
//     price: "x.xxx.980",
//     currency: "IDR",
//   },
// ];
export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    try {
      getProducts().then((data) => {
        setProducts(data ?? []);
      });
    } catch (error) {}
  }, []);

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
          <Swiper
            className={classes.heroSlider}
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Box>
                <Image
                  src="https://picsum.photos/seed/4/1000/330"
                  alt="Slide 1"
                  height={330}
                  width={1000}
                />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box>
                <Image
                  src="https://picsum.photos/seed/7/1000/330"
                  alt="Slide 1"
                  height={330}
                  width={1000}
                />
              </Box>
            </SwiperSlide>
          </Swiper>
          <Heading
            className={playfairDisplay.className}
            style={{ marginTop: "24px" }}
            as="h2"
          >
            Terbaru
          </Heading>
          <Swiper
            className={classes.heroSlider}
            modules={[Navigation]}
            spaceBetween={75}
            slidesPerView={5}
            navigation
          >
            {products.map((p, index) => (
              <SwiperSlide key={`${index}-${p.name}`}>
                <Box>
                  <Box>
                    <Image
                      src={
                        index === 0
                          ? "/images/product_1.png"
                          : "/images/product_2.png"
                      }
                      alt={`Product ${index + 1}`}
                      height={183}
                      width={183}
                    />
                  </Box>
                  <Flex direction="column" align="start">
                    <Text
                      className={clsx(
                        playfairDisplay.className,
                        classes["product_name"]
                      )}
                    >
                      {p.name}
                    </Text>
                    <Text
                      className={clsx(
                        sfProRegular.className,
                        classes["product_price"]
                      )}
                    >{`${p.currency} ${p.price}`}</Text>
                  </Flex>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <Heading
            className={playfairDisplay.className}
            style={{ marginTop: "48px" }}
            as="h2"
          >
            Produk Tersedia
          </Heading>
          <Swiper
            className={classes.heroSlider}
            modules={[Navigation]}
            spaceBetween={75}
            slidesPerView={5}
            navigation
          >
            {products.map((p, index) => (
              <SwiperSlide key={`${index}-${p.name}`}>
                <Box>
                  <Box>
                    <Image
                      src={
                        index === 0
                          ? "/images/product_1.png"
                          : "/images/product_2.png"
                      }
                      alt={`Product ${index + 1}`}
                      height={183}
                      width={183}
                    />
                  </Box>
                  <Flex direction="column" align="start">
                    <Text
                      className={clsx(
                        playfairDisplay.className,
                        classes["product_name"]
                      )}
                    >
                      {p.name}
                    </Text>
                    <Text
                      className={clsx(
                        sfProRegular.className,
                        classes["product_price"]
                      )}
                    >{`${p.currency} ${p.price}`}</Text>
                  </Flex>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <Flex style={{ marginTop: "32px" }} align="center" justify="center">
            <Button variant="outline">Lihat lebih banyak</Button>
          </Flex>
        </Container>
        <footer
          style={{
            padding: "48px",
            borderTop: "1px solid #E4E4E4",
            marginTop: "24px",
          }}
        >
          <Container size="4">
            <Flex>
              <Flex
                direction="column"
                align="center"
                gap="8"
                style={{ maxWidth: 262 }}
              >
                <Image
                  alt="Vascomm logo"
                  src="/images/vascomm_logo.png"
                  width={168}
                  height={27}
                />
                <Text align="center" style={{ fontSize: 12 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  commodo in vestibulum, sed dapibus tristique nullam.
                </Text>
                <Flex gap="4">
                  <Image
                    width={20}
                    height={20}
                    alt="Facebook"
                    src="/icons/facebook.svg"
                  ></Image>
                  <Image
                    width={20}
                    height={20}
                    alt="Twitter"
                    src="/icons/twitter.svg"
                  ></Image>
                  <Image
                    width={20}
                    height={20}
                    alt="Instagram"
                    src="/icons/instagram.svg"
                  ></Image>
                </Flex>
              </Flex>
              <Flex style={{ marginLeft: "120px" }} gap="9">
                <Flex gap="4" direction="column">
                  <Box>
                    <Text className={playfairDisplay.className}>Layanan</Text>
                  </Box>
                  <nav>
                    <ul
                      className={clsx(
                        classes["footer_nav_list"],
                        sfProRegular.className
                      )}
                    >
                      <li>
                        <a href="">Bantuan</a>
                      </li>
                      <li>
                        <a href="">Tanya Jawab</a>
                      </li>
                      <li>
                        <a href="">Hubungi Kami</a>
                      </li>
                      <li>
                        <a href="">Cara Berjualan</a>
                      </li>
                    </ul>
                  </nav>
                </Flex>
                <Flex gap="4" direction="column">
                  <Box>
                    <Text className={playfairDisplay.className}>
                      Tentang Kami
                    </Text>
                  </Box>
                  <nav>
                    <ul
                      className={clsx(
                        classes["footer_nav_list"],
                        sfProRegular.className
                      )}
                    >
                      <li>
                        <a href="">About Us</a>
                      </li>
                      <li>
                        <a href="">Karir</a>
                      </li>
                      <li>
                        <a href="">Blog</a>
                      </li>
                      <li>
                        <a href="">Kebijakan Privasi</a>
                      </li>
                      <li>
                        <a href="">Syarat dan Ketentuan</a>
                      </li>
                    </ul>
                  </nav>
                </Flex>
                <Flex gap="4" direction="column">
                  <Box>
                    <Text className={playfairDisplay.className}>Mitra</Text>
                  </Box>
                  <nav>
                    <ul
                      className={clsx(
                        classes["footer_nav_list"],
                        sfProRegular.className
                      )}
                    >
                      <li>
                        <a href="">Supplier</a>
                      </li>
                    </ul>
                  </nav>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </footer>
      </main>
    </>
  );
}
