"use client";

import {atom} from "recoil";

export const selectedStackState = atom<string[]>({
    key: "selectedStackState",
    default: [],
});