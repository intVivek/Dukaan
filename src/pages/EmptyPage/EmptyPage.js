import './EmptyPage.css';
import LottieEmpty from '../../components/LottiePlayer/Empty.json';
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer.jsx';

const EmptyPage = (props) =>{

  return(
    <div className="emptyPage">
      <LottiePlayer className='loader' animationData={LottieEmpty} />
      <span className="emptyPageName">Nothing can be found here</span>
    </div>
  );
}

export default EmptyPage;