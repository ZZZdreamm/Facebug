export default function AddItemToSetStateList(list: any, setList: any, newItem: any){
    var temporalList = [...list]
    var ifNotInList = temporalList.filter((item) => item.id == newItem.id)
    if(ifNotInList.length > 0){
        console.log('wrong item')
    }else{
        temporalList.push(newItem)
    }
    setList(temporalList)
}