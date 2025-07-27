import React from "react";
import { Navbar, Footer } from "../components";

const TestPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          🎉 ¡Página de Prueba Funcionando!
        </h1>
        <div className="text-center">
          <p className="text-xl mb-4">
            Si puedes ver esta página, el routing está funcionando correctamente.
          </p>
          <p className="text-lg text-gray-600">
            Esta es una página de prueba para verificar que React Router funciona.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestPage; 