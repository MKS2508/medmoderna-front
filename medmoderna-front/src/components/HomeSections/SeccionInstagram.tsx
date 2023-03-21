import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SeccionInstagram.css';

interface SeccionInstagramProps {
    igPost: string;
    igPost2: string;
}

const SeccionInstagram: React.FC<SeccionInstagramProps> = ({ igPost , igPost2}) => {
    return (
        <section id="seccionInstagram">
            <div className="instagram-title">
                <h1>Nuestro Instagram</h1>
            </div>
            <div className="instagram-posts">
                <AnimatePresence>
                    <motion.iframe
                        className="iframeIg"
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            borderRadius: '20%',
                            height: 400,
                            marginTop: 30,
                            marginBottom: '2rem',
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            borderRadius: '10px',
                            height: 400,
                            marginBottom: '2rem',
                        }}
                        exit={{ opacity: 0.3 }}
                        transition={{ duration: 1.5 }}
                        key={igPost}
                        width="460"
                        height={400}
                        src={igPost}
                        frameBorder="0"
                        style={{ maxWidth: '100%' }} // Agregar esta línea para ajustar el ancho
                    />
                    <motion.iframe
                        className="iframeIg"
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            borderRadius: '20%',
                            height: 400,
                            marginTop: 30,
                            marginBottom: '2rem',
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            borderRadius: '10px',
                            height: 400,
                            marginBottom: '2rem',

                        }}
                        exit={{ opacity: 0.3 }}
                        transition={{ duration: 1.5 }}
                        key={igPost2}
                        width="460"
                        height={400}
                        src={igPost2}
                        frameBorder="0"
                        style={{ maxWidth: '90%' }} // Agregar esta línea para ajustar el ancho
                    />
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SeccionInstagram;
