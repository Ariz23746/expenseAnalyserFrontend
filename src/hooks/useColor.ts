import purple from '../../assets/images/primary.png';
import light from '../../assets/images/light.png';
import sky from '../../assets/images/sky.png';
import yellow from '../../assets/images/yellow.png';

export const useColor = () => {
  return {
    purple,
    light,
    sky,
    yellow: light,
    green: sky,
  };
};
