<<<<<<< HEAD
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Définir une interface pour les props
/* interface Html5QrcodePluginProps {
    fps?: number; // Optionnel, nombre d'images par seconde
    qrbox?: number; // Optionnel, taille du QR box
    aspectRatio?: number; // Optionnel, ratio largeur/hauteur
    disableFlip?: boolean; // Optionnel, désactiver le flip
    verbose?: boolean; // Optionnel, activer les logs
    qrCodeSuccessCallback: (decodedText: string) => void; // Obligatoire, callback pour succès
    qrCodeErrorCallback?: (errorMessage: string) => void; // Optionnel, callback pour erreurs
}
 */
// Crée l'objet de configuration pour Html5QrcodeScanner
const createConfig = (props) => {
    const config = {}; // Objet de configuration dynamique
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props/* : Html5QrcodePluginProps */) => {
    useEffect(() => {

        if(html5QrcodeScanner.getState()===3){
            html5QrcodeScanner.resume();
        }
        
        else
        {
        const config = createConfig(props);
        const verbose = props.verbose === true;
    
        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required.");
        }
    
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);
        }
        // Nettoyage lors du démontage ou réinitialisation
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
            console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
        }, [props]); // Ajout des dépendances pertinentes
=======
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
>>>>>>> 9eb0241a9586e4c30d4fad6f8090d60e94b37f15

function scan_qr_code({ data, setData }) {
    return (
      <>
        <Scanner onScan={(result) => { setData(result)}} />
      </>
    );
  }
  
  export default scan_qr_code;
  