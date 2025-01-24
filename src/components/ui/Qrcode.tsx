"use client";

import Qr_code from "@/components/ui/scan_qr_code";
import { fetchApi } from "@/lib/api";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";
interface QrcodeProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lobbyCode: string;
}


function  Qrcode({ isOpen, onOpenChange,lobbyCode}: QrcodeProps) {
  const [data, setData] = useState("No result");

  const onNewScanResult = async (decodedData: string) => {
    console.log("decodedText", decodedData);

    // Requête API avec le QR code
    try {
      const response = await fetchApi("guest/qr_code", {
        method: "GET",
        params: { lobby_code: lobbyCode, qr_code: decodedData },
      });
      console.log("response", response);

      if (response.isCorrect) {
        onOpenChange();
      } else {
        alert("Mauvais QR-code");
      }
    } catch (error) {
      alert("Mauvais QR-code");
    } finally {
      console.log("finally");
    }
  };

  // Appelle la fonction onNewScanResult lorsqu'il y a un changement dans `data`
  useEffect(() => {
    if (data && data !== "No result") {
      console.log(data[0].rawValue);
      onNewScanResult(data[0].rawValue);
    }
  }, [data]);

  return (
    <>
    <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    >
    <ModalContent className="bg-white p-6 rounded-lg text-black">
        {(onClose) => (
            <>
                <ModalHeader className="text-xl font-bold">
                Scanner le Qr-code de l&apos;indice
                </ModalHeader>
                <ModalBody className="text-base">
                <h1 className="text-2xl"></h1>
                <div className="w-full h-auto rounded-md border-2 border-black-300">
                  <Qr_code
                    data={data}
                    setData={setData}
                  />
                </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="bg-blue text-white px-4 py-2 rounded hover:bg-red-600"
                        color="primary"
                        onPress={onClose}
                    >
                        Fermer le scanner
                    </Button>
                </ModalFooter>
            </>)}
    </ModalContent>
</Modal>
       
    </>
  );
}
export default Qrcode;