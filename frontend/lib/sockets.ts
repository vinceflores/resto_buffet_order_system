"use client";

import { io } from "socket.io-client";

const url = process.env.BASE_URL || "http://localhost:3001";

export const socket = io(url);
export const tableSocket =  io(url + "/tables")
