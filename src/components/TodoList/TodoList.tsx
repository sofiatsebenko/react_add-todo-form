import cn from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

export const TodoList = ({todos}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article key= {todo.id} data-id={todo.id} className={cn("TodoInfo", {"TodoInfo--completed" : todo.completed})}>
          <TodoInfo todo={todo} />
          <UserInfo todo={todo}/>
        </article>
      ))}
    </section>
  )
};
