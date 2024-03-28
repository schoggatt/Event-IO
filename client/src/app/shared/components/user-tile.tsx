import { useState } from "react";
import Image from "next/image";
import { User } from "../models/user";
import React from "react";

function UserTile(props: { user: User }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="p-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="rounded-full w-30 h-30">
        {props.user.image && (
          <Image
            key={props.user.id}
            width={40}
            height={40}
            src={props.user.image}
            alt="user-profile-image"
            className="rounded-full"
          />
        )}
      </div>
      {isHovering ? (
        <div className="relative">
          <p>{`${props.user.firstName} ${props.user.lastName}`}</p>
          <p>{props.user.email}</p>
        </div>
      ) : null}
    </div>
  );
}

export default UserTile;
