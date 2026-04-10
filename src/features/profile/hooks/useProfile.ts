import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
import { Appdispatch } from "@/stores/store";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { profileService } from "../services/profile.service";
import { useEffect } from "react";
import { setProfile } from "../profile.slice";

export const useProfile = () => {
  const dispatch = useDispatch<Appdispatch>();
  const profile = () => {
    const { data, error, isError, isLoading, refetch } = useQuery({
      queryKey: authKeys.user,
      queryFn: () => profileService.getProfile(),
      retry: 1,
    });
    useEffect(() => {
      dispatch(setProfile(data?.data));
    }, [data]);
    return { data, error, isError, isLoading, refetch };
  };
  return { profile };
};
