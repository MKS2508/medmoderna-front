import React from 'react';
import './SeccionProductosDestacados.css';

interface SeccionProductosDestacadosProps {
    textoDescriptivo: string;
}

const SeccionProductosDestacados: React.FC<SeccionProductosDestacadosProps> = ({ textoDescriptivo }) => {
    return (
        <section id="seccion-productos-destacados">
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

export default SeccionProductosDestacados;
