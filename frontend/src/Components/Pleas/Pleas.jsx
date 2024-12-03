import React from "react";
import './Pleas.css';
import pleasImage from '../Assets/pleas.jpg';

const Pleas = () => {
    return (
        <div className="pleas-container">
            <h1 className="pleas-title">Programas de Liderazgo y Excelencia</h1>
            <div className="pleas-content">
                <div className="pleas-text">
                    <p className="pleas-paragraph">
                    Los Programas de Liderazgo y Excelencia tienen como propósito ser el referente, dentro y fuera de la Universidad Anáhuac México, en formación de líderes de acción positiva a través de una formación integral, personalizada y según su perfil de liderazgo.
                    </p>
                    <h2 className="pleas-benefits-title">¿Qué beneficios trae ser parte de los Programas de Liderazgo?</h2>
                    <p className="pleas-benefits-paragraph">
                        Al unirte a nuestros programas, tendrás la oportunidad de asistir a seminarios, participar en actividades de compromiso social, 
                        y encuentros con líderes en el área de liderazgo de tu elección. Además, podrás acceder a talleres que te ayudarán a desarrollar 
                        las competencias necesarias para afrontar las exigencias del mundo actual.
                    </p>
                </div>
                <img 
                    src={pleasImage}
                    alt="Vértice" 
                    className="pleas-image" 
                />
            </div>
        </div>
    );
}

export default Pleas;