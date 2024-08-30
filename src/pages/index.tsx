import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps, NextPage, GetServerSidePropsContext } from "next";
import prisma from "../../lib/prisma";

interface Score {
  id: number;
  score: number;
  distance: number;
  angle: number;
  timestamp: Date;
}

interface HomePageProps {
  initialScores: Score[];
}

const HomePage: NextPage<HomePageProps> = ({ initialScores }) => {
  const { data: session } = useSession({ required: true });
  // initialScoresのtimestampをDateオブジェクトに変換
  const scoresWithDates = initialScores.map(score => ({
    ...score,
    timestamp: new Date(score.timestamp),
  }));
  return (
    <>
      {session && <MainLayout initialScores={scoresWithDates} />}
      {!session && (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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

  const initialScores =
    user?.scores.map((score) => ({
      id: score.id,
      score: score.score,
      distance: score.distance,
      angle: score.angle,
      timestamp: score.timestamp.toISOString(), // DateオブジェクトをISO文字列に変換
    })) || [];

  return {
    props: { initialScores },
  };
};
