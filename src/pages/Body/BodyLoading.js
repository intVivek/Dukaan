import './BodyLoading.css';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js'

const BodyLoading = () =>{

  return(
    window.innerWidth>500?
        <div className='bodyLoadingContainer'>
          <div className="bodyLoadingTray">
          <div className="bodyLoadingImage">
            <LoadingBox width={'180px'} height={'180px'}/>
            </div>
            <div className="bodyLoadingSpec">
              <LoadingBox width={'500px'} height={'30px'}/>
              <div className="bodyLoadingSpecList">
                <LoadingBox width={'220px'} height={'20px'}/>
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
            </div>
          </div>
          <div className="bodyLoadingTray">
          <div className="bodyLoadingImage">
            <LoadingBox width={'180px'} height={'180px'}/>
            </div>
            <div className="bodyLoadingSpec">
              <LoadingBox width={'500px'} height={'30px'}/>
              <div className="bodyLoadingSpecList">
                <LoadingBox width={'220px'} height={'20px'}/>
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
            </div>
          </div>
          <div className="bodyLoadingTray">
          <div className="bodyLoadingImage">
            <LoadingBox width={'180px'} height={'180px'}/>
            </div>
            <div className="bodyLoadingSpec">
              <LoadingBox width={'500px'} height={'30px'}/>
              <div className="bodyLoadingSpecList">
                <LoadingBox width={'220px'} height={'20px'}/>
                <LoadingBox width={'220px'} height={'20px'}/>
              </div>
            </div>
          </div>
        </div>:
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

export default BodyLoading;