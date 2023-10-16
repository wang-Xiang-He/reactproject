
import { faCalendarCheck, faComment ,faXmark,faCircle,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import Profile1 from "../assets/img/team/profile-picture-1.jpg"
import Profile2 from "../assets/img/team/profile-picture-2.jpg"
import Profile3 from "../assets/img/team/profile-picture-3.jpg"
import Profile4 from "../assets/img/team/profile-picture-4.jpg"

export default [
    {
        "id": 1,
        "image": Profile1,
        "name": "北區案場1",
        "statusKey": "online",
        "icon": faCircle,
        "btnText": "Message"
    },
    {
        "id": 2,
        "image": Profile2,
        "name": "北區案場2",
        "statusKey": "pause",
        "icon": faExclamationTriangle,
        "btnText": "Message"
    },
    {
        "id": 3,
        "image": Profile3,
        "name": "中區案場1",
        "statusKey": "offline",
        "icon": faXmark,
        "btnText": "Message"
    },
    {
        "id": 4,
        "image": Profile4,
        "name": "南區案場1",
        "statusKey": "online",
        "icon": faCircle,
        "btnText": "Message"
    }
]