"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";
import { JWTInput } from "google-auth-library";
import IRunReportResponse = google.analytics.data.v1beta.IRunReportResponse;

const propertyId = `${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}`;
const credentials = `${process.env.NEXT_PUBLIC_GA4_CREDENTIALS}`;

export async function getTotalViewReports() {
  const client = new BetaAnalyticsDataClient({
    credentials: JSON.parse(credentials) as JWTInput,
  });

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "date",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
  });

  return response as IRunReportResponse;
}

export async function getClubTotalViewReports(clubId: number) {
  const client = new BetaAnalyticsDataClient({
    credentials: JSON.parse(credentials) as JWTInput,
  });

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [{ name: "date" }, { name: "pagePath" }],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "FULL_REGEXP",
          value: `^/detail/${clubId}$`,
        },
      },
    },
  });

  return response as IRunReportResponse;
}
