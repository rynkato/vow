import { useEffect } from "react";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

import { MapDrawer } from "@/components/common/MapDrawer";
import { RSVPDrawer } from "@/components/common/RSVPDrawer";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import landingImage from "@/public/landing.webp";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Home() {
  const drawerHeight = "50px";

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

        <link rel="preload" as="image" href="bg.webp" />
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
            animate={{
              scale: [2, 1],
              opacity: [0, 1],
            }}
            transition={{ ease: "easeInOut", duration: 1.3 }}
          >
            <Image
              src={landingImage}
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
            transition={{ ease: "easeInOut", duration: 1.3 }}
          >
            <div className="flex flex-row rounded-t-lg bg-white">
              <RSVPDrawer height={drawerHeight} />
              <Separator
                orientation="vertical"
                className="h-auto my-1"
                style={{ backgroundColor: "#bdd3ab" }}
              />
              <MapDrawer height={drawerHeight} />
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
