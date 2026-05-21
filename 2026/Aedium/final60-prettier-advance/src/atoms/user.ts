import type { User } from '../types/User';
import { atom } from 'jotai';

export const userAtom = atom<null | User>(null);
