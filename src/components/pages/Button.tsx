import React from "react";

export default function ButtonComponent({ name, classname, onPress, link }) {
  const handlePress = () => {
    if (link) {
      window.location.href = link; // Redirection si un lien est fourni
    } else if (onPress) {
      onPress(); // Appelle la fonction onPress si fournie
    }
  };

  return (
    <button className={classname} onClick={handlePress}>
      {name}
    </button>
  );
}
