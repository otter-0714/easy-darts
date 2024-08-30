import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import HeaderComponent from "../components/HeaderComponent";
import { NextPage } from "next";
import {
  Box,
  Button,
  Heading,
  Text,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi"; // アイコンをインポート
import { useRouter } from "next/router"; // useRouterフックをインポート

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // セッションが存在する場合、rootにリダイレクト
      router.push("/");
    }
  }, [session, router]);

  return (
    <Box>
      <HeaderComponent />
      <Center py={6}>
        <Box
          maxW={"lg"}
          w={"full"}
          bg={useColorModeValue("gray.100", "gray.900")}
          boxShadow={useColorModeValue(
            "0px 4px 6px rgba(160, 174, 192, 0.6)",
            "0px 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          rounded={"lg"}
          p={8}
          textAlign={"center"}
        >
          {!session && (
            <>
              <Heading
                fontSize={"2xl"}
                color={useColorModeValue("gray.900", "gray.100")}
              >
                Level up with Best Darts Scorer
              </Heading>
              <Text
                mt={4}
                mb={8}
                color={useColorModeValue("gray.900", "gray.100")}
              >
                This darts scorer is simple to set up and is perfect for keeping
                track of your scores.
              </Text>
              <Button
                leftIcon={<FiLogIn />}
                colorScheme="blue"
                variant="solid"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
              >
                Sign In with Google
              </Button>
            </>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default Login;
