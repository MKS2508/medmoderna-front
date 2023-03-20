import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p>
                        Dirección: Polígono La portalada 23<br />
                        Logroño, La Rioja<br />
                        Teléfono: +34 601 09 32 76<br />
                        Email: medicinamodernagrowshop@gmail.com
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><a href="/about">Acerca de nosotros</a></li>
                        <li><a href="/products">Productos</a></li>
                        <li><a href="/contact">Contacto</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Redes sociales</h3>
                    <p>
                        Síguenos en nuestras redes sociales:<br />
                        <a href="https://www.facebook.com">Facebook</a><br />
                        <a href="https://www.instagram.com">Instagram</a><br />
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Medicina Moderna Grow Shop. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
