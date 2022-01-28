import { useContext } from "react";
import { useTransition, animated } from "react-spring";
import { SnackbarContext } from "./contexts/SnackbarContext";

const Snackbar = () => {
    const {snacks} = useContext(SnackbarContext);
    const listOfTransitions = useTransition(snacks, {
        from: {
            transform: "translateY(100px)"
        },
        enter: {
            transform: "translateY(0px)"
        },
        leave: {
            transform: "translateY(100px)"
        },
        keys: snacks.map(snack => snack.id)
    });

    return listOfTransitions((style, item) => item && (
        <animated.div className="snackbar" style={style}>
            {item.message}
        </animated.div>
    ))

}

export default Snackbar;