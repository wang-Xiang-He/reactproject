
import { faDesktop, faMobileAlt, faTabletAlt,faBolt } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "北部", value: 50, color: "secondary", icon: faBolt },
    { id: 2, label: "中部", value: 30, color: "primary", icon: faBolt },
    { id: 3, label: "南部", value: 10, color: "tertiary", icon: faBolt },
    { id: 4, label: "其他", value: 10, color: "quaternary", icon: faBolt },
];

const totalOrders = [
    { id: 1, label: "北區", value: [1, 2, 3, 4, 5, 6], color: "tertiary" },
    { id: 2, label: "南區", value: [2, 3, 4, 5, 6, 7], color: "secondary" },
    { id: 3, label: "中區", value: [2.5, 3.5, 4.5, 5.5, 6.5, 7.5], color: "primary" }
];

export {
    trafficShares,
    totalOrders
};