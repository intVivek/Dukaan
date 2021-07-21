
const UseDataBase=(data,url,set,loading,error,empty)=> {
    
    data && fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (dataSet) {
      set && set(dataSet);
      console.log('dataSet',dataSet)
      loading&&loading(false);
      if(dataSet.length===0){
        empty&&empty(true);
      }
      else{
        empty&&empty(false);
      }
    }).catch(function(err) {
      error&&error(true);
  });
}

export {UseDataBase};