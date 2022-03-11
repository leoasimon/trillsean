import { UpdatedScores } from "./types";

const probability = (ratingOne: number, ratingTwo: number) => {
  return (1 * 1) / (1 + 1 * Math.pow(10, (1 * (ratingOne - ratingTwo)) / 400));
};

export const eloRating = (
  ra: number,
  rb: number,
  k: number,
  d: number
): UpdatedScores => {
  const pb = probability(ra, rb);
  const pa = probability(rb, ra);

  if (d === 1) {
    const newRa = ra + k * (1 - pa);
    const newRb = rb + k * (0 - pb);
    return [newRa, newRb];
  }
  const newRa = ra + k * (0 - pa);
  const newRb = rb + k * (1 - pb);
  return [newRa, newRb];
};
