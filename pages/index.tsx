import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

import { MapDrawer } from "@/components/common/MapDrawer";
import { cn } from "@/lib/utils";
import aqielaLanding from "@/public/aqiela.webp";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Home() {
  const drawerHeight = "50px";

  const [isMapDrawerOpen, setMapDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <>
      <Head>
        <title>Aqiela & Syed - RSVP</title>
        <meta name="description" content="Aqiela & Syed's Invitation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#bdd3ab" />

        <link rel="preload" as="image" href="/bg.webp" />

        <meta property="og:url" content="https://aqielasyed.azushi.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aqiela & Syed" />
        <meta property="og:description" content="Aqiela & Syed's Invitation" />
        <meta
          property="og:image"
          content="https://aqielasyed.azushi.com/aqiela-og.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="aqielasyed.azushi.com" />
        <meta property="twitter:url" content="https://aqielasyed.azushi.com" />
        <meta name="twitter:title" content="Aqiela & Syed" />
        <meta name="twitter:description" content="Aqiela & Syed's Invitation" />
        <meta
          name="twitter:image"
          content="https://aqielasyed.azushi.com/aqiela-og.webp"
        />
      </Head>
      <div vaul-drawer-wrapper="" className="overflow-hidden">
        <main
          className={cn(
            "relative flex min-h-screen flex-col antialiased items-center",
            inter.variable,
          )}
          style={{
            backgroundImage: "url('/bg.webp')",
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
          }}
        >
          <motion.div
            className="opacity-0 scale-[200]"
            animate={{
              scale: [2, 1],
              opacity: [0, 1],
            }}
            transition={{ ease: "easeInOut", duration: 1.3 }}
          >
            <Image
              src={aqielaLanding}
              alt="Aqiela & Syed"
              priority
              className="object-contain p-2"
              style={{ maxHeight: `calc(100vh - ${drawerHeight})` }}
            />
          </motion.div>
          <motion.div
            className="fixed bottom-[-50px] w-full"
            animate={{
              bottom: [-50, 0],
            }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
          >
            <div
              className="flex flex-row rounded-t-lg"
              style={{ backgroundColor: "#f1d2cb" }}
            >
              <MapDrawer
                height={drawerHeight}
                isMapDrawerOpen={isMapDrawerOpen}
                setMapDrawerOpen={setMapDrawerOpen}
                type="Aqiela"
              />
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
