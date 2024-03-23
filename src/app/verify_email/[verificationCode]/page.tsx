"use client";

import { PageLoader } from "@/ui_kit/PageLoader";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { verificationCode: string };
}) {
  const router = useRouter();

  useEffect(() => {
    verifyEmail(params.verificationCode)
      .then(() => {
        setIsLoading(false);
        toast(
          "Berhasil menvalidasi email. Silahkan login dengan email anda. Akan diarahkan ke halaman login...",
          {
            position: "top-center",
            autoClose: 2500,
            onClose: () => {
              router.push("/login");
            },
          }
        );
      })
      .catch(() => {
        setIsLoading(false);

        toast("Terjadi kesalahan", { position: "top-center" });
      });
  }, [params.verificationCode]);

  const [isLoading, setIsLoading] = useState(true);
  return <PageLoader isLoading={isLoading}></PageLoader>;
}
