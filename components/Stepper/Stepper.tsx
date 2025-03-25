import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList } from 'react-native';
import { Progress } from '~/components/Progress/Progress';
import { ScreenView } from '~/components/ScreenView';

type StepperProps = {
  pages: ReactElement[];
};

type StepperContext = {
  nextPage: () => void;
  previousPage: () => void;
};
const StepperContext = createContext<StepperContext | undefined>(undefined);

export const useStepperContext = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('useStepperContext must be used within Stepper');
  }

  return context;
};

export const Stepper = ({ pages }: StepperProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPage = useCallback(() => {
    if (flatListRef.current) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  }, [currentIndex]);

  const previousPage = useCallback(() => {
    if (flatListRef.current) {
      const nextIndex = Math.max(currentIndex - 1, 0);
      console.log(nextIndex);
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  }, [currentIndex]);

  const contextValue = useMemo(
    () => ({
      previousPage,
      nextPage,
    }),
    [previousPage, nextPage]
  );

  return (
    <ScreenView>
      <Progress percent={currentIndex + 1 / pages.length} />
      <StepperContext.Provider value={contextValue}>
        <FlatList
          ref={flatListRef}
          data={pages}
          horizontal
          scrollEnabled={false}
          renderItem={({ item: Item }) => Item}
        />
      </StepperContext.Provider>
    </ScreenView>
  );
};
