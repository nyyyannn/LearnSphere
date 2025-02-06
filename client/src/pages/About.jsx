import { useAuth } from "../store/Auth";
import { useState } from "react";

export const About = () => {

    const { user } = useAuth();

    return <h1>Welcome{user.username ? ` ${user.username}!` : ` to LearnSphere!`}</h1>;
}