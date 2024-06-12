import {RootState} from '../store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useTypeSelector;
