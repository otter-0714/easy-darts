import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import ScoreTableComponent from "../components/ScoreTableComponent";
import DartboardComponent from "../components/DartboardComponent";
import { Wrap, WrapItem, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

interface Score {
  id: number;
  score: number;
  distance: number;
  angle: number;
  timestamp: Date;
}

interface MainLayoutProps {
  initialScores: Score[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ initialScores }) => {
  const [scores, setScores] = useState<Score[]>(initialScores);
  const [editingId, setEditingId] = useState<number | null>(null); // 修正中のスコアIDを保持

  const { data: session } = useSession(); // useSessionを使用してメールアドレスを取得

  const handleScoreCalculated = (
    score: number,
    distance: number,
    angle: number
  ) => {
    if (editingId !== null) {
      const updatedScores = scores.map((item) =>
        item.id === editingId ? { ...item, score, distance, angle } : item
      );
      setScores(updatedScores);
      setEditingId(null); // 修正が完了したらリセット
    } else {
      const newScore = {
        id: scores.length + 1,
        score,
        distance,
        angle,
        timestamp: new Date(),
      };
      setScores([...scores, newScore]);
    }
  };

  const handleSaveScores = async () => {
    try {
      if (!session || !session.user?.email) {
        throw new Error("No session or email found");
      }

      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scores,
          email: session.user.email, // メールアドレスを含めて送信
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save scores");
      }

      console.log("Scores saved successfully");
    } catch (error) {
      console.error("Error saving scores:", error);
    }
  };

  const handleEdit = (id: number) => {
    if (editingId === id) {
      setEditingId(null); // すでに編集中のIDをもう一度押すと解除
    } else {
      setEditingId(id); // 修正モードに切り替え
    }
  };

  const handleDelete = (ids: number[]) => {
    const updatedScores = scores.filter((item) => !ids.includes(item.id));
    setScores(updatedScores);
  };

  return (
    <div>
      <HeaderComponent />
      <Wrap spacing="30px" justify="center" mt={8}>
        <WrapItem>
          <DartboardComponent onScoreCalculated={handleScoreCalculated} />
        </WrapItem>
        <WrapItem>
          <Button onClick={handleSaveScores} colorScheme="blue" mt={4}>
            Save Scores
          </Button>
        </WrapItem>
        <WrapItem>
          <ScoreTableComponent
            scores={scores}
            onEdit={handleEdit}
            editingId={editingId}
            onDelete={handleDelete}
          />
        </WrapItem>
      </Wrap>
    </div>
  );
};

export default MainLayout;
