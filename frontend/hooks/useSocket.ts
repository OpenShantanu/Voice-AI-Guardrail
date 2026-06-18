"use client";

import { useEffect } from "react";

import {
  connectWebSocket
}
from "@/lib/websocket";

export default function useSocket(

  callback:(data:any)=>void

){

  useEffect(()=>{

    const ws = connectWebSocket(
      callback
    );

    return ()=>{
      ws.close();
    };

  },[callback]);
}