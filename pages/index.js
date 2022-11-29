import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Center, Flex } from "@chakra-ui/react";
import SkinsList from "../components/SkinsList";
import Search from "../components/UI/Search";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ModalError from "../components/UI/ModalError";
import NoSkinError from "../components/UI/NoSkinError";
import Topbar from "../components/UI/Topbar";
import { UilFrown, UilHeartBreak } from "@iconscout/react-unicons";
import SelectionButtons from "../components/UI/selectionButtons";

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
  const [loadingSkeletonDisabled, setLoadingSkeletonDisabled] = useState(false);
  const [likedSkins, setLikedSkins] = useState([]);
  const [favoriteSkinsTab, setFavoriteSkinsTab] = useState();
  const [likedSkinsData, setLikedSkinsData] = useState([]);

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
      let skinsSet = "";

      for (const key in filteredData) {
        // if (filteredData[key].set === null) {
        //   console.log("null");
        // } else {
        //   skinsSet = filteredData[key].set;
        // }

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

  const favoriteComponentTab = (componentState) => {
    console.log(componentState);
    setFavoriteSkinsTab(componentState);
  };

  useEffect(() => {
    if (localStorage.getItem("likedSkins") === null) {
      localStorage.setItem("likedSkins", JSON.stringify(likedSkins));
    } else {
      const currentLikedSkins = JSON.parse(localStorage.getItem("likedSkins"));
      setLikedSkins(currentLikedSkins);
    }
  }, []);

  useEffect(() => {
    const favoriteSkins = allSkins.filter(
      (skin) => likedSkins.indexOf(skin.id) !== -1
    );

    setLikedSkinsData(favoriteSkins);

    if (likedSkinsData.length === 0) {
      console.log("vacio");
    }

    if (likedSkinsData.length >= skinsNum) {
      const partFilteredSkins = likedSkinsData.slice(0, skinsNum);

      // setSkins(partFilteredSkins);
      // setSearched(false);
      // setContSkins(skinsNum);
      // setSkinsEmpty(false);
      setLoadingSkeletonDisabled(false);
    } else if (likedSkinsData.length === 0) {
      // setSkinsEmpty(true);
      // setSearched(true);
    } else {
      // setSkins(likedSkinsData);
      // setSearched(true);
      // setSkinsEmpty(false);
      setLoadingSkeletonDisabled(true);
    }
  }, [allSkins, likedSkins]);

  let content = <LoadingSkeleton cardNum={24} />;

  if (skins.length > 0 && !favoriteSkinsTab) {
    content = (
      <SkinsList
        skins={skins}
        loadSkins={loadSkinsHandler}
        hasMore={buttonDisabled}
      />
    );
  }

  if (skins.length > 0 && favoriteSkinsTab && likedSkinsData.length > 0) {
    content = (
      <SkinsList
        skins={likedSkinsData}
        loadSkins={loadSkinsHandler}
        hasMore={loadingSkeletonDisabled}
      />
    );
  }

  if (likedSkinsData.length === 0 && favoriteSkinsTab) {
    content = (
      <NoSkinError
        iconError={<UilHeartBreak width="3rem" height="3rem" />}
        textError="No Liked Skins"
      />
    );
  }

  if (error) {
    content = <ModalError errorMessage={error} />;
  }

  if (skinsEmpty) {
    content = (
      <NoSkinError
        iconError={<UilFrown width="3rem" height="3rem" />}
        textError="No Skins Found"
      />
    );
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
        <Topbar changeBG={favoriteSkinsTab} />

        <Center flexDir="column" gap="1rem">
          <Search
            onSkinSearch={searchSkin}
            onFavoriteComponent={favoriteComponentTab}
          />
          <SelectionButtons />
        </Center>
        <section>{content}</section>
      </main>
    </div>
  );
}
