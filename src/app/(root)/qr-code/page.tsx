"use client";

import Qr_code from "@/components/ui/scan_qr_code";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import fetchApi from "@/lib/api"




export default function Qrcode() { 
  const router = useRouter();
  const onNewScanResult = (decodedText : string) => {
    // handle decoded results here
    const jsondata = JSON.stringify(decodedText);
    console.log(`Scan result: ${jsondata}`);
    // requete api avec la valeur du qr code
    
    fetchApi('qr-code', { method: 'POST',body: jsondata })
    .then((data) => {
      console.log(data); // Traitement des données reçues
      if(data=="oui"){
        router.push('/map'); // Redirige vers "/nouvelle-page"
      }
      else if(data=="non"){
        alert("Mauvaise Qr-code");
      } 
    })
    .catch((error) => {
      console.error('Erreur lors de la requête :', error);
    });
    
};

return (
  <>
  <div className="absolute top-4 left-4">
    <Link
              href="/map"
              className="bg-white text-vibrantPlum w-10 h-10 flex items-center justify-center p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6"
                fill="black"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
              </svg>
    </Link>
  </div>
  <div className="h-screen flex flex-col items-center justify-evenly">
  
  <h1 className="text-2xl">Scanner le Qr-code de l&apos;indice</h1>
    <div className="w-full h-auto rounded-md border-2 border-black-300">
        <Qr_code
             fps={10}
             qrbox={250}
             disableFlip={false}
             qrCodeSuccessCallback={onNewScanResult}
        />
    </div>
  </div>
    </>
);
}
