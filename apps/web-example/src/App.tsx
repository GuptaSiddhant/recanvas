import { useCanvas } from "@recanvas/web"

import BoxGame from "./BoxGame"

export default function App() {
  const Canvas = useCanvas(<BoxGame />, {
    width: 800,
    height: 500,
  })

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>ReCanvas</h1>
      <Canvas style={{ background: "white", borderRadius: "10px" }} />
    </div>
  )
}

// function Basic(): JSX.Element {
//   return (
//     <>
//       <FloatingBox />
//       {/* <Text>
//         Hello World from the land of Canvas. It is a beautiful day today.
//       </Text>
//       <Image
//         style={{ padding: 40 }}
//         src={
//           "https://media.istockphoto.com/photos/helsinki-finland-picture-id183996236?k=20&m=183996236&s=612x612&w=0&h=mMGqh_q8Mmc1deERz75fEVsB49buscSnCOweo8xlbUA="
//         }
//       /> */}
//     </>
//   )
// }
