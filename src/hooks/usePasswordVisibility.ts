import { useCallback, useState } from "react";

export function usePasswordVisibility() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return {
    visible,
    secureTextEntry: !visible,
    toggleVisibility,
  };
}