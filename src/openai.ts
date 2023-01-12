import { Configuration, CreateImageRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.DEV ? import.meta.env.VITE_OPENAI_API_KEY : undefined,
  basePath: import.meta.env.PROD ? '/openai-api' : undefined
});

if (import.meta.env.PROD) {
  // remove "Bearer undefined" added here
  // https://github.com/openai/openai-node/blob/master/configuration.ts#L102
  delete configuration.baseOptions?.headers?.Authorization;
}

const openai = new OpenAIApi(configuration);

export const generateImage = async (request: CreateImageRequest) =>
  openai.createImage({
    size: '256x256',
    n: 1,
    ...request
  });
