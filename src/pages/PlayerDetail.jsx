import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupabase } from "../hooks/useSupabase";
import { LoadingSpinner } from "../components";

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlayerById, isLoading, error } = useSupabase();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        console.log("Cargando jugador con ID:", id);
        const playerData = await getPlayerById(id);
        console.log("Datos del jugador:", playerData);
        setPlayer(playerData);
      } catch (error) {
        console.error("Error cargando jugador:", error);
      }
    };

    if (id) {
      loadPlayer();
    }
  }, [id, getPlayerById]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Error</h1>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Jugador No Encontrado</h1>
          <p className="text-neutral-600 mb-4">El jugador solicitado no pudo ser encontrado.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate('/')}
            className="text-cyan-600 hover:text-cyan-700 font-semibold mb-4 inline-flex items-center"
          >
            ← Volver al Inicio
          </button>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Player Image */}
            <div className="flex-shrink-0">
              <img 
                src={player.image || '/src/assets/img/jugadores/default-player.webp'} 
                alt={player.name}
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
              />
            </div>
            
            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-800 mb-4">
                {player.name}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-100 rounded-lg p-4">
                  <h3 className="font-semibold text-neutral-700 mb-2">Equipo</h3>
                  <p className="text-neutral-800">{player.team}</p>
                </div>
                
                <div className="bg-neutral-100 rounded-lg p-4">
                  <h3 className="font-semibold text-neutral-700 mb-2">Posición</h3>
                  <p className="text-neutral-800">{player.position}</p>
                </div>
              </div>
              
              {player.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-700 mb-2">Descripción</h3>
                  <p className="text-neutral-600 leading-relaxed">{player.description}</p>
                </div>
              )}
              
              {player.stats && (
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-700 mb-4">Estadísticas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(player.stats).map(([key, value]) => (
                      <div key={key} className="bg-cyan-50 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-cyan-800 mb-1 capitalize">
                          {key}
                        </h4>
                        <p className="text-2xl font-bold text-cyan-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-neutral-800 mb-8">
            Productos Relacionados
          </h2>
          <p className="text-neutral-600 mb-8">
            Próximamente: Zapatillas y productos oficiales de {player.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail; 