import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { BiDesktop } from 'react-icons/bi';

export const options = [
  {
    icon: <BsFillSunFill />,
    text: 'light'
  },
  {
    icon: <BsFillMoonStarsFill />,
    text: 'dark'
  },

  {
    icon: <BiDesktop />,
    text: 'system'
  }
];

export const onWindowMatch = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};
