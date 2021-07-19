
const UseDataBase=(data,url,set)=> {

    fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (dataSet) {
      set && set(dataSet);
    })
}

export {UseDataBase};