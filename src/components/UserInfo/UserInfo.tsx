export const UserInfo = ({todo}) => {
  return (
    <a className="UserInfo" href={`mailto:${todo.user.email}`}>
      {todo.user.name}
    </a>
  )
};
