import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const siteName = "KafkaCart";
    document.title = `${title} | ${siteName}`;
  }, [title]);
};

export default usePageTitle;