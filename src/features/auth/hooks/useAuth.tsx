"use client";

import { authService } from "@/features/auth/services/auth.service";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const me = () => {
    const { data, error, isError, isLoading, refetch } = useQuery({
      queryKey: authKeys.user,
      queryFn: () => authService.me(),
      retry: 1,
    });
    return { data, error, isError, isLoading, refetch };
  };
  return { me };
};
