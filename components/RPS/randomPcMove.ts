/* eslint-disable security/detect-object-injection */
const pcMove = [
  {
    title: "rock",
    image: "/RPS/rock1.png",
  },
  {
    title: "scissor",
    image: "/RPS/scissors1.png",
  },
  {
    title: "paper",
    image: "/RPS/paper1.png",
  },
];

export const randomPcMove = () => {
  const randomIndex = Math.floor(Math.random() * pcMove.length);

  return {
    title: pcMove[randomIndex].title,
    image: pcMove[randomIndex].image,
  };
};
