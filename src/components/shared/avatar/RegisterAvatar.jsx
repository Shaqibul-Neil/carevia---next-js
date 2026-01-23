"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RegisterAvatar = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Group - Manual Implementation */}
      <div className="flex -space-x-3 relative z-10">
        <Avatar className="w-8 h-8 border-2 border-card">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 border-2 border-card">
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 border-2 border-card">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        {/* Count Badge */}
        <div className="w-8 h-8 rounded-full bg-primary border-2 border-card flex items-center justify-center relative z-11">
          <span className="text-[10px] font-bold text-primary-foreground">
            +3
          </span>
        </div>
      </div>

      {/* Stats Text */}
      <div>
        <p className="text-sm font-bold text-foreground">2,500+</p>
        <p className="text-[11px] text-muted-foreground">Happy Families</p>
      </div>
    </div>
  );
};

export default RegisterAvatar;
