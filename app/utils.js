
module.exports = {
  checkEmail: (value) => {
    const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailExp.test(value)
  },

  checkPassword: (value) => {
    const passwordExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$/
    return passwordExp.test(value)
  },

  deleteEmptyKeys: (obj, sendError) => {
    const initialValue = Object.keys(obj).length
    
    for(const el in obj){
      obj[el] = obj[el].trim()
      if(!obj[el]) delete obj[el]
    }
    const finalValue = Object.keys(obj).length
    if(initialValue !== finalValue) return true
    else return false
  },

  deleteUnthorizedKeys: (object, validArray) => {

    validArray.forEach((key, index) => {
      if(Object.keys(object)[index])
        if(key !== Object.keys(object)[index]) 
          delete object[Object.keys(object)[index]]
   })
  },


}

  






