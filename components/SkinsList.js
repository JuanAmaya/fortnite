import { UnorderedList, ListItem, Grid } from "@chakra-ui/react";
import Link from "next/link";
import Card from "./UI/Card";

const SkinsList = (props) => {
  return (
    <UnorderedList marginLeft="0">
      <Grid
        templateColumns="repeat(auto-fit, minmax(9rem, 1fr))"
        maxW="50rem"
        gap="1rem"
        mx="auto"
        mt="5"
        pb="5"
        justifyItems="center"
      >
        {props.skins.map((skin) => (
          <Link href={`/outfit/${skin.id}`} key={skin.id} passHref>
            <ListItem key={skin.id} listStyleType="none">
              <Card name={skin.name} rarity={skin.rarity} img={skin.img} />
            </ListItem>
          </Link>
        ))}
      </Grid>
    </UnorderedList>
  );
};

export default SkinsList;
