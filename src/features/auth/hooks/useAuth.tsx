"use client";
import { authService } from "@/features/auth/services/auth.service";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
import { Appdispatch } from "@/stores/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<Appdispatch>();
  const me = () => {
    const { data, error, isError, isLoading, refetch } = useQuery({
      queryKey: authKeys.user,
      queryFn: () => authService.me(),
      retry: 1,
    });
    useEffect(() => {
      dispatch(setUser(data));
    }, [data]);
    return { data, error, isError, isLoading, refetch };
  };
  return { me };
};
