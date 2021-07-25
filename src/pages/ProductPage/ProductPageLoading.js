import './ProductPageLoading.css';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js'

const ProductPageLoading = () =>{

  return(
    window.innerWidth>500?
        <div className='ProductPageLoadingContainer'>
          <div className="ProductPageLoadingTray">
            <div className="ProductPageLoadingImage">
              <LoadingBox width={'500px'} height={'500px'}/>
            </div>
            <div className="ProductPageLoadingSpec">
              <div className="ProductPageLoadingSpecList">
                <LoadingBox width={'500px'} height={'50px'}/>
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
              <div className="ProductPageLoadingSpecList">
                <LoadingBox width={'450px'} height={'10px'}/>
                <LoadingBox width={'410px'} height={'10px'}/>
                <LoadingBox width={'460px'} height={'10px'}/>
                <LoadingBox width={'400px'} height={'10px'}/>
                <LoadingBox width={'200px'} height={'10px'}/>
              </div>
            </div>
          </div>
        </div>:
                <div className='ProductPageLoadingContainer'>
                <div className="ProductPageLoadingTray">
                  <div className="ProductPageLoadingImage">
                    <LoadingBox width={'320px'} height={'320px'}/>
                  </div>
                  <div className="ProductPageLoadingSpec">
                    <div className="ProductPageLoadingSpecList">
                      <LoadingBox width={'350px'} height={'40px'}/>
                      <LoadingBox width={'220px'} height={'20px'}/>
                    </div>
                    <div className="ProductPageLoadingSpecList">
                      <LoadingBox width={'250px'} height={'10px'}/>
                      <LoadingBox width={'210px'} height={'10px'}/>
                      <LoadingBox width={'260px'} height={'10px'}/>
                      <LoadingBox width={'200px'} height={'10px'}/>
                      <LoadingBox width={'100px'} height={'10px'}/>
                    </div>
                  </div>
                </div>
              </div>
  );
}

export default ProductPageLoading;