import * as React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import GoogleMaps from "@/public/icons/googlemaps.svg";
import Waze from "@/public/icons/waze.svg";

export function MapDrawer({
  height,
  isMapDrawerOpen,
  setMapDrawerOpen,
  type,
}: {
  height: string;
  isMapDrawerOpen: boolean;
  setMapDrawerOpen: (_open: boolean | ((_prev: boolean) => boolean)) => void;
  type: string;
}) {
  return (
    <Drawer
      open={isMapDrawerOpen}
      onOpenChange={(open) => setMapDrawerOpen(open)}
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
          Map
        </Button>
      </DrawerTrigger>
      <DrawerContent
        style={{
          backgroundColor: type === "Aqiela" ? "#f1d2cb" : "#d8ddbc",
          border: `1px solid ${type === "Aqiela" ? "#f1d2cb" : "#d8ddbc"}`,
        }}
      >
        <div className="mx-auto w-full max-w-sm pt-4 px-4 pb-12">
          <div className="flex flex-col w-full gap-8 items-center">
            <DrawerHeader>
              <DrawerTitle>Location</DrawerTitle>
              <DrawerDescription
                style={{ color: type === "Aqiela" ? "#b7878c" : "#90976c" }}
              >
                Get directions to the event.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col items-center justify-center space-x-2">
              <div className="flex flex-row gap-8 w-full">
                <a
                  href="https://maps.app.goo.gl/5mLWhLDjTp4cPwYg7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="default"
                    className="gap-2"
                    style={{
                      minWidth: 150,
                      backgroundColor:
                        type === "Aqiela" ? "#bf626a" : "#82895f",
                    }}
                  >
                    <Image
                      src={GoogleMaps}
                      className="invert"
                      style={{ height: "24px" }}
                      alt="Google Maps"
                    />
                    Google Maps
                  </Button>
                </a>
                <a
                  href="https://ul.waze.com/ul?place=ChIJmxf0vEBJzDER3-lReq3v08w&ll=3.11443880%2C101.66326050&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="default"
                    className="gap-2"
                    style={{
                      minWidth: 150,
                      backgroundColor:
                        type === "Aqiela" ? "#bf626a" : "#82895f",
                    }}
                  >
                    <Image
                      src={Waze}
                      className="invert"
                      style={{ height: "24px" }}
                      alt="Waze"
                    />{" "}
                    Waze
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
