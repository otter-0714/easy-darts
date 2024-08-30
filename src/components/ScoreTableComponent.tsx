import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  TableContainer,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Score {
  id: number;
  score: number;
  distance: number;
  angle: number;
  timestamp: Date; // 日付と時刻を保持するフィールドを追加
}

interface ScoreTableProps {
  scores: Score[];
  onEdit: (id: number) => void;
  editingId: number | null; // 現在編集中のスコアIDを受け取る
  onDelete: (ids: number[]) => void; // 削除する行のIDを受け取る
}

const ScoreTableComponent: React.FC<ScoreTableProps> = ({
  scores,
  onEdit,
  editingId,
  onDelete,
}) => {
  const stripeColor1 = useColorModeValue("gray.100", "gray.700");
  const stripeColor2 = useColorModeValue("gray.200", "gray.600");
  const stripeColor3 = useColorModeValue("gray.300", "gray.500");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = scores.map((score) => score.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    onDelete(selectedIds);
    setSelectedIds([]); // 削除後にチェックリストをクリア
  };

  return (
    <Box>
      <Flex mb={4} minH="40px">
        {selectedIds.length > 0 ? (
          <Button
            colorScheme="red"
            onClick={handleDelete}
            leftIcon={<FaRegTrashAlt />}
          >
            Delete
          </Button>
        ) : (
          <Box />
        )}
      </Flex>
      <TableContainer>
        <Table size="md">
          <Thead>
            <Tr
              borderTopWidth="3px"
              borderTopColor={useColorModeValue("gray.400", "gray.400")}
            >
              <Th>
                <Checkbox
                  isChecked={selectedIds.length === scores.length}
                  isIndeterminate={
                    selectedIds.length > 0 && selectedIds.length < scores.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Score</Th>
              <Th>Distance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((score, index) => {
                let bgColor;
                const modulo = (scores.length - index) % 3;
                if (modulo % 3 === 0) {
                  bgColor = stripeColor1;
                } else if (modulo % 3 === 1) {
                  bgColor = stripeColor2;
                } else {
                  bgColor = stripeColor3;
                }
                const isThickBorder = modulo === 0;
                return (
                  <Tr
                    key={score.id}
                    bg={bgColor}
                    borderTopWidth={isThickBorder ? "2px" : "0px"}
                    borderTopColor={useColorModeValue("gray.400", "gray.400")}
                  >
                    <Td>
                      <Checkbox
                        isChecked={selectedIds.includes(score.id)}
                        onChange={(e) =>
                          handleCheckboxChange(score.id, e.target.checked)
                        }
                      />
                    </Td>
                    <Td>{score.timestamp.toLocaleDateString()}</Td>
                    <Td>
                      {score.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Td>
                    <Td>{score.score}</Td>
                    <Td>{score.distance.toFixed(1)} %</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme={editingId === score.id ? "red" : "blue"}
                        onClick={() => onEdit(score.id)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScoreTableComponent;
