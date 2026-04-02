/// <reference types="vite/client" />

declare const __COMMIT_SHA__: string;
declare const __COMMIT_DATE__: string;
declare const __COMMIT_SUBJECT__: string;
declare const __COMMIT_BODY__: string;

declare module "*.svg?raw" {
  const content: string;
  export default content;
}
