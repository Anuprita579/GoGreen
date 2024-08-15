import React from "react";
//Common Components
import ButtonComponent from "../commonComponents/Button";

const ShareButton = ({ shareImageUrl, buttonContent, buttonClassName, buttonId, handleClick }) => {
  const handleSharePlatform = async () => {
    handleClick();
    console.log(shareImageUrl); // Ensure the image URL is logged
    const shareText = "Checkout my latest pathway selected:";
    const shareURL = window.location.href;
    const finalShareText = `${shareText}\n${shareURL}\n${shareImageUrl}`;

    
      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Latest Pathway",
            text: shareText,
            url: shareURL,
            files: [
              new File(
                [await fetch(shareImageUrl).then((r) => r.blob())],
                "image.jpg",
                { type: "image/jpeg" }
              ),
            ],
          });
          console.log("Shared successfully");
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          finalShareText
        )}`;
        window.open(whatsappUrl, "_blank");
      }
     

      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Latest Pathway",
            text: shareText,
            url: shareURL,
            files: [
              new File(
                [await fetch(shareImageUrl).then((r) => r.blob())],
                "image.jpg",
                { type: "image/jpeg" }
              ),
            ],
          });
          console.log("Shared successfully");
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        // Fallback for browsers that don't support 
      // Create a blob URL for the image
      const imageUrlBlob = await fetch(shareImageUrl).then((r) => r.blob());
      const imageUrl = URL.createObjectURL(imageUrlBlob);
      // Construct the email link with the image URL included
      const emailLink = `mailto:?subject=My%20Latest%20Pathway&body=${encodeURIComponent(
        `Checkout my latest pathway selected:\n${imageUrl}`
      )}`;
      window.open(emailLink, "_blank");
      }
    
  };

  return (
    
        <ButtonComponent
          onClick={handleSharePlatform}
          className={buttonClassName}
          id={buttonId}
        >
          {buttonContent}
        </ButtonComponent>

  );
};

export default ShareButton;