import { Avatar } from "flowbite-react";
import { User } from "../models/user";

export interface IUserTilesProps {
  users: User[];
}

export function UserTiles(props: IUserTilesProps) {
  function generateUserTiles() {
    const userTiles: JSX.Element[] = [];
    props.users.slice(0, 5).forEach((user) => {
      if (user.image) {
        userTiles.push(
          <Avatar
            key={user.id}
            img={user.image}
            title={`${user.firstName} ${user.lastName}`}
            rounded
            stacked
          />
        );
      } else {
        userTiles.push(
          <Avatar
            key={user.id}
            placeholderInitials={`${user.firstName.charAt(
              0
            )}${user.lastName.charAt(0)}`}
            title={`${user.firstName} ${user.lastName}`}
            rounded
            stacked
          />
        );
      }
    });

    if (props.users.length > 5) {
      userTiles.push(<Avatar.Counter total={props.users.length - 5} />);
    }

    return userTiles;
  }

  return <Avatar.Group>{generateUserTiles()}</Avatar.Group>;
}
