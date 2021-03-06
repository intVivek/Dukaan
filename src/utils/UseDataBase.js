/* eslint-disable no-undef */

const UseDataBase=(data,url,set,loading,error,empty)=> {
    
    data && fetch(process.env.REACT_APP_API_URL +url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (dataSet) {
      set && set(dataSet);
      loading&&loading(false);
      if(dataSet.length===0){
        empty&&empty(true);
      }
      else{
        empty&&empty(false);
      }
    }).catch(function() {
      error&&error(true);
  });
}

export {UseDataBase};