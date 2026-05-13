'use server';
/**
 * @fileOverview An AI chatbot assistant for Thelen Plumbing, Heating, and Air.
 *
 * - aiChatbotServiceGuidance - A function that handles user queries and provides service guidance.
 * - AIChatbotServiceGuidanceInput - The input type for the aiChatbotServiceGuidance function.
 * - AIChatbotServiceGuidanceOutput - The return type for the aiChatbotServiceGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotServiceGuidanceInputSchema = z.object({
  userQuery: z
    .string()
    .describe('The user\u0027s question about plumbing, heating, or AC issues.'),
});
export type AIChatbotServiceGuidanceInput = z.infer<
  typeof AIChatbotServiceGuidanceInputSchema
>;

const AIChatbotServiceGuidanceOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A helpful and concise answer to the user\u0027s question, specifically tailored for Thelen Plumbing, Heating, and Air services.'
    ),
  suggestedServices: z
    .array(z.string())
    .describe(
      'A list of services offered by Thelen that are relevant to the user\u0027s query. Examples: "Plumbing Repair", "AC Installation", "Furnace Maintenance", "Water Heater Repair", "Drain Cleaning". If no specific service is suggested, return an empty array.'
    ),
  isThelenSuitable: z
    .boolean()
    .describe(
      'True if Thelen Plumbing, Heating, and Air can likely assist with the user\u0027s query, false otherwise. Consider their specialties (plumbing, heating, AC) and service areas (Twin Cities, Minneapolis, St. Paul, Big Lake, Brooklyn Center, Elk River, Plymouth, Maple Grove).'
    ),
});
export type AIChatbotServiceGuidanceOutput = z.infer<
  typeof AIChatbotServiceGuidanceOutputSchema
>;

export async function aiChatbotServiceGuidance(
  input: AIChatbotServiceGuidanceInput
): Promise<AIChatbotServiceGuidanceOutput> {
  return aiChatbotServiceGuidanceFlow(input);
}

const chatbotPrompt = ai.definePrompt({
  name: 'aiChatbotServiceGuidancePrompt',
  input: {schema: AIChatbotServiceGuidanceInputSchema},
  output: {schema: AIChatbotServiceGuidanceOutputSchema},
  prompt: `You are an AI assistant for Thelen Plumbing, Heating, and Air, a company specializing in plumbing, heating, and air conditioning services in the Twin Cities area, including Minneapolis, St. Paul, Big Lake, Brooklyn Center, Elk River, Plymouth, and Maple Grove.

Your goal is to answer homeowner questions about plumbing, heating, or AC issues, suggest relevant services offered by Thelen, and determine if Thelen is the right provider for their specific problem.

Keep your answers concise and directly address the user's query. When suggesting services, choose from the following list if applicable: "Plumbing Repair", "Drain Cleaning", "Water Heater Installation", "Water Heater Repair", "HVAC Installation", "AC Repair", "Heating System Repair", "Furnace Maintenance", "Boiler Repair", "Emergency Plumbing", "Emergency HVAC", "Thermostat Installation", "Air Quality Solutions", "Leak Detection". If no specific service is relevant, an empty array should be returned for 'suggestedServices'.

Always conclude whether Thelen is suitable for their needs based on the services they offer and their service areas. If the query is outside these areas or services, indicate that Thelen might not be suitable.

User's Question: {{{userQuery}}}`,
});

const aiChatbotServiceGuidanceFlow = ai.defineFlow(
  {
    name: 'aiChatbotServiceGuidanceFlow',
    inputSchema: AIChatbotServiceGuidanceInputSchema,
    outputSchema: AIChatbotServiceGuidanceOutputSchema,
  },
  async (input) => {
    const {output} = await chatbotPrompt(input);
    return output!;
  }
);
