// import { SubscriptionPlanLiteral } from "@/shared/api";

export interface INavigation {
    id: number;
    name: string;
    children?: INavigation[];
}
