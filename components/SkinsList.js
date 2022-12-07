import { UnorderedList, ListItem, Grid } from "@chakra-ui/react";
import Link from "next/link";
import Card from "./UI/Card";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "./LoadingSkeleton";

const gridVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const SkinsList = (props) => {
  return (
    <InfiniteScroll
      dataLength={props.skins.length}
      next={props.loadSkins}
      hasMore={!props.hasMore}
      loader={<LoadingSkeleton cardNum={6} />}
      style={{ width: "100vw", overflowX: "hidden" }}
    >
      <UnorderedList marginLeft="0">
        <Grid
          templateColumns="repeat(auto-fit, minmax(9rem, 1fr))"
          maxW="1000px"
          gap="1rem"
          mx="auto"
          mt="5"
          pb="5"
          justifyItems="center"
          as={motion.div}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {props.skins.map((skin) => (
            <Link href={`/cosmetic/${skin.id}`} key={skin.id} passHref>
              <ListItem key={skin.id} listStyleType="none">
                <Card name={skin.name} rarity={skin.rarity} img={skin.img} />
              </ListItem>
            </Link>
          ))}
        </Grid>
      </UnorderedList>
    </InfiniteScroll>
  );
};

export default SkinsList;
