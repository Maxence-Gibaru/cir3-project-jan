'use client'

import React from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

const mockData = {
  " 1": "dadzaz",
  " 2": "azsdazdad"
};

export default function creation_qrcode() {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const indices = Object.entries(mockData);
    
    for (let i = 0; i < indices.length; i++) {
      const [key, value] = indices[i];
      
      if (i > 0) {
        doc.addPage();
      }
      
      doc.setFontSize(16);
      doc.text(`Indice ${key}`, 20, 20);
      
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