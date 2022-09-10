import Head from "next/head";
import SkinInfo from "../../components/UI/SkinInfo";
import ModalError from "../../components/UI/ModalError";

const outfitPage = (props) => {
  return (
    <div>
      <Head>
        <title>{props.outfit.name}</title>
        <meta
          name="description"
          content="Proyecto que agarra datos de un API para obtener las skins de fortnite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SkinInfo
          name={props.outfit.name}
          img={props.outfit.img}
          description={props.outfit.description}
          rarity={props.outfit.rarity}
          chapter={props.outfit.chapter}
          season={props.outfit.season}
          introduction={props.outfit.introduction}
        />
      </main>
    </div>
  );
};

export default outfitPage;

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`https://fortnite-api.com/v2/cosmetics/br`);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const skinData = data.data.filter((skin) => skin.id === params.outfitId);

    if (skinData[0].rarity.value === null) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const loadedSkin = [];

    let imageSkin;
    for (const key in skinData) {
      if (skinData[key].images.featured === null) {
        imageSkin = skinData[key].images.icon;
      } else {
        imageSkin = skinData[key].images.featured;
      }
      loadedSkin.push({
        id: skinData[key].id,
        rarity: skinData[key].rarity.value,
        description: skinData[key].description,
        chapter: skinData[key].introduction.chapter,
        season: skinData[key].introduction.season,
        introduction: skinData[key].introduction.text,
        name: skinData[key].name,
        img: imageSkin,
      });
    }

    return {
      props: {
        outfit: loadedSkin[0],
      },
    };
  } catch (error) {
    <ModalError errorMessage={error} />;
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
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

    return {
      fallback: "blocking",
      paths: loadedSkins.map((skin) => {
        return {
          params: {
            outfitId: skin.id,
          },
        };
      }),
    };
  } catch (error) {
    <ModalError errorMessage={error} />;
  }
}
