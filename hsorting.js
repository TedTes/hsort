function readFile(){
     var dataFile = document.getElementById("text-file").files[0];
     if(dataFile){
          const fileReader=new FileReader();
          fileReader.onload=(e)=>{
           const data=e.target.result;
          //   console.log(data);
          hierarchicalSort(data,(row) => row.net_sales)
          }
          fileReader.readAsText(dataFile,"UTF-8")
     }
   
}

const hierarchicalSort = (data, getSortValueFn) => {
  
     const dataArray=data.split('\n');
     const header=dataArray[0];
    //remove header
     const dataArrayBody=dataArray.splice(1);
     
     const dtaSubBodyArr=dataArrayBody.map(dta=>(dta.split('|')))
     //keep  overall total in variable
     const overallTotal=dtaSubBodyArr.filter(arr=>arr[0]=='$total'); 
     //index of overall total 
     const index=dtaSubBodyArr.indexOf(...overallTotal);
if(index>-1){
     //remove overall total
     dtaSubBodyArr.splice(index,1);
}
//select catagories
const categories=dtaSubBodyArr.map(dta=>dta[0])
// console.log(categories);
 const uniqueCategories=[...new Set(categories)];
 //group categories
let catagoriesCollection=uniqueCategories.map(dta=>dtaSubBodyArr.filter(src=>(src[0]===dta)));
catagoriesCollection=catagoriesCollection.sort((a,b)=>{
     //sorting categories
   return  b[0][2]-a[0][2]
})
const result=catagoriesCollection.map((dta)=>{
          // const net_sales=getSortValueFn(dta)
     return dta.sort((a,b)=>{
          if(b.indexOf('$total')>-1)return 1;
          //index 2 could be replaced by dynamic value from value net_sales using indexOf
         return b[2]-a[2]
     });
});
//add overall total
result.unshift(overallTotal);
//add header
result.unshift(header);
const sortedData=[].concat.apply([], result).join('\n').replace(/,/g,'|');
console.log("Input Data")
console.log(data);
console.log("Output Data")
console.log(sortedData);
      }
      