import {useContext} from 'react';
import {UpdateContext} from '../contexts/UpdateContext';

// Current recommendation is to use custom hook instead of the context directly
const useUpdateContext = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdateContext must be used within an UpdateProvider');
  }
  return context;
};

export default useUpdateContext;
