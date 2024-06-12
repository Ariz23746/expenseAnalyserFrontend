import useTypeDispatch from './useTypeDispatch';
import useTypeSelector from './useTypeSelector';
import {toggleLoader} from '../slices/globalLoaderSlice';
const useGlobalLoader = () => {
  const dispatch = useTypeDispatch();
  const isLoading = useTypeSelector(state => state.globalLoader.isVisible);

  const toggle = (value: boolean) => {
    dispatch(toggleLoader(value));
  };
  return {isLoading, toggle};
};

export {useGlobalLoader};
