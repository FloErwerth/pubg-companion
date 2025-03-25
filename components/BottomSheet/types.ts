import { BottomSheetProps as BottomSheetPropsGorhom } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/types';
import { ComponentProps } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export type BottomSheetRefType = ComponentProps<typeof BottomSheetModal>['ref'];

export type BottomSheetProps = {
  reference: BottomSheetRefType;
  title?: string;
} & Omit<BottomSheetPropsGorhom, 'ref'>;
