import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';

const useTypeDispatch = () => useDispatch<AppDispatch>();
export default useTypeDispatch;
