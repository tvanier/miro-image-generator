import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.DEV ? import.meta.env.VITE_OPENAI_API_KEY : undefined,
  baseURL: import.meta.env.PROD ? "/openai-api" : undefined,
});

export const generateImage = async (
  request: OpenAI.Images.ImageGenerateParams
) =>
  openai.images.generate({
    size: "256x256",
    n: 1,
    ...request,
  });
