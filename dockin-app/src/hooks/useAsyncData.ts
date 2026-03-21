import { useCallback, useEffect, useState } from "react";
import { toErrorMessage } from "@/src/utils/error";

export function useAsyncData<T>(loader: () => Promise<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await loader();
      setData(next);
      return next;
    } catch (error) {
      setError(toErrorMessage(error));
      return null;
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    if (immediate) {
      run();
    }
  }, [immediate, run]);

  return { data, loading, error, reload: run, setData };
}
