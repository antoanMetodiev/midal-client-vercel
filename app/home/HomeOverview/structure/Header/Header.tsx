import style from "./Header.module.css";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

import Logo from "@/components/Logo/Logo";

const Header = () => {
    const YOUTUBE_AUTH_URL = process.env.YOUTUBE_AUTH_URL;

    console.log("YOUTUBE_AUTH_URL = " + YOUTUBE_AUTH_URL);
    return (
        <header className={style['header-container']}>
            <div className={style['title-logo-container']}>
                <Logo />
            </div>

            <nav className={style['overview-navigation']}>
                <ul>
                    <Link className={style['navigation-link']} href="/songs-podcasts">Songs</Link>
                    <Link className={style['navigation-link']} href="/artists">Artists</Link>
                    <Link
                        className={style['linked-in-link']}
                        href="https://www.linkedin.com/in/antoan-metodiev-875518303"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;