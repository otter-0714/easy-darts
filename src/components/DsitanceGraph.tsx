import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useColorMode } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Score {
  id: number;
  score: number;
  distance: number;
  angle: number;
  timestamp: string;
}

interface DsitanceGraphProps {
  scores: Score[];
}

const DsitanceGraph: React.FC<DsitanceGraphProps> = ({ scores }) => {
  const { colorMode } = useColorMode();

  // カラーモードに応じた色の設定
  const borderColor =
    colorMode === "light" ? "rgba(75,192,192,1)" : "rgba(255,99,132,1)";
  const backgroundColor =
    colorMode === "light" ? "rgba(75,192,192,0.2)" : "rgba(255,99,132,0.2)";
  const fontColor = colorMode === "light" ? "#212121" : "#F5F5F5"; // 文字の色
  const gridColor =
    colorMode === "light" ? "rgba(50,50,50,0.3)" : "rgba(245,245,245,0.3)"; // 罫線の色

  // グラフデータの構築
  const data = {
    labels: scores.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        label: "Distance",
        data: scores.map((score) => score.distance).reverse(),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Distance from Center",
        color: fontColor, // タイトルの文字色を設定
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "times",
          color: fontColor, // x軸タイトルの文字色を設定
        },
        ticks: {
          color: fontColor, // x軸のラベルの文字色を設定
        },
        grid: {
          color: gridColor, // x軸の罫線の色を設定
        },
      },
      y: {
        title: {
          display: true,
          text: "Distance",
          color: fontColor, // y軸タイトルの文字色を設定
        },
        ticks: {
          color: fontColor, // y軸のラベルの文字色を設定
        },
        grid: {
          color: gridColor, // y軸の罫線の色を設定
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DsitanceGraph;
