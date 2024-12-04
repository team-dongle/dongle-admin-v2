"use client";

import React, { useEffect, useState } from "react";
import { DailyScreenViewReport } from "@/types/ga";
import { getClubTotalViewReports } from "@/apis/ga";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment/moment";

interface Props {
  clubId?: number;
}

const ClubTotalPageView = ({ clubId }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DailyScreenViewReport[]>([]);

  useEffect(() => {
    if (!clubId) return;
    (async () => {
      const response = await getClubTotalViewReports(clubId);

      if (response) {
        response.rows?.map((row) => {
          const date = row.dimensionValues as {
            value: string | number;
            oneValue: string;
          }[];
          const value = row.metricValues as {
            value: string | number;
            oneValue: string;
          }[];
          setData((prev) => [
            ...prev,
            { date: date[0].value, value: value[0].value },
          ]);
        });
        setLoading(false);
      }
    })();
  }, []);

  if (!clubId)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-gray-400">동아리 정보를 불러올 수 없습니다.</span>
      </div>
    );

  if (!loading && data.length <= 0)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-gray-400">집계된 통계가 없습니다.</span>
      </div>
    );

  if (loading)
    return (
      <div className="h-full w-full animate-skeleton-gradient rounded-lg bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]"></div>
    );

  if (!loading)
    return (
      <div className="h-full w-full rounded-lg border p-4">
        <ResponsiveLine
          animate
          curve="monotoneX"
          margin={{ top: 20, right: 27, bottom: 20, left: 30 }}
          colors={["#0EA5E9"]}
          data={[
            {
              id: "조회수",
              data: data.map((row) => ({
                x: moment(row.date).format("YYYY-MM-DD"),
                y: row.value,
              })),
            },
          ]}
          lineWidth={3}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            format: (e) => (Math.floor(e) === e ? e : ""),
            tickSize: 5,
            tickPadding: 5,
            legendPosition: "middle",
          }}
          axisBottom={{
            format: "%Y-%m-%d",
            legendPosition: "middle",
            tickValues: "every 1 days",
          }}
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            type: "time",
            precision: "day",
            useUTC: false,
            nice: true,
          }}
          yScale={{ type: "linear", min: 0 }}
          enablePointLabel={true}
        />
      </div>
    );
};

export default ClubTotalPageView;
