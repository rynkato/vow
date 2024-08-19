import { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import Head from "next/head";

import { getInvitations } from "@/api/getInvitations";
import { RadialChartStacked } from "@/components/charts/RadialChartStacked";
import { AdminTable } from "@/components/common/AdminTable";
import { cn } from "@/lib/utils";
import { GuestData, ResponseAggregation } from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Home() {
  const [data, setData] = useState<GuestData[]>([]);
  const [chartData, setChartData] = useState<ResponseAggregation[]>([
    { attending: 0, not_attending: 0, no_response: 0 },
  ]);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const invitations = await getInvitations();
        setData(
          invitations.map((guest): any => ({
            uuid: guest.guest_uuid,
            name: guest.guest_name,
            phone_number: guest.guest_phone_number,
            quantity: guest.guest_quantity,
            quantity_confirmed: guest.guest_quantity_confirmed,
            response: guest.guest_response,
            message_status: guest.guest_message_status,
            type: guest.guest_type,
          })),
        );

        const responseAggregation: ResponseAggregation = {
          attending: 0,
          not_attending: 0,
          no_response: 0,
        };

        invitations.forEach((guest) => {
          if (guest.guest_response === "Attending") {
            responseAggregation.attending += guest.guest_quantity;
          } else if (guest.guest_response === "Not Attending") {
            responseAggregation.not_attending += guest.guest_quantity;
          } else if (guest.guest_response === "No Response") {
            responseAggregation.no_response += guest.guest_quantity;
          }
        });

        setChartData([responseAggregation]);
      } catch (error) {
        // console.error("Error in fetchInvitation:", error);
      }
    };

    fetchInvitation();
  }, []);

  return (
    <>
      <Head>
        <title>Aqiela & Syed - Admin</title>
        <meta name="description" content="Aqiela & Syed's Invitation" />
      </Head>
      <div vaul-drawer-wrapper="" style={{ backgroundColor: "#fff" }}>
        <main
          className={cn(
            "relative flex min-h-screen flex-col bg-background antialiased",
            inter.variable,
          )}
        >
          <div className="flex flex-col p-8 gap-8">
            <div className="flex flex-row justify-center md:justify-start gap-8 min-w-[250px] flex-wrap">
              <RadialChartStacked chartData={chartData} />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                List of Invitations
              </h2>
              <AdminTable data={data} setData={setData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
