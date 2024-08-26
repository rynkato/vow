import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { getInvitationsByUUID } from "@/api/getInvitationByUUID";
import { rsvp } from "@/api/rsvp";
import { MapDrawer } from "@/components/common/MapDrawer";
import { RSVPDrawer } from "@/components/common/RSVPDrawer";
import { Separator } from "@/components/ui/separator";
import { GUEST_RESPONSE } from "@/lib/config";
import { decode } from "@/lib/encoding";
import { cn } from "@/lib/utils";
import aqielaLanding from "@/public/aqiela.webp";
import background from "@/public/bg.webp";
import syedBottomFlower from "@/public/syed-bottom-flowers.webp";
import syedLanding from "@/public/syed-main.webp";
import syedTopFlower from "@/public/syed-top-flowers.webp";
import { GuestData } from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const getServerSideProps = (async ({ params }) => {
  const decodedUUID = decode(params?.uuid as string);
  const invitationData = (await getInvitationsByUUID(decodedUUID))[0];
  if (!invitationData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { invitationData } };
}) satisfies GetServerSideProps<{ invitationData: GuestData }>;

export default function HomeUUID({
  invitationData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const drawerHeight = "50px";

  const [isRSVPDrawerOpen, setRSVPDrawerOpen] = useState<boolean>(false);
  const [isMapDrawerOpen, setMapDrawerOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const uuid = String(router?.query?.uuid);

  const [invitation, setInvitation] = useState<GuestData>(invitationData);

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  const onClickReserve = async (guest: number) => {
    setLoading(true);
    const decodedUUID = decode(uuid);
    const reservation = await rsvp(
      decodedUUID,
      guest <= 0 ? GUEST_RESPONSE.NOT_ATTENDING : GUEST_RESPONSE.ATTENDING,
      guest,
    );
    if (reservation) {
      const invitation = async () => {
        const api = (await getInvitationsByUUID(decodedUUID))[0];
        setInvitation(api);
      };
      invitation();
    }
  };

  return (
    <>
      <Head>
        <title>Aqiela & Syed - RSVP</title>
        <meta name="description" content="Aqiela & Syed's Invitation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="theme-color"
          content={invitation.guest_type === "Aqiela" ? "#bdd3ab" : "#eaf0dc"}
        />
      </Head>
      <div vaul-drawer-wrapper="" className="overflow-hidden">
        <main
          className={cn(
            "relative flex min-h-screen flex-col antialiased items-center",
            inter.variable,
          )}
          style={
            invitation.guest_type === "Syed"
              ? { backgroundColor: "#eaf0dc" }
              : undefined
          }
        >
          {invitation.guest_type === "Aqiela" && (
            <Image
              alt="Background"
              src={background}
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          )}
          {invitation.guest_type === "Aqiela" ? (
            <motion.div
              className="opacity-0"
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
          ) : (
            <div className="relative">
              <motion.div
                className="opacity-0"
                animate={{
                  scale: [2, 1],
                  opacity: [0, 1],
                }}
                transition={{ ease: "easeInOut", duration: 1.3 }}
              >
                <Image
                  src={syedLanding}
                  alt="Aqiela & Syed"
                  priority
                  className="object-contain p-2 max-w-max"
                  style={{ height: `calc(100vh - ${drawerHeight})` }}
                />
              </motion.div>
              <motion.div
                className="opacity-0 absolute w-full h-full top-0"
                animate={{
                  scale: [2, 1],
                  opacity: [0, 1],
                }}
                transition={{ ease: "easeInOut", duration: 1.3 }}
              >
                <Image
                  src={syedBottomFlower}
                  alt="Bottom Flowers"
                  priority
                  className="absolute -bottom-[100px] -left-[120px]"
                />
              </motion.div>
              <motion.div
                className="opacity-0 absolute w-full h-full top-0"
                animate={{
                  scale: [2, 1],
                  opacity: [0, 1],
                }}
                transition={{ ease: "easeInOut", duration: 1.3 }}
              >
                <Image
                  src={syedTopFlower}
                  alt="Top Flowers"
                  priority
                  className="absolute -right-[130px] -top-[120px]"
                />
              </motion.div>
            </div>
          )}
          <motion.div
            className="fixed bottom-[-50px] w-full"
            animate={{
              bottom: [-50, 0],
            }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
          >
            <div
              className="flex flex-row rounded-t-lg"
              style={{
                backgroundColor:
                  invitation.guest_type === "Aqiela" ? "#f1d2cb" : "#b9c096",
              }}
            >
              <RSVPDrawer
                height={drawerHeight}
                maxGuestQuantity={invitation?.guest_quantity}
                onClickReserve={onClickReserve}
                invitation={invitation}
                isRSVPDrawerOpen={isRSVPDrawerOpen}
                setRSVPDrawerOpen={setRSVPDrawerOpen}
                setMapDrawerOpen={setMapDrawerOpen}
                isLoading={isLoading}
                setLoading={setLoading}
                type={invitation.guest_type}
              />
              <Separator
                orientation="vertical"
                className="h-auto my-1 bg-white"
              />
              <MapDrawer
                height={drawerHeight}
                isMapDrawerOpen={isMapDrawerOpen}
                setMapDrawerOpen={setMapDrawerOpen}
                type={invitation.guest_type}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
