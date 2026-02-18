'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating abstract visual mockups
 * of high-converting plumbing landing pages based on textual descriptions.
 *
 * - generateMockup - A function that handles the AI-powered mockup generation process.
 * - AiPoweredMockupGenerationInput - The input type for the generateMockup function.
 * - AiPoweredMockupGenerationOutput - The return type for the generateMockup function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredMockupGenerationInputSchema = z.object({
  description: z
    .string()
    .describe('A textual description for the plumbing landing page mockup.'),
});
export type AiPoweredMockupGenerationInput = z.infer<
  typeof AiPoweredMockupGenerationInputSchema
>;

const AiPoweredMockupGenerationOutputSchema = z.object({
  mockupImageUrl: z
    .string()
    .describe(
      'A data URI of the generated abstract visual mockup for the landing page.'
    ),
});
export type AiPoweredMockupGenerationOutput = z.infer<
  typeof AiPoweredMockupGenerationOutputSchema
>;

export async function generateMockup(
  input: AiPoweredMockupGenerationInput
): Promise<AiPoweredMockupGenerationOutput> {
  return aiPoweredMockupGenerationFlow(input);
}

const aiPoweredMockupGenerationFlow = ai.defineFlow(
  {
    name: 'aiPoweredMockupGenerationFlow',
    inputSchema: AiPoweredMockupGenerationInputSchema,
    outputSchema: AiPoweredMockupGenerationOutputSchema,
  },
  async input => {
    const imageGenerationPrompt = `Generate an abstract, high-converting landing page mockup for a plumbing service. The visual should be clean, modern, and conversion-focused, ideal for case studies. Incorporate conceptual elements related to plumbing such as pipes, flowing water, clean bathroom fixtures, tools, or silhouettes of technicians. Crucially, ensure there are NO real-world brands, company names, or identifiable logos visible in the mockup. The design should suggest a clear call to action area, but without specific text. Focus on conveying professionalism and efficiency. The specific user request is: "${input.description}".`;

    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: imageGenerationPrompt,
    });

    if (!media) {
      throw new Error('Failed to generate image mockup.');
    }

    return {
      mockupImageUrl: media.url,
    };
  }
);
