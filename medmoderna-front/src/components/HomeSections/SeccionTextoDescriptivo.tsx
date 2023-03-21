import React from 'react';
import './SeccionTextoDescriptivo.css';

interface SeccionTextoDescriptivoProps {
    textoDescriptivo: string;
}

const SeccionTextoDescriptivo: React.FC<SeccionTextoDescriptivoProps> = ({ textoDescriptivo }) => {
    return (
        <section id="seccion-texto-descriptivo">
            <div className="bgimg-texto">
                <div className="captionTexto">
          <span className="borderTexto">
            <div>
              <p className="texto-descriptivo">{textoDescriptivo}</p>
            </div>
          </span>
                </div>
            </div>
        </section>
    );
};

export default SeccionTextoDescriptivo;
