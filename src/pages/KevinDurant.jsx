import React from "react";
import { PlayerPage } from "../components";
import { getPlayerByPath } from "../data/players";

const KevinDurant = () => {
  const player = getPlayerByPath('/kevin-durant');

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Player Not Found</h1>
          <p className="text-neutral-600">The requested player could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <PlayerPage
        playerName={player.name}
        bannerGradient={player.bannerGradient}
        profileImage={player.profileImage}
        achievements={player.achievements}
        shoes={player.shoes}
      />
    </div>
  );
};

export default KevinDurant; 