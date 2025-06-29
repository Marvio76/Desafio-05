import React from 'react';

interface NavigationButtonsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onConcluir: () => void;
  podeAvancar: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ step, setStep, onConcluir, podeAvancar }) => {
  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onConcluir(); // Aqui chama a função agendarConsulta
    }
  };

  return (
    <div className="d-flex justify-content-between">
      {step > 1 && (
        <button
          className="btn btn-light border-secondary px-4 py-2 rounded-pill d-flex align-items-center"
          style={{ backgroundColor: '#76D8CE' }}
          onClick={() => setStep(step - 1)}
        >
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>
      )}

      <button
        className="btn btn-success px-4 py-2 rounded-pill d-flex align-items-center"
        style={{ backgroundColor: '#76D8CE', color: '#000' }}
        onClick={handleNext}
        disabled={step === 1 && !podeAvancar}
      >
        {step === 2 ? 'Concluir' : 'Próximo'} <i className="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  );
};

export default NavigationButtons;
