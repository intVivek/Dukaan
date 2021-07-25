import './SlideShow.css';

const SlideShow = (props) =>{
  const imageTray = props.images && props.images.map((data, index) =>
  <div key={index} ><img  alt="" src={'https://dukaan--app.herokuapp.com/image?url='+data.url} /></div>
);
  return(
    <div class="slideShowslider">
      <div class="slideShowslides">
        {imageTray}
      </div>
    </div>
  );
}

export default SlideShow;