import { BottomSheetProps as BottomSheetPropsGorhom } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/types';
import { ComponentPropsWithRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export type BottomSheetRefType = ComponentPropsWithRef<typeof BottomSheetModal>['ref'];

export type BottomSheetProps = {
  reference: BottomSheetRefType;
  title?: string;
} & Omit<BottomSheetPropsGorhom, 'ref'>;
