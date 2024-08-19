import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  attending: {
    label: "Attending",
    color: "hsl(var(--chart-1))",
  },
  not_attending: {
    label: "Not Attending",
    color: "hsl(var(--chart-2))",
  },
  no_response: {
    label: "No Response",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RadialChartStacked({ chartData }: any) {
  const totalVisitors =
    chartData[0].attending +
    chartData[0].not_attending +
    chartData[0].no_response;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Invitations</CardTitle>
        <CardDescription>Statistics on the number of responses</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <div className="min-w-[150px]">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            </div>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }: any) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="attending"
              stackId="a"
              cornerRadius={5}
              fill="rgb(13 148 136)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="not_attending"
              fill="rgb(239 68 68)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="no_response"
              fill="rgb(212 212 212)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="self-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <div className="w-[10px] h-[10px] bg-teal-600" />
            <span className="text-xs">Attending</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="w-[10px] h-[10px] bg-red-500" />
            <span className="text-xs">Not Attending</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="w-[10px] h-[10px] bg-neutral-300" />
            <span className="text-xs">No Response</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
