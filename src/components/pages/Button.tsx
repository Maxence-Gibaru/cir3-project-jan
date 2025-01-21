import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ButtonComponent({ name, classname, link, handleRedirect }) {
  const router = useRouter();

  /* const handleRedirect = () => {
    if (link) {
      router.push(link); // Redirige vers l'URL spécifiée
    }
  }; */
  return <Button className={classname} onPress={handleRedirect}>{name}</Button>;
}
