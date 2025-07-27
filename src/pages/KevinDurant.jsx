import React from "react";
import { PlayerPage } from "../components";
import { getPlayerByPath } from "../data/players";

const KevinDurant = () => {
  const player = getPlayerByPath('/kevin-durant');

  if (!player) {
    return <div>Jugador no encontrado</div>;
  }

  return (
    <PlayerPage
      playerName={player.name}
      bannerGradient={player.bannerGradient}
      profileImage={player.profileImage}
      achievements={player.achievements}
      shoes={player.shoes}
    />
  );
};

export default KevinDurant; 