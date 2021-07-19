import './LoadingBox.css';


const LoadingBox = (props) =>{
    const mystyle = {
      width: props.width,
      height:props.height,
    };
  return(
        <div class="prod--name">
          <span style={mystyle} class="skeleton-loader"></span>
        </div>
  );
}

export default LoadingBox;