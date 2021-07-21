import './CartLoading.css';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js'

const CartLoading = (props) =>{

  return(
        <div className='cartLoadingContainer'>
          <div className="cartLoadingTray">
            <div className="cartLoadingImage">
              <LoadingBox width={'120px'} height={'120px'}/>
            </div>
            <div className="cartLoadingSpec">
              <LoadingBox width={'400px'} height={'25px'}/>
              <div className="cartLoadingSpecList">
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
            </div>
          </div>
          <div className="cartLoadingTray">
            <div className="cartLoadingImage">
              <LoadingBox width={'120px'} height={'120px'}/>
            </div>
            <div className="cartLoadingSpec">
              <LoadingBox width={'400px'} height={'25px'}/>
              <div className="cartLoadingSpecList">
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
            </div>
          </div>
        </div>
  );
}

export default CartLoading;