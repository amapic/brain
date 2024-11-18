import { Html,Hud } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";

export default function Hud2({clickedCount}) {
  return (
    <Hud>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <Html
              as="div"
              fullscreen
              style={{
                // backgroundColor: "red",
                // display:"flex",
                // width:"100%",
                // justifyContent:"space-between",
                // flexDirection:"row",
                // position: "absolute",
              }}
            >
                <div
                  className={`w-full p-10 ${clickedCount > 0 ? 'block' : 'hidden'}`}
                >
                  <h2 className="text-3xl font-semibold text-blue-400">
                    Circuit synaptique A {clickedCount}
                  </h2>
                  <div className="text-gray-400 text-3xl p-10 italic">
                    AAAA
                  </div>
                </div>

                <div
                  className={`w-full p-10 ${clickedCount > 1 ? 'block' : 'hidden'}`}
                >
                  <h2 className="text-3xl font-semibold text-blue-400">
                    Circuit synaptique B
                  </h2>
                  <div className="text-gray-400 text-3xl p-10 italic">
                    AAAA
                  </div>
                </div>

                <div
                  className={`w-1/2 p-10 ${clickedCount > 2 ? 'block' : 'hidden'}`}
                >
                  <h2 className="text-3xl font-semibold text-blue-400">
                    Circuit synaptique C {clickedCount}
                  </h2>
                  <div className="text-gray-400 text-3xl p-10 italic">
                    AAAA
                  </div>
                </div>

                <div
                  className={`w-1/2 p-10 ${clickedCount > 3 ? 'block' : 'hidden'}`}
                >
                  <h2 className="text-3xl font-semibold text-blue-400">
                    Circuit synaptique D
                  </h2>
                  <div className="text-gray-400 text-3xl p-10 italic">
                    AAAA
                  </div>
                </div>
               {/* </div> */}
              {/* </div> */}
            </Html>
            
          </Hud>
  )
}