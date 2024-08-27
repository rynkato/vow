import { useState, useEffect } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

import { getInvitations } from "@/api/getInvitations";
import { InvitationsRadialChartStacked } from "@/components/charts/InvitationsRadialChartStacked";
import { RequestSentRadialChartStacked } from "@/components/charts/RequestSentRadialChartStacked";
import { AdminTable } from "@/components/common/AdminTable";
import { GUEST_TYPE, MESSAGE_STATUS } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  GuestData,
  GuestDataFormatted,
  InvitationResponseAggregation,
  MessageStatusResponseAggregation,
} from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const getServerSideProps = (async () => {
  try {
    const invitationData = await getInvitations("Syed");
    return { props: { invitationData } };
  } catch (error) {
    return { props: { invitationData: [] } };
  }
}) satisfies GetServerSideProps<{ invitationData: GuestData[] }>;

export default function AdminSyed({
  invitationData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState<GuestDataFormatted[]>(
    invitationData.map((guest): any => ({
      id: guest.id,
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

  const [invitationsChartDataSyed, setInvitationsChartDataSyed] =
    useState<InvitationResponseAggregation>({
      attending: 0,
      not_attending: 0,
      no_response: 0,
    });
  const [messageStatusChartDataSyed, setMessageStatusChartDataSyed] =
    useState<MessageStatusResponseAggregation>({ sent: 0, not_sent: 0 });

  useEffect(() => {
    const invitationResponseAggregationSyed: InvitationResponseAggregation = {
      attending: 0,
      not_attending: 0,
      no_response: 0,
    };
    const requestSentResponseAggregationSyed: MessageStatusResponseAggregation =
      {
        sent: 0,
        not_sent: 0,
      };

    data.forEach((guest) => {
      if (guest.response === "Attending") {
        if (guest.type === GUEST_TYPE.SYED) {
          const remaining = guest.quantity - guest.quantity_confirmed;
          invitationResponseAggregationSyed.attending +=
            guest.quantity_confirmed;
          invitationResponseAggregationSyed.not_attending += remaining;
        }
      } else if (guest.response === "Not Attending") {
        if (guest.type === GUEST_TYPE.SYED) {
          invitationResponseAggregationSyed.not_attending += guest.quantity;
        }
      } else if (guest.response === "No Response") {
        if (guest.type === GUEST_TYPE.SYED) {
          invitationResponseAggregationSyed.no_response += guest.quantity;
        }
      }

      if (guest.message_status === MESSAGE_STATUS.SENT) {
        if (guest.type === GUEST_TYPE.SYED) {
          requestSentResponseAggregationSyed.sent++;
        }
      } else if (guest.message_status === MESSAGE_STATUS.NOT_SENT) {
        if (guest.type === GUEST_TYPE.SYED) {
          requestSentResponseAggregationSyed.not_sent++;
        }
      }
    });

    setInvitationsChartDataSyed(invitationResponseAggregationSyed);
    setMessageStatusChartDataSyed(requestSentResponseAggregationSyed);
  }, [data]);

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
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Statistics for Syed&apos;s Guests
            </h2>
            <div className="flex flex-row justify-center md:justify-start gap-8 min-w-[250px] flex-wrap">
              <InvitationsRadialChartStacked
                chartData={invitationsChartDataSyed}
              />
              <RequestSentRadialChartStacked
                chartData={messageStatusChartDataSyed}
              />
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
