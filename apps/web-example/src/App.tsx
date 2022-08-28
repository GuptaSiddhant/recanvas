import {
  useCanvas,
  Stage,
  Image,
  View,
  Text,
  RecanvasFontFamily,
} from "@recanvas/web"

function App() {
  const Canvas = useCanvas(<Basic width={800} height={500} />)

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas />
    </div>
  )
}

export default App

function Basic({
  width,
  height,
}: {
  width: number
  height: number
}): JSX.Element {
  return (
    <Stage
      style={{
        height,
        width,
        backgroundColor: "green",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 20,
      }}
      font={{
        size: 20,
        color: "yellow",
        family: RecanvasFontFamily.Verdana,
      }}
    >
      <Image
        style={{ padding: 40 }}
        src={
          "https://media.istockphoto.com/photos/helsinki-finland-picture-id183996236?k=20&m=183996236&s=612x612&w=0&h=mMGqh_q8Mmc1deERz75fEVsB49buscSnCOweo8xlbUA="
        }
      >
        <Text>Image art</Text>
      </Image>
      <View
        style={{
          flexGrow: 0,
          backgroundColor: "red",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text>
          Hello World from the land of Canvas. It is a beautiful day today.
        </Text>
      </View>
    </Stage>
  )
}
