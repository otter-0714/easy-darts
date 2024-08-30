export default function calculateScore(
  x: number,
  y: number,
  centerX: number,
  centerY: number
) {
  const dx = x - centerX;
  const dy = y - centerY;
  let distance = Math.sqrt(dx * dx + dy * dy);
  distance = (distance / centerX / 0.825) * 100;
  let angle = -Math.atan2(dy, dx);
  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  // スコア計算のロジックをここに追加します
  const score = determineScore(distance, angle);
  return { score, distance, angle };
}

function determineScore(distance: number, angle: number): number {
  let ring: number = 0;
  let single: number = 0;

  if (distance < 10) {
    return 50; // 中心付近
  } else if (distance < 57) {
    ring = 1;
  } else if (distance < 66.5) {
    ring = 3;
  } else if (distance < 92) {
    ring = 1;
  } else if (distance < 100) {
    ring = 2;
  } else {
    return 0;
  }
  if (
    (0 <= angle && angle < Math.PI / 20) ||
    ((39 * Math.PI) / 20 <= angle && angle < 2 * Math.PI)
  ) {
    single = 6;
  } else if (Math.PI / 20 <= angle && angle < (3 * Math.PI) / 20) {
    single = 13;
  } else if ((3 * Math.PI) / 20 <= angle && angle < (5 * Math.PI) / 20) {
    single = 4;
  } else if ((5 * Math.PI) / 20 <= angle && angle < (7 * Math.PI) / 20) {
    single = 18;
  } else if ((7 * Math.PI) / 20 <= angle && angle < (9 * Math.PI) / 20) {
    single = 1;
  } else if ((9 * Math.PI) / 20 <= angle && angle < (11 * Math.PI) / 20) {
    single = 20;
  } else if ((11 * Math.PI) / 20 <= angle && angle < (13 * Math.PI) / 20) {
    single = 5;
  } else if ((13 * Math.PI) / 20 <= angle && angle < (15 * Math.PI) / 20) {
    single = 12;
  } else if ((15 * Math.PI) / 20 <= angle && angle < (17 * Math.PI) / 20) {
    single = 9;
  } else if ((17 * Math.PI) / 20 <= angle && angle < (19 * Math.PI) / 20) {
    single = 14;
  } else if ((19 * Math.PI) / 20 <= angle && angle < (21 * Math.PI) / 20) {
    single = 11;
  } else if ((21 * Math.PI) / 20 <= angle && angle < (23 * Math.PI) / 20) {
    single = 8;
  } else if ((23 * Math.PI) / 20 <= angle && angle < (25 * Math.PI) / 20) {
    single = 16;
  } else if ((25 * Math.PI) / 20 <= angle && angle < (27 * Math.PI) / 20) {
    single = 7;
  } else if ((27 * Math.PI) / 20 <= angle && angle < (29 * Math.PI) / 20) {
    single = 19;
  } else if ((29 * Math.PI) / 20 <= angle && angle < (31 * Math.PI) / 20) {
    single = 3;
  } else if ((31 * Math.PI) / 20 <= angle && angle < (33 * Math.PI) / 20) {
    single = 17;
  } else if ((33 * Math.PI) / 20 <= angle && angle < (35 * Math.PI) / 20) {
    single = 2;
  } else if ((35 * Math.PI) / 20 <= angle && angle < (37 * Math.PI) / 20) {
    single = 15;
  } else if ((37 * Math.PI) / 20 <= angle && angle < (39 * Math.PI) / 20) {
    single = 10;
  }

  return ring * single;
}
