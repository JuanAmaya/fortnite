import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCosmeticsHandler = useCallback(async (requestConfig, applyCosmetics) => {
    console.log('hola');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }
      const data = await response.json();

      const filteredData = data.data.filter(
        (cosmetic) =>
          cosmetic.type.value === requestConfig.cosmeticType &&
          cosmetic.description !== "TBD" &&
          cosmetic.introduction !== null
      );

      const loadedCosmetics = [];

      for (const key in filteredData) {
        loadedCosmetics.push({
          id: filteredData[key].id,
          rarity: filteredData[key].rarity.value,
          name: filteredData[key].name,
          img: filteredData[key].images.icon,
        });
      }

      applyCosmetics(loadedCosmetics);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, fetchCosmeticsHandler };
};
export default useHttp;