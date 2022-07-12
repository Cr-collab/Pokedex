import { ReactNode } from "react";

interface LoadingProps {
  children: ReactNode;
  isLoading: boolean;
}
export function Loading({ children, isLoading }: LoadingProps) {
  if (isLoading) {
    return <>{children}</>;
  } else {
    return <img width="100%" src="/assets/getting_ready.gif" />;
  }
}
