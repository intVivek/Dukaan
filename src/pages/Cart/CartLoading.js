import './CartLoading.css';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js'

const CartLoading = () =>{

  return(
    <div className='bodyLoadingContainer'>
    <div className="bodyLoadingTray">
    <div className="bodyLoadingImage">
      <LoadingBox width={'100px'} height={'100px'}/>
      </div>
      <div className="bodyLoadingSpec">
        <LoadingBox width={'180px'} height={'20px'}/>
        <div className="bodyLoadingSpecList">
          <LoadingBox width={'50px'} height={'10px'}/>
          <LoadingBox width={'50px'} height={'10px'}/>
        </div>
      </div>
    </div>
    <div className="bodyLoadingTray">
    <div className="bodyLoadingImage">
      <LoadingBox width={'100px'} height={'100px'}/>
      </div>
      <div className="bodyLoadingSpec">
        <LoadingBox width={'180px'} height={'20px'}/>
        <div className="bodyLoadingSpecList">
          <LoadingBox width={'50px'} height={'10px'}/>
          <LoadingBox width={'50px'} height={'10px'}/>
        </div>
      </div>
    </div>
    <div className="bodyLoadingTray">
    <div className="bodyLoadingImage">
      <LoadingBox width={'100px'} height={'100px'}/>
      </div>
      <div className="bodyLoadingSpec">
        <LoadingBox width={'180px'} height={'20px'}/>
        <div className="bodyLoadingSpecList">
          <LoadingBox width={'50px'} height={'10px'}/>
          <LoadingBox width={'50px'} height={'10px'}/>
        </div>
      </div>
    </div>
    <div className="bodyLoadingTray">
    <div className="bodyLoadingImage">
      <LoadingBox width={'100px'} height={'100px'}/>
      </div>
      <div className="bodyLoadingSpec">
        <LoadingBox width={'180px'} height={'20px'}/>
        <div className="bodyLoadingSpecList">
          <LoadingBox width={'50px'} height={'10px'}/>
          <LoadingBox width={'50px'} height={'10px'}/>
        </div>
      </div>
    </div>

  </div>
  );
}

export default CartLoading;