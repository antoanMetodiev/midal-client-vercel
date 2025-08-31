import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Midal - Music Platform",
	description: "Music Platform",
	icons: {
		icon: "/images/midal-logo.jpg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				{children}

				<Script id="block-devtools" strategy="afterInteractive">
					{`
            document.addEventListener('contextmenu', function (e) {
              e.preventDefault();
            });

            document.onkeydown = function (e) {
              if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.shiftKey && e.key === "J")) {
                e.preventDefault();
              }

              if (e.key === "F12") e.preventDefault();
              if ((e.ctrlKey && e.shiftKey && e.key === "I") || (e.metaKey && e.altKey && e.key === "I")) e.preventDefault();
              if ((e.ctrlKey && e.shiftKey && e.key === "J") || (e.metaKey && e.altKey && e.key === "J")) e.preventDefault();
              if ((e.ctrlKey && e.shiftKey && e.key === "C") || (e.metaKey && e.altKey && e.key === "C")) e.preventDefault();
              if ((e.ctrlKey && e.key === "U") || (e.metaKey && e.altKey && e.key === "U")) e.preventDefault();
              if (e.ctrlKey && e.shiftKey && e.key === "K") e.preventDefault();
              if (e.ctrlKey && e.shiftKey && e.key === "S") e.preventDefault();
            };
          `}
				</Script>
			</body>
		</html>
	);
}