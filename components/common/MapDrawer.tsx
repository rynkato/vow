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

export function MapDrawer({ height }: { height: string }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-full" style={{ height: height }}>
          Map
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pt-4 px-4 pb-12">
          <div className="flex flex-col w-full gap-8 items-center">
            <DrawerHeader>
              <DrawerTitle>Location</DrawerTitle>
              <DrawerDescription>Book the place in advance.</DrawerDescription>
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
                    style={{ minWidth: 150 }}
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
                <a href="https://www.waze.com/live-map/directions/kl-gateway-mall-jalan-kerinchi-2-kuala-lumpur?to=place.w.66650143.666239287.11721931">
                  <Button
                    variant="default"
                    className="gap-2"
                    style={{ minWidth: 150 }}
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
