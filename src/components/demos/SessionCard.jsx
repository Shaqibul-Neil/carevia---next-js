"use client";
import { useSession } from "next-auth/react";
import React from "react";

const SessionCard = () => {
  const session = useSession();
  console.log("Client", session);
  return <div>Client User : {JSON.stringify(session)}`</div>;
};

export default SessionCard;
