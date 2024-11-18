import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageGauche({ clickedCount }) {
  const textRef = useRef(null);

  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRef4 = useRef(null);

  useEffect(() => {
    if (clickedCount > 0) {
      gsap.to(textRef.current, {
        top: "30%",
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(textRef.current, {
        top: "50%",
        duration: 0,
        ease: "power2.inOut",
      });
    }

    if (clickedCount > 0) {
      gsap.to(cardRef1.current, {
        border: "1px solid red",

        delay: 0.5,
        ease: "power2.inOut",
      });
    }

    if (clickedCount > 1) {
      gsap.to(cardRef2.current, {
        border: "1px solid green",

        delay: 0.5,
        ease: "power2.inOut",
      });
    }

    if (clickedCount > 2) {
      gsap.to(cardRef3.current, {
        border: "1px solid blue",

        delay: 0.5,
        ease: "power2.inOut",
      });
    }

    if (clickedCount > 3) {
      gsap.to(cardRef4.current, {
        border: "1px solid orange",

        delay: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [clickedCount]);

  return (
    <div className="w-1/2 p-12 flex flex-col align-items-center justify-between text-white">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <img
            src="/brain-logo.svg"
            alt="NeuroTech Logo"
            className="w-16 h-16"
          />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-white bg-clip-text text-transparent">
            NeuroTech Solutions {clickedCount}
          </h1>
        </div>
        <p
          ref={textRef}
          className="
        text-gray-400 
        text-xl
        absolute 

      "
        >
          Révolutionner la compréhension du cerveau humain
        </p>
      </div>

      {/* Section Main Content */}
      <div className="space-y-10 flex-grow align-items-stretch">
        {/* <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-blue-400">
          Notre Vision
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Nous développons des technologies de pointe pour cartographier et comprendre 
          les connexions neuronales du cerveau humain. Notre plateforme interactive 
          permet aux chercheurs et aux professionnels de la santé d'explorer 
          les circuits synaptiques en temps réel.
        </p>
      </div> */}

        <div className="sticky top-[40vh] grid grid-cols-2 gap-6  max-h-[500px]">
          <div
            ref={cardRef1}
            className={`
          ${clickedCount > 0 ? "opacity-100" : "opacity-0"} 
          border border-blue-900/30 
          rounded-lg 
          p-6 
          backdrop-blur-sm 
          bg-blue-500/10 
          hover:bg-blue-500/20 
          transition-all 
          duration-500 
          delay-1000
          ease-in-out
          transform
          ${clickedCount > 0 ? "translate-y-0" : "translate-y-4"}
        `}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Réseaux neuronaux A
            </h3>
            <p className="text-gray-400">
              {/* Algorithmes avancés de cartographie neuronale assistée par intelligence artificielle */}
            </p>
          </div>
          <div
            ref={cardRef2}
            className={`
          ${clickedCount > 1 ? "opacity-100" : "opacity-0"} 
          border border-blue-900/30 
          rounded-lg 
          p-6 
          backdrop-blur-sm 
          bg-blue-500/10 
          hover:bg-blue-500/20 
          transition-all 
          duration-500 
          ease-in-out
          transform
          ${clickedCount > 1 ? "translate-y-0" : "translate-y-4"}
        `}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Réseaux neuronaux B
            </h3>
            <p className="text-gray-400">
              {/* Interface interactive pour explorer les connexions synaptiques en trois dimensions */}
            </p>
          </div>
          <div
            ref={cardRef3}
            className={`
          ${clickedCount > 2 ? "opacity-100" : "opacity-0"} 
          border border-blue-900/30 
          rounded-lg 
          p-6 
          backdrop-blur-sm 
          bg-blue-500/10 
          hover:bg-blue-500/20 
          transition-all 
          duration-500 
          ease-in-out
          transform
          ${clickedCount > 2 ? "translate-y-0" : "translate-y-4"}
        `}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Réseaux neuronaux C
            </h3>
            <p className="text-gray-400">
              {/* Traitement instantané des données neuronales pour une visualisation dynamique */}
            </p>
          </div>
          <div
            ref={cardRef4}
            className={`
          ${clickedCount > 3 ? "opacity-100" : "opacity-0"} 
          border border-blue-900/30 
          rounded-lg 
          p-6 
          backdrop-blur-sm 
          bg-blue-500/10 
          hover:bg-blue-500/20 
          transition-all 
          duration-500 
          ease-in-out
          transform
          ${clickedCount > 3 ? "translate-y-0" : "translate-y-4"}
        `}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Réseaux neuronaux D
            </h3>
            <p className="text-gray-400">
              {/* Plateforme collaborative permettant le partage et l'analyse des données en équipe */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
