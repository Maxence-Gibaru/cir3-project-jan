'use client'

import React from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Hunt } from '@/models/Hunt';

const mockData = {
  " 1": "dadzaz",
  " 2": "azsdazdad"
};
interface qr_codeProps {
  hunt: Hunt;
}
export default function creation_qrcode( {hunt}:qr_codeProps) {
  const [index, setIndex] = React.useState(1);
  const generatePDF = async () => {
    const doc = new jsPDF();
    const newMockData = hunt.markers.reduce((acc, marker, index) => {
      acc[index + 1] = marker.id;
      return acc;
    }, {});
    
    // Résultat potentiel :
    // {
    //   "1": "ecdfd631", 
    //   "2": "da6fcfbe"
    // }
    console.log(newMockData);
    const indices = Object.entries(newMockData);
    
    for (let i = 0; i < indices.length; i++) {
      const [key, value] = indices[i];
      
      if (i > 0) {
        doc.addPage();
      }
      
      doc.setFontSize(16);
      if(i==0){
        doc.text(`Trésor`, 20, 20);
      }
      else{
        doc.text(`Indice ${key}`, 20, 20);
      }
     
      
      try {
        const qrCodeDataURL = await QRCode.toDataURL(value, {
          width: 300,
          margin: 2
        });
        doc.addImage(qrCodeDataURL, 'PNG', 30, 70, 150, 150);
      } catch (err) {
        console.error('Erreur QR code:', err);
      }
    }
    
    doc.save('indices.pdf');
  };

  return (
  
    <button 
      onClick={generatePDF}
      className="bg-dark text-white px-6 py-3 rounded-lg hover:bg-blueBg"
    >
      Générer les QR codes des indices
    </button>
     
  );
}