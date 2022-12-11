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
import SelectionButtons from "../components/UI/SelectionButtons";
import useHttp from "./api/use-http";

const skinsNum = 24;

export default function Home() {
  const [skins, setSkins] = useState([]);
  const [allSkins, setAllSkins] = useState([]);
  const [contSkins, setContSkins] = useState(0);
  const [searched, setSearched] = useState(false);
  const [allSearchedSkins, setAllSearchedSkins] = useState([]);
  const [skinsEmpty, setSkinsEmpty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingSkeletonDisabled, setLoadingSkeletonDisabled] = useState(false);
  const [likedSkins, setLikedSkins] = useState([]);
  const [favoriteSkinsTab, setFavoriteSkinsTab] = useState();
  const [likedSkinsData, setLikedSkinsData] = useState([]);
  const [skinsTab, setSkinsTab] = useState(false);
  const [backpacksTab, setBackpacksTab] = useState(false);
  const [pickaxesTab, setPickaxesTab] = useState(false);

  const { isLoading, error, fetchCosmeticsHandler } = useHttp();

  let type = 'outfit';

  useEffect(() => {
    if (skinsTab) {
      type = 'outfit';
    } else if (backpacksTab) {
      type = 'backpack';
    } else if (pickaxesTab) {
      type = 'pickaxe';
    }

    const transformCosmetics = (cosmeticsObj) => {
      console.log('dentrooo', cosmeticsObj);
      const partSkins = cosmeticsObj.slice(0, skinsNum);
      setContSkins(skinsNum);

      setSkins(partSkins);
      setAllSkins(cosmeticsObj);
      setAllSearchedSkins(cosmeticsObj);
    };

    fetchCosmeticsHandler({ cosmeticType: type }, transformCosmetics);
  }, [fetchCosmeticsHandler, skinsTab, backpacksTab, pickaxesTab]);

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

    if (moreLoadedSkins.length === allSearchedSkins.length) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const favoriteComponentTab = (componentState) => {
    setFavoriteSkinsTab(componentState);
  };

  const itemTabHandler = ({ skinsTab, backpacksTab, pickaxesTab }) => {
    console.log("backpack", backpacksTab);
    console.log("pickaxe", pickaxesTab);
    if (skinsTab) {
      setSkinsTab(true);
      setBackpacksTab(false);
      setPickaxesTab(false);
    } else if (backpacksTab) {
      setSkinsTab(false);
      setBackpacksTab(true);
      setPickaxesTab(false);
    } else if (pickaxesTab) {
      setSkinsTab(false);
      setBackpacksTab(false);
      setPickaxesTab(true);
    };
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
    let cosmeticMissing = 'No Liked Skins';
    if (skinsTab) {
      cosmeticMissing = 'No Liked Skins';
    } else if (backpacksTab) {
      cosmeticMissing = 'No Liked Backpacks';
    } else if (pickaxesTab) {
      cosmeticMissing = 'No Liked Pickaxes';
    }

    content = (
      <NoSkinError
        iconError={<UilHeartBreak width="3rem" height="3rem" />}
        textError={cosmeticMissing}
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

  if (isLoading) {
    content = <LoadingSkeleton cardNum={24} />;
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
          <SelectionButtons onItemTab={itemTabHandler} />
        </Center>
        <section>{content}</section>
      </main>
    </div>
  );
}
