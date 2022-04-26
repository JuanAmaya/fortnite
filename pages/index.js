import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Image, Center, Button, Heading } from "@chakra-ui/react";
import SkinsList from "../components/SkinsList";
import Search from "../components/UI/Search";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { UilPlus } from "@iconscout/react-unicons";
import ModalError from "../components/UI/ModalError";
import NoSkinError from "../components/UI/NoSkinError";
import { motion } from "framer-motion";

export default function Home() {
  const [skins, setSkins] = useState([]);
  const [allSkins, setAllSkins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contSkins, setContSkins] = useState(0);
  const [searched, setSearched] = useState(false);
  const [allSearchedSkins, setAllSearchedSkins] = useState([]);
  const [skinsEmpty, setSkinsEmpty] = useState(false);

  const fetchSkinsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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

      const partSkins = loadedSkins.slice(0, 15);
      setContSkins(15);

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
    // Busqueda con palabra exacta
    // const filteredSkins = allSkins.filter((skin) => {
    //   return (
    //     skin.name.toLowerCase() === skinName.toLowerCase() ||
    //     skin.rarity.toLowerCase() === skinName.toLowerCase()
    //   );
    // });

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

    if (filteredSkins.length >= 15) {
      const partFilteredSkins = filteredSkins.slice(0, 15);

      setSkins(partFilteredSkins);
      setSearched(false);
      setContSkins(15);
      setSkinsEmpty(false);
    } else if (filteredSkins.length === 0) {
      setSkinsEmpty(true);
      setSearched(true);
    } else {
      setSkins(filteredSkins);
      setSearched(true);
      setSkinsEmpty(false);
    }

    console.log("skin filtradas", skins);
  };

  const loadSkinsHandler = () => {
    const moreLoadedSkins = allSearchedSkins.slice(0, contSkins + 15);

    setSkins(moreLoadedSkins);
    setContSkins((prevValue) => prevValue + 15);
    console.log("skins", skins);
    console.log("Todas las skins", allSearchedSkins);
    console.log("valor contSkins", contSkins);
  };

  let content = <LoadingSkeleton />;

  if (skins.length > 0) {
    content = <SkinsList skins={skins} />;
  }

  if (error) {
    content = <ModalError errorMessage={Error} />;
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
        <Center>
          <motion.div
            style={{
              width: "100vw",
              maxWidth: "100%",
              height: 130,
              marginTop: "-1.5rem",
              position: "absolute",
              borderRadius: "35%",
              zIndex: "1",
            }}
            animate={{
              background: ["#409AE2", "#80D4F6", "#409AE2"],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* <Heading
            as={motion.div}
            fontSize="5xl"
            color="white"
            mt="2"
            zIndex="5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            F
          </Heading> */}
          <Image
            as={motion.img}
            src="/forniteLogo.png"
            alt="Fortnite Logo"
            h="50px"
            zIndex="10"
            mt="1rem"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          />
        </Center>
        <Center>
          <Search onSkinSearch={searchSkin} />
        </Center>
        <section>{content}</section>

        {!searched && (
          <Center>
            <Button
              rightIcon={<UilPlus />}
              colorScheme="purple"
              onClick={loadSkinsHandler}
              mb="4"
            >
              Load More
            </Button>
          </Center>
        )}
      </main>
    </div>
  );
}
