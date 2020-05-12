export default async () => {
  const req = new Request('/icons8_ok_480px.jpg')
  try {
    let res = await fetch(req)
    res = await res.blob()
    let url = URL.createObjectURL(res)
   
    //  <img  src=${icon()|| '#'}
    //         alt="tick image"
    //         width="300px;" height="300px"/>
    
    return url
  } catch (err) {
    console.error(err.message)
  }
}
