import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { AppAbility } from './utils';
export const AbilityContext = createContext<AppAbility>({} as AppAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
