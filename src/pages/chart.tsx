import React from "react";
import DsitanceGraph from "../components/DsitanceGraph"; // 先ほど作成したDsitanceGraphコンポーネント
import { GetServerSideProps, NextPage } from "next";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";
import HeaderComponent from "../components/HeaderComponent";
import { Box } from "@chakra-ui/react";

interface Score {
  id: number;
  score: number;
  distance: number;
  angle: number;
  timestamp: string; // ISO文字列として扱う
}

interface DsitanceGraphProps {
  scores: Score[];
}

const Chart: NextPage<DsitanceGraphProps> = ({ scores }) => {
  return (
    <Box>
      <HeaderComponent />
      <Box width="80%" margin="0 auto">
        <DsitanceGraph scores={scores} />
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userEmail = session.user?.email;
  const user = await prisma.user.findUnique({
    where: { email: userEmail || undefined },
    include: { scores: true },
  });

  const scores =
    user?.scores.map((score) => ({
      id: score.id,
      score: score.score,
      distance: score.distance,
      angle: score.angle,
      timestamp: score.timestamp.toISOString(), // DateオブジェクトをISO文字列に変換
    })) || [];

  return {
    props: { scores }, // 統一した名前で返す
  };
};

export default Chart;
