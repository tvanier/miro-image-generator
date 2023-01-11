import { Configuration, CreateImageRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const generateImage = async (request: CreateImageRequest) =>
  openai.createImage({
    size: '256x256',
    n: 1,
    ...request
  });
