import { useState } from "react";
import { IUser } from "../models/user";
import Image from "next/image";

import React from "react";

function UserTile(props: { user: IUser }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="p-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="rounded-full w-30 h-30">
        <Image
          key={props.user.key}
          width={40}
          height={40}
          src={props.user.image}
          alt={props.user.name}
          className="rounded-full"
        />
      </div>
      {isHovering ? (
        <div className="relative">
          <p>{props.user.name}</p>
          <p>{props.user.email}</p>
        </div>
      ) : null}
    </div>
  );
}

export default UserTile;
