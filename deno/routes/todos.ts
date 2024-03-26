import { Router } from 'https://deno.land/x/oak/mod.ts';
import {getDb} from '../helper/db_client.ts'
// import { ObjectId } from 'https://deno.land/x/web_bson@v0.3.0/mod.js';
import {ObjectId} from "https://deno.land/x/mongo@v0.33.0/mod.ts"
const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

router.get('/todos',async (ctx) => {
  const todos= await getDb().collection('todos').find();
  const transformTodos=todos.map(
    (todo: {_id:ObjectId;text:string})=>{
    return {id:todo._id.$oid,text:todo.text};
  }
  ); 
  ctx.response.body = { todos: transformTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body.json();
  console.log(data.text);
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: data.text,
  };

  const id=await getDb().collection('todos').insertOne(newTodo);

  newTodo.id=id.$oid;

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body.json();
  // const todoIndex = todos.findIndex((todo) => {
  //   return todo.id === tid; 
  // });

  await getDb().collection('todos').updateOne({_id:ObjectId(tid)},{$set:{text:data.text}})
  // todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId',async (ctx) => {
  const tid = ctx.params.todoId;
  await getDb().collection('todos').deleteOne({_id:ObjectId(tid)});
  // todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
