import './ErrorPage.css';
import LottieError from '../../components/LottiePlayer/Error.json';
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer.jsx';

const ErrorPage = () =>{

  return(
    <div className='errorPage'>
      <LottiePlayer className='loader' animationData={LottieError} />
    </div>
  );
}

export default ErrorPage;