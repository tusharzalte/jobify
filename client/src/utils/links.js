import {IoBarChartSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'

const links = [
    {
        id:1,
        text:'Stats',
        path:'/',
        icon:<IoBarChartSharp/>
    },
    {
        id:2,
        text:'All jobs',
        path:'all-jobs',
        icon:<MdWork/>
    },
    {
        id:3,
        text:'Add job',
        path:'add-job',
        icon:<FaWpforms/>
    },
    {
        id:4,
        text:'Profile',
        path:'profile',
        icon:<ImProfile/>
    }
]

export default links