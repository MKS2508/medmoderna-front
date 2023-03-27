import React from 'react';
import LayoutBase from "../../components/LayoutBase/LayoutBase";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import AuthComponent from "../../components/AuthComponent/AuthComponent";


const storeToken = (token:any) => {
    // Aquí puede almacenar el token en el navegador de la forma más óptima.
    // Ejemplo: almacenarlo en localStorage
    //localStorage.setItem('authToken', token);
};

const AuthPage = () => {
    return (
        <AnimatedPage>
            <>
                <AuthComponent onAuthSuccess={()=> storeToken} />
            </>
        </AnimatedPage>
    );
};

export default AuthPage;
