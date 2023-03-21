import React from 'react';
import './SeccionFacebook.css';
import {FacebookEmbed} from 'react-social-media-embed';

interface SeccionFacebookProps {
    url: string;
    width: number;
}

const SeccionFacebook: React.FC<SeccionFacebookProps> = ({ url, width }) => {
    return (
        <section id="seccionFacebook">
            <div className="facebook-title">
                <h1>Nuestro Facebook</h1>
            </div>
            <div className="facebook-posts">
                <div className="facebook-post">
                    <FacebookEmbed url={url} width={width} />
                </div>
                <div className="facebook-post">
                    <FacebookEmbed url={url} width={width} />
                </div>
            </div>
        </section>
    );
};

export default SeccionFacebook;
