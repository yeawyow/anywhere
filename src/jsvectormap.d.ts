declare module 'jsvectormap' {
  const jsVectorMap: any;
  export default jsVectorMap;
}
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
