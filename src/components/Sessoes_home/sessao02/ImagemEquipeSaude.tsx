import React from "react";
import "./ImagemEquipeSaude.css"; // Continua importando o CSS

interface ImagemEquipeSaudeProps {
  src: string;
  alt?: string;
}

const ImagemEquipeSaude: React.FC<ImagemEquipeSaudeProps> = ({
  src,
  alt = "Imagem da equipe de saúde",
}) => {
  return (
    <div className="imagem-container">
      {/* A div .imagem-oval não precisa mais do clip-path */}
   
      <div className="forma-top  grande"></div>
      <div>
        <img
          src={src}
          alt={alt}
          className="imagem" // A imagem agora tem o clip-path aplicado
        />
      </div>
        {/* Formas decorativas no canto inferior direito */}
      <div className="decoracoes">
        <div className="forma pequena"></div>
        <div className="forma pequena pequena-baixo"></div>
      </div>
      <div className="container-quem-somos">
        <h3>QUEM SOMOS?</h3>
        <p style={{color:'#FFF'}}>Somos uma equipe médica especializada na sua saúde, promover a melhora de nossos pacientes é o que fazemos todos os dias!</p>
      </div>

    
    </div>
  );
};

export default ImagemEquipeSaude;
