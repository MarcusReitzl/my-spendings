

export class FilterService{

    filterArray(fromDate, toDate, categorie, array: any[]){
        let filteredArray: any[] = []
          //Filter FromDate
          if(fromDate !== "" && toDate === "" && categorie === "unselected"){
            for(let item of array){
              if(item['date'] >= fromDate){
                filteredArray.push(item);
              }
            }
    
          //Filter ToDate  
          }else if(toDate !== "" && fromDate === "" && categorie ==="unselected"){
            for(let item of array){
              if(array['date'] <= toDate){
                filteredArray.push(item);
              }
            }

        //Filter Kategorie
          }else if(categorie !== "unselected" && toDate === "" && fromDate === ""){
            for(let item of array){
              if(item.kategorie === categorie){
                filteredArray.push(item);
              }
            }
 
            
             //Filter FromDate and ToDate
          }else if(fromDate !== "" && toDate !== "" && categorie === "unselected"){
            for(let item of array){
              if(item['date'] >= fromDate && item['date'] <= toDate){
                filteredArray.push(item);
              }
            }
  
      
             //Filter FromDate and Kategorie
          }else if(fromDate !== "" && toDate === "" && categorie !== "unselected"){
            for(let item of array){
              if(item['date'] >= fromDate && item['kategorie'] === categorie){
                filteredArray.push(item);
              }
            }

             //Filter ToDate and Kategorie
      
          }else if(toDate !== "" && fromDate === "" && categorie !== "unselected" ){
            for(let item of array){
              if(item['date'] <= toDate && item['kategorie'] === categorie){
                filteredArray.push(item);
              }
            } 
         
             
             //Filter ToDate, FromDate and Kategorie
      
          }else if(toDate !== "" && fromDate !== "" && categorie !== "unselected") {
            for(let item of array){
              if(item['date'] <= toDate && item['kategorie'] === categorie && item['date'] >= fromDate){
                filteredArray.push(item);
              }
            }
 
           // No Filter Selected
          }else {
            return filteredArray
          }
         
          
        return filteredArray;
    }

}