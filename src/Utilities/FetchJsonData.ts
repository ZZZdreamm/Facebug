export function FetchJsonData(dataObject:object,url:string){
    const json = JSON.stringify(dataObject);
    var result : any;
      if( json != "[]")
      {
        fetch(url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:json
        }).then((response)=>{
            response.json().then((data)=>{
              result = data
              console.log(result)
            })
        })
        
        
      }
      return result
    //   console.log(result)
    // return result
}