import React from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import NextLink from "next/link"; // Next.jsのLinkコンポーネント

const HeaderComponent: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <Box bg={useColorModeValue("c", "gray.900")} px={4}>
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <NextLink href="/" passHref>
            <Heading
              as="h1"
              fontSize="4x4"
              color={useColorModeValue("gray.900", "gray.100")}
            >
              EASY DARTS
            </Heading>
          </NextLink>
          <Flex alignItems="center">
            <Button
              href={"/chart"}
              as="a" // `Button`をリンクとして機能させるために`as="a"`を指定
              size="lg"
              mr={4}
              leftIcon={<BsGraphUp />}
            >
              View Chart
            </Button>
            {session && (
              <Button
                size="lg"
                onClick={() => signOut()}
                mr={4}
                leftIcon={<FiLogOut />}
              >
                Sign Out
              </Button>
            )}
            <Button size="lg" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeaderComponent;
