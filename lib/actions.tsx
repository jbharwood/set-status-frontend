"use server";

import {
  getProductionRoleCaptureStatuses,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests";
import { BotCard, BotMessage } from "@/components/index";
import { captureStatusNameMap } from "@/lib/helpers";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
// import { Price } from "@ai-rsc/components/llm-crypto/price";
// import { PriceSkeleton } from "@ai-rsc/components/llm-crypto/price-skeleton";
// import { Stats } from "@ai-rsc/components/llm-crypto/stats";
// import { StatsSkeleton } from "@ai-rsc/components/llm-crypto/stats-skeleton";
import { openai } from "@ai-sdk/openai";
import type { CoreMessage, ToolInvocation } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { z } from "zod";

const content = `\
  You are a bot for managing the statuses of stages in the Set Status website.
  
  If the user wants to update the status of a stage, call updateProductionRoleCaptureStatus, 
  make sure they have a production role name, stage name, and color name (must be green, yellow, or red). 
  Then tell them if it updated successfully. 
  Format will likely be something like: update PA to red on stage 1 or update Pa on stage 1 to red. 
  PA is the production role name. Red is the color name. Stage 1 is the stage name.
  If the user wants anything else tell just chat with them.
`;

export async function sendMessage(message: string): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> {
  const history = getMutableAIState<typeof AI>();

  history.update([
    ...history.get(),
    {
      role: "user",
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done)
        history.done([...history.get(), { role: "assistant", content }]);

      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      updateProductionRoleCaptureStatus: {
        description:
          "Update the productionRoleCaptureStatus of the the production role on the user's stage.",
        parameters: z.object({
          captureStatusId: z
            .number()
            .describe(
              "The user provides green, yellow, or red to update the status of the stage. 2 is green, 3 is yellow, and 4 is red."
            ),
          productionRoleName: z
            .string()
            .describe("The production role of the user."),
          stageName: z.string().describe("The stage name of the user."),
          notes: z.string().optional().describe("Any notes to add."),
        }),
        generate: async function* ({
          captureStatusId,
          productionRoleName,
          stageName,
          notes,
        }: {
          captureStatusId: number;
          productionRoleName: string;
          stageName: string;
          notes?: string;
        }) {
          console.log("captureStatusId", captureStatusId);
          console.log("productionRoleName", productionRoleName.toLowerCase());
          console.log("stageName", stageName.toLowerCase());
          console.log("notes", notes);
          yield <BotCard>Loading...</BotCard>;

          const productionRoleCaptureStatuses =
            await getProductionRoleCaptureStatuses({
              companyId: 1,
              isActive: true,
            });

          const match = productionRoleCaptureStatuses?.find(
            (prcs: IProductionRoleCaptureStatus) =>
              (prcs.productionRole.abbreviation.toLowerCase() ===
                productionRoleName.toLowerCase() ||
                prcs.productionRole.name.toLowerCase() ===
                  productionRoleName.toLowerCase()) &&
              prcs.stage.name.toLowerCase() === stageName.toLowerCase()
          );

          if (match) {
            match.captureStatusId = captureStatusId;
            match.notes = notes;

            await updateProductionRoleCaptureStatus(match);

            history.done([
              ...history.get(),
              {
                role: "assistant",
                name: "updateProductionRoleCaptureStatus",
                content: `[${productionRoleName} updated to ${captureStatusNameMap[captureStatusId as keyof typeof captureStatusNameMap]} on ${stageName}]`,
              },
            ]);

            return <BotCard>Done!</BotCard>;
          } else {
            history.done([
              ...history.get(),
              {
                role: "assistant",
                content: `No matching production role or stage found.`,
              },
            ]);

            return (
              <BotCard>No matching production role or stage found.</BotCard>
            );
          }
        },
      },
    },
    temperature: 0,
  });

  return {
    id: Date.now(),
    role: "assistant" as const,
    display: reply.value,
  };
}

export type AIState = Array<{
  id?: number;
  name?: "updateProductionRoleCaptureStatus";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});
