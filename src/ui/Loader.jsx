import { useEffect, useRef } from "react";
import { useNavigation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const loaderStyle = {
  // position: "absolute",
  // top: "5rem", //height of header
  backgroundColor: "rgb(253, 129, 40)",
};

const Loader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";
  const ref = useRef(null);

  useEffect(() => {
    const loadingBarRef = ref.current;
    isLoading ? loadingBarRef.continuousStart() : loadingBarRef.complete();
  }, [isLoading]);

  return (
    <LoadingBar
      ref={ref}
      shadow={false}
      style={loaderStyle}
      transitionTime={100}
      waitingTime={500}
      height={4}
    />
  );
};

export default Loader;
