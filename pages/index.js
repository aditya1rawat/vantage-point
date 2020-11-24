import Head from "next/head";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Image,
  Grid,
  Badge,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import matter from "gray-matter";
import { orderBy, filter } from "lodash";
var GithubSlugger = require("github-slugger");
const fs = require("fs");

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        background="linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1549&q=80)"
        height="300px"
        width="100%"
        objectFit="cover"
        marginBottom="6"
        borderRadius="lg"
        position="relative"
      >
        <Box position="absolute" bottom="12" left="10">
          <Heading color="white" fontSize="45px" pb="2">
            {props.featured.title}
          </Heading>
          <Text color="white" fontSize="25px" mb="0!important">
            by Sam Poder on the 23rd of September
          </Text>
        </Box>
      </Box>
      <SimpleGrid columns={2} spacing={10}></SimpleGrid>
      <div id="latest">
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <SimpleGrid columns={2} spacing={6}>
              {props.posts.map((post) => (
                <Box
                  background={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${post.image})`}
                  height="300px"
                  backgroundSize="cover"
                  width="100%"
                  objectFit="cover"
                  marginBottom="6"
                  borderRadius="lg"
                  position="relative"
                  as="a"
                  href={`/posts/${post.slug}`}
                >
                  <Box position="absolute" bottom="12" left="10" pr="10">
                    <Heading
                      color="white"
                      fontSize="35px"
                      pb="2"
                      fontWeight="bold"
                    >
                      {post.title}
                    </Heading>
                    <Text color="white" fontSize="16px" mb="0!important">
                      by {post.author} <br />
                      <Badge mt="2" pl="2" pr="2">
                        Issue #{post.issue}
                      </Badge>
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={1}>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
            >
              <Box p="5">
                <Text pb="15px">
                  <Heading display="inline-block">🖋 Six Revisions</Heading>
                </Text>
                <Text>
                  The doctor holds my chest against the
                  <br />
                  discus, listens like the fish below the
                  <br />
                  ice listens to the fisherman.
                  <br />
                  “Medicine,” he says, “is not an exact science.”
                  <br /> <br />
                  He listens like the ice fisherman listens
                  <br />
                  to the fish. I breathe into a nebuliser
                  <br />
                  and think about translation—inexact
                  <br />
                  art. A fine, particulate mist.
                  <br />
                  Snow has fallen onstill-green grass,
                  <br />
                  daubed with yellow leaves.
                  <br />
                  <br />
                  <i>by Jane Huffman</i>
                </Text>
              </Box>
            </Box>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
            >
              <Box p="5">
                <Text pb="3">
                  <Avatar
                    display="inline-block"
                    name="Dan Abrahmov"
                    src="https://ca.slack-edge.com/T01DZJA04DN-U01DNC118V7-e0edeb76e9e3-512"
                    mr="3"
                  />
                  <Heading display="inline-block">Editor's Note</Heading>
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque. Maecenas sed enim ut sem viverra aliquet eget sit. Mi
                  tempus imperdiet nulla malesuada pellentesque. Bibendum est
                  ultricies integer quis auctor elit sed vulputate.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque.
                </Text>
              </Box>
            </Box>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
            >
              <Box p="5">
                <Text pb="3">
                  <Heading display="inline-block">🎶 Playlist</Heading>
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque. Maecenas sed enim ut sem viverra aliquet eget sit. Mi
                  tempus imperdiet nulla malesuada pellentesque. Bibendum est
                  ultricies integer quis auctor elit sed vulputate.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque.
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  var slugger = new GithubSlugger();
  const context = require.context("../posts", false, /\.md$/);
  var posts = [];
  let featured;
  console.log(context.keys());
  for (const key of context.keys()) {
    const post = key.slice(2);
    const file = fs.readFileSync(`./posts/${post}`, "utf8");
    const content = matter(file);
    posts.push({
      title: content.data.title,
      slug: slugger.slug(content.data.title),
      author: content.data.author,
      image: content.data.image ? content.data.image : null,
      date: content.data.date,
      issue: content.data.issue,
    });
    if (content.data.featured == true) {
      featured = {
        title: content.data.title,
        slug: slugger.slug(content.data.title),
        author: content.data.author,
        image: content.data.image ? content.data.image : null,
        date: content.data.date,
        issue: content.data.issue,
      };
    }
  }
  posts = orderBy(posts, "title");
  posts = orderBy(posts, "issue", "desc");
  console.log(featured);
  return { props: { posts, featured: featured } };
}
