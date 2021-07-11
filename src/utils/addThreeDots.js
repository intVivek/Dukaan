const addThreeDots=(string, limit)=>{
  var dots = "...";
  if(string.length > limit)
  {
    string = string.substring(0,limit) + dots;
  }
 
    return string;
}

export {addThreeDots};