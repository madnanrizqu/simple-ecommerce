import { Button, Input } from "@/ui_kit";
import { SearchIcon } from "@/ui_kit/icons";

export default function Home() {
  return (
    <>
      <h1>Hello Base</h1>
      <Button>From Radix Themes</Button>
      <Input rightIcon={<SearchIcon />}></Input>
    </>
  );
}
