"use client";
import { Button, Flex, Image, Input, Box } from "@/ui_kit";
import { SearchIcon } from "@/ui_kit/icons";
import { Container } from "@radix-ui/themes";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import classes from "./page.module.css";

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
          <Swiper
            className={classes.heroSlider}
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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
        </Container>
      </main>
    </>
  );
}
