import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface WithQueryClientProps {
  Component: React.ReactNode;
}

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export default function withQueryClient({ Component }: WithQueryClientProps){
  const queryClient = createTestQueryClient();

  return <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>;
};