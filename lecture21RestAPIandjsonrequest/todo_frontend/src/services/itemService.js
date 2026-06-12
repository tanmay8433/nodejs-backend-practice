export const addItemtoServer=async(task,date)=>{
  const response =await fetch ("http://localhost:3001/api/todo",{
    method:"POST",
    headers :{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({task,date}),
  });
  const item=await response.json()
  return mapServerItemtoLocalItem(item);
}

export const getItemtoServer=async()=>{
  const response =await fetch ("http://localhost:3001/api/todo",{
    method:"GET"
  });
  const items=await response.json()
  return items.map(mapServerItemtoLocalItem);
}

export const markCompleted=async(id)=>{
  const response =await fetch (`http://localhost:3001/api/todo/${id}/completed`,{
    method:"PUT"
  });
  const item=await response.json()
  return mapServerItemtoLocalItem(item);
}


export const deleteItemtoServer=async(id)=>{
await fetch (`http://localhost:3001/api/todo/${id}`,{
    method:"DELETE"
  });
  return id;
}
const mapServerItemtoLocalItem=(serveritem)=>{
return {
  id:serveritem._id,
  name:serveritem.task,
  dueDate:serveritem.date,
  completed:serveritem.completed,
  createdAt:serveritem.createdAt,
  updateAt:serveritem.updateAt
}
}