import { useContext } from "react";
import MusicContext from "../components/player/context/MusicContext";

const useMusic =() => useContext(MusicContext);

export default useMusic;