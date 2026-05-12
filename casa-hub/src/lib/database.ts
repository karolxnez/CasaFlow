export type DatabaseProvider = "mock" | "firebase" | "supabase";

export const databaseConfig = {
  provider: (process.env.NEXT_PUBLIC_DATABASE_PROVIDER ?? "mock") as DatabaseProvider,
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
};

export function getDataSourceLabel() {
  if (databaseConfig.provider === "firebase") return "Firebase";
  if (databaseConfig.provider === "supabase") return "Supabase";
  return "dados locais";
}
