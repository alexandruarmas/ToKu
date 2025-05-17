// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // stream api keys
      NEXT_PUBLIC_STREAM_API_KEY: lmqzb7dbglbe;
      STREAM_SECRET_KEY: 8xny8cng3sxc94vxykupxgvum27vwqmxszkdv57an6qs7eqqqs4d9regdq9xt5bu;

      // app base url
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}
