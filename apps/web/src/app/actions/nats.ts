"use server";

import { natsWrapper } from "shared";

export async function callMicroservice(
  serviceName: string,
  params: Record<string, any>,
) {
  try {
    await natsWrapper.connect();
    const response = await natsWrapper.client.request(
      serviceName,
      JSON.stringify(params),
    );
    return JSON.parse(response.data.toString());
  } catch (error) {
    console.error("Error calling microservice:", error);
    throw new Error("Internal Server Error");
  }
}
