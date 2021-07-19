import './ErrorPage.css';

const ErrorPage = (props) =>{

  return(
    <div className='errorPage'>
      <div className='errorPageImage'>
        <span>404</span>
        <h1>Look like you're lost</h1>
        <h2>the page you are looking for is not avaible!</h2>
      </div>
    </div>
  );
}

export default ErrorPage;