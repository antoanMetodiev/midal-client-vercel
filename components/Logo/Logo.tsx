"use client";

import style from "./Logo.module.css";
import Image from "next/image";
import midalLogo from "@/public/images/midal-logo.jpg";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => {
                router.push("/");
            }}
            className={style['midal-logo']}
            src={midalLogo}
            alt="midal-log"
        />
    );
};

export default Logo;