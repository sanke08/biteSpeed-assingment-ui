import whatsappImg from "../assets/whatsapp.png";
import instagramImg from "../assets/instagram.jpg";
import type { JSX } from "react";
import type { NodeProps } from "reactflow";
import { Node } from "../components/node";


export interface RegisteredNodeType {
    // this will arppear in sidebar
    type: string;
    label: string;
    platform: string;
    icon: string;
    component: (props: NodeProps) => JSX.Element;
    // this will appear in canvas 
    defaultData: Record<string, any>;
}

export const nodeRegistry: RegisteredNodeType[] = [
    {
        type: "text",
        label: "Message",
        platform: "whatsapp",
        icon: whatsappImg,
        component: Node,
        defaultData: {
            label: "Message",
            icon: whatsappImg
        }
    },
    {
        type: "text",
        label: "Message",
        platform: "instagram",
        icon: instagramImg,
        component: Node,
        defaultData: {
            label: "Message",
            icon: instagramImg
        },
    },
    // Future nodes go here
];
