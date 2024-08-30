import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { scores, email } = req.body; // スコアとメールアドレスを取得

    try {
      // まず、該当ユーザーのすべてのスコアを削除
      await prisma.score.deleteMany({
        where: {
          user: {
            email: email,
          },
        },
      });

      // その後、新しいスコアを追加
      const savedScores = await Promise.all(
        scores.map((score: any) =>
          prisma.score.create({
            data: {
              score: score.score,
              distance: score.distance,
              angle: score.angle,
              timestamp: new Date(score.timestamp),
              user: {
                connect: {
                  email: email, // 送信されたメールアドレスを使用
                },
              },
            },
          })
        )
      );

      res.status(201).json(savedScores);
    } catch (error) {
      console.error("Failed to save scores:", error);
      res.status(500).json({ message: "Failed to save scores", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
