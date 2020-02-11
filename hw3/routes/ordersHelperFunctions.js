//Sarah Bunger

//a helper function
function convertToArray(jsonObject){
    if (!Array.isArray(jsonObject)){
      //making it so that even a single item is an array we can deal with
      jsonObject = [jsonObject];
      
    }
    return jsonObject;
}

module.exports = convertToArray;