import Spinner from "../BasicUI/Spinner";

const LoadingScreen = () => {
    return <div className="overlay">
        <Spinner size="lg" />
    </div>
}

export default LoadingScreen;