import React from 'react';
import styled from 'styled-components';
import LayoutBase from "../LayoutBase/LayoutBase";

const MapaTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const MapaContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 2rem;
`;

const GoogleMapCode = styled.iframe`
  border: 0;
  border-radius: 10%;
  width: 80%; /* Cambiado de max-width a width */
  height: 400px;
  
`;

const AddressMap = () => {
    return (
            <GoogleMapCode
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5886.208184788902!2d-2.420187248556861!3d42.46807477334467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa6f5617fabcc60ac!2sMedicina%20Moderna%20Growshop!5e0!3m2!1ses-419!2ses!4v1655328560324!5m2!1ses-419!2ses"
                frameBorder="0"
                style={{ border: 0, borderRadius: "10%" }}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
            />
    );
};

const SeccionMapa: React.FC = () => {
    return (
        <LayoutBase useBaseFullHeight>
            <MapaTitle>
                <h2>
                    Puedes encontrarnos en{' '}
                    <a href="https://goo.gl/maps/V8UuLN7WnG8rMHiM6">
                        Avenida de Mendavia, Nº16 Pabellón 2, 26009 Logroño, La Rioja
                    </a>
                </h2>
            </MapaTitle>
            <MapaContainer>
                <AddressMap />
            </MapaContainer>
        </LayoutBase>
    );
};

export default SeccionMapa;
