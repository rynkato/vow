import * as React from "react";

import { motion } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";
import { Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GUEST_RESPONSE } from "@/lib/config";
import Checkmark from "@/public/lottie/checkmark.json";
import Wedding from "@/public/lottie/wedding.json";
import { GuestData } from "@/types";

const Lottie = dynamic(() => import("lottie-react"));

export function RSVPDrawer({
  height,
  maxGuestQuantity,
  onClickReserve,
  invitation,
  isRSVPDrawerOpen,
  setRSVPDrawerOpen,
  setMapDrawerOpen,
  isLoading,
  setLoading,
  type,
}: {
  height: string;
  maxGuestQuantity: number;
  onClickReserve: (_guest: number) => void;
  invitation: GuestData;
  isRSVPDrawerOpen: boolean;
  setRSVPDrawerOpen: (_open: boolean | ((_prev: boolean) => boolean)) => void;
  setMapDrawerOpen: (_open: boolean | ((_prev: boolean) => boolean)) => void;
  isLoading: boolean;
  setLoading: (_val: boolean | ((_prev: boolean) => boolean)) => void;
  type: string;
}) {
  const [numberOfGuest, setNumberOfGuest] = React.useState(1);
  const maxGuests = maxGuestQuantity;
  const weddingLottieRef = React.useRef<LottieRefCurrentProps>(null);

  function onClick(adjustment: number) {
    setNumberOfGuest((val) => val + adjustment);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (weddingLottieRef?.current !== null) {
      weddingLottieRef?.current?.setSpeed(1.5);
    }
  }, [weddingLottieRef?.current]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <Drawer
        open={isRSVPDrawerOpen}
        onOpenChange={(open) => setRSVPDrawerOpen(open)}
      >
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="w-full bottom-button-rsvp-map"
            style={{
              height: height,
              color: type === "Aqiela" ? "#894147" : "#485022",
            }}
          >
            RSVP
          </Button>
        </DrawerTrigger>
        <DrawerContent
          style={{
            backgroundColor: type === "Aqiela" ? "#f1d2cb" : "#d8ddbc",
            border: `1px solid ${type === "Aqiela" ? "#f1d2cb" : "#d8ddbc"}`,
          }}
        >
          {isLoading ? (
            <motion.div
              className="flex flex-col items-center justify-center min-h-[316.8px]"
              animate={{ opacity: [0, 1] }}
              exit={{ opacity: [1, 0] }}
            >
              <Lottie
                lottieRef={weddingLottieRef}
                animationData={Wedding}
                loop={false}
                className="w-[250px]"
                onComplete={() => setLoading(false)}
                initialSegment={[1, 125]}
              />
            </motion.div>
          ) : (
            <>
              {!isLoading &&
              invitation?.guest_response === GUEST_RESPONSE.NO_RESPONSE ? (
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  exit={{ opacity: [1, 0] }}
                >
                  <DrawerHeader className="pt-8">
                    <DrawerTitle>RSVP</DrawerTitle>
                    <DrawerDescription
                      style={{
                        color: type === "Aqiela" ? "#b7878c" : "#90976c",
                      }}
                    >
                      Reserve your seat.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="mx-auto w-full max-w-sm p-4">
                    <div className="flex flex-col w-full gap-8 items-center">
                      <div className="flex items-center justify-center space-x-2 w-full">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => onClick(-1)}
                          disabled={numberOfGuest <= 0}
                          style={{
                            backgroundColor:
                              type === "Aqiela" ? "#bf626a" : "#90976c",
                            borderColor:
                              type === "Aqiela" ? "#bf626a" : "#90976c",
                          }}
                        >
                          <Minus
                            className="h-4 w-4 text-white"
                            style={{
                              backgroundColor:
                                type === "Aqiela" ? "#bf626a" : "#90976c",
                            }}
                          />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {numberOfGuest}
                          </div>
                          <div
                            className="text-[0.70rem] uppercase"
                            style={{
                              color: type === "Aqiela" ? "#b7878c" : "#90976c",
                            }}
                          >
                            Number of Guests
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => onClick(1)}
                          disabled={numberOfGuest >= maxGuests}
                          style={{
                            backgroundColor:
                              type === "Aqiela" ? "#bf626a" : "#90976c",
                            borderColor:
                              type === "Aqiela" ? "#bf626a" : "#90976c",
                          }}
                        >
                          <Plus
                            className="h-4 w-4 text-white"
                            style={{
                              backgroundColor:
                                type === "Aqiela" ? "#bf626a" : "#90976c",
                            }}
                          />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter className="w-full pt-8 gap-4 flex-row">
                    <DrawerClose asChild>
                      <Button
                        className="w-full"
                        variant="outline"
                        style={{
                          backgroundColor:
                            type === "Aqiela" ? "#efe0dc" : "#e5e8d7",
                          border: `2px solid ${type === "Aqiela" ? "#bf626a" : "#82895f"}`,
                          color: type === "Aqiela" ? "#bf626a" : "#82895f",
                        }}
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                    <Button
                      className="w-full"
                      onClick={() => onClickReserve(numberOfGuest)}
                      style={{
                        backgroundColor:
                          type === "Aqiela" ? "#bf626a" : "#82895f",
                      }}
                    >
                      {numberOfGuest > 0 ? "Reserve" : "Not Attending"}
                    </Button>
                  </DrawerFooter>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  exit={{ opacity: [1, 0] }}
                >
                  <div className="flex flex-col items-center">
                    <Lottie
                      animationData={Checkmark}
                      loop={false}
                      className="w-[300px] -m-[25px]"
                      initialSegment={[1, 125]}
                    />
                    <DrawerHeader>
                      <DrawerTitle>Thank you</DrawerTitle>
                      <DrawerTitle>
                        You&apos;ve RSVP&apos;d for{" "}
                        {invitation?.guest_quantity_confirmed} guest(s).
                      </DrawerTitle>
                      {invitation?.guest_response ===
                        GUEST_RESPONSE.ATTENDING &&
                        invitation?.guest_quantity_confirmed > 0 && (
                          <DrawerDescription
                            style={{
                              color: type === "Aqiela" ? "#b7878c" : "#90976c",
                            }}
                          >
                            See you on 15 September.
                          </DrawerDescription>
                        )}
                    </DrawerHeader>
                  </div>
                  <DrawerFooter className="w-full pt-8 gap-4 flex-row">
                    <DrawerClose asChild>
                      <Button
                        className="w-full"
                        variant="outline"
                        style={{
                          backgroundColor:
                            type === "Aqiela" ? "#efe0dc" : "#e5e8d7",
                          border: `2px solid ${type === "Aqiela" ? "#bf626a" : "#82895f"}`,
                          color: type === "Aqiela" ? "#bf626a" : "#82895f",
                        }}
                      >
                        Close
                      </Button>
                    </DrawerClose>
                    {invitation?.guest_response === GUEST_RESPONSE.ATTENDING &&
                      invitation?.guest_quantity_confirmed > 0 && (
                        <Button
                          className="w-full"
                          variant="default"
                          onClick={() => {
                            setRSVPDrawerOpen(false);
                            setMapDrawerOpen(true);
                          }}
                          style={{
                            backgroundColor:
                              type === "Aqiela" ? "#bf626a" : "#82895f",
                          }}
                        >
                          View Map
                        </Button>
                      )}
                  </DrawerFooter>
                </motion.div>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>

      <style jsx global>{`
        .bg-black\/80 {
          background-color: rgb(0 0 0 / 0.5) !important;
        }

        div[role="dialog"] > div:first-child {
          background-color: ${type === "Aqiela"
            ? "rgba(212, 135, 141, 0.25)"
            : "#b9c096"} !important;
        }

        .bottom-button-rsvp-map:hover {
          background-color: ${type === "Aqiela"
            ? "#c79f96"
            : "#919871"} !important;
        }
      `}</style>
    </>
  );
}
