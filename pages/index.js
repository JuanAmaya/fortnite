import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Center } from "@chakra-ui/react";
import SkinsList from "../components/SkinsList";
import Search from "../components/UI/Search";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ModalError from "../components/UI/ModalError";
import NoSkinError from "../components/UI/NoSkinError";
import Topbar from "../components/UI/Topbar";

const skinsNum = 24;

export default function Home() {
  const [skins, setSkins] = useState([]);
  const [allSkins, setAllSkins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contSkins, setContSkins] = useState(0);
  const [searched, setSearched] = useState(false);
  const [allSearchedSkins, setAllSearchedSkins] = useState([]);
  const [skinsEmpty, setSkinsEmpty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchSkinsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }
      const data = await response.json();

      const filteredData = data.data.filter(
        (skin) =>
          skin.type.value === "outfit" &&
          skin.description !== "TBD" &&
          skin.introduction !== null
      );

      const loadedSkins = [];

      for (const key in filteredData) {
        loadedSkins.push({
          id: filteredData[key].id,
          rarity: filteredData[key].rarity.value,
          name: filteredData[key].name,
          img: filteredData[key].images.icon,
        });
      }

      const partSkins = loadedSkins.slice(0, skinsNum);
      setContSkins(skinsNum);

      setSkins(partSkins);
      setAllSkins(loadedSkins);
      setAllSearchedSkins(loadedSkins);
      console.log(loadedSkins);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSkinsHandler();
  }, []);

  const searchSkin = (skinName) => {
    if (skinName.trim().length === 0) {
      setSkins(allSkins);
    }

    const filteredSkins = allSkins.filter((skin) => {
      return (
        skin.name.toLowerCase().includes(skinName.toLowerCase()) ||
        skin.rarity.toLowerCase().includes(skinName.toLowerCase())
      );
    });

    setAllSearchedSkins(filteredSkins);

    if (filteredSkins.length === 0) {
      console.log("vacio");
    }

    if (filteredSkins.length >= skinsNum) {
      const partFilteredSkins = filteredSkins.slice(0, skinsNum);

      setSkins(partFilteredSkins);
      setSearched(false);
      setContSkins(skinsNum);
      setSkinsEmpty(false);
      setButtonDisabled(false);
    } else if (filteredSkins.length === 0) {
      setSkinsEmpty(true);
      setSearched(true);
    } else {
      setSkins(filteredSkins);
      setSearched(true);
      setSkinsEmpty(false);
      setButtonDisabled(true);
    }

    console.log("skin filtradas", skins);
  };

  const loadSkinsHandler = () => {
    const moreLoadedSkins = allSearchedSkins.slice(0, contSkins + skinsNum);

    setSkins(moreLoadedSkins);
    setContSkins((prevValue) => prevValue + skinsNum);
    console.log("skins", skins);
    console.log("Todas las skins", allSearchedSkins);
    console.log("valor contSkins", contSkins);

    if (moreLoadedSkins.length === allSearchedSkins.length) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  let content = <LoadingSkeleton cardNum={24} />;

  if (skins.length > 0) {
    content = (
      <SkinsList
        skins={skins}
        loadSkins={loadSkinsHandler}
        hasMore={buttonDisabled}
      />
    );
  }

  if (error) {
    content = <ModalError errorMessage={error} />;
  }

  if (skinsEmpty) {
    content = <NoSkinError />;
  }

  return (
    <div>
      <Head>
        <title>Fortnite</title>
        <meta
          name="description"
          content="Proyecto que agarra datos de un API para obtener las skins de fortnite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Topbar />

        <Center>
          <Search onSkinSearch={searchSkin} />
        </Center>
        <section>{content}</section>

        {/* {!searched && (
          <Center>
            {!buttonDisabled && (
              <Button
                rightIcon={<UilPlus />}
                colorScheme="blue"
                onClick={loadSkinsHandler}
                mb="4"
              >
                Load More
              </Button>
            )}
          </Center>
        )} */}
      </main>
    </div>
  );
}
