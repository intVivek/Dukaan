import './LoadingBox.css';


const LoadingBox = (props) =>{
    const mystyle = {
      width: props.width,
      height:props.height,
    };
  return(
        <div className="prod--name">
          <span style={mystyle} className="skeleton-loader"></span>
        </div>
  );
}

export default LoadingBox;