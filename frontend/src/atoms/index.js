import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atom(null);
export const appointmentsAtom = atom([]);
export const appointmentAtom = atom(null);
export const roleAtom = atom('user');
export const errorAtom = atom();
export const isAuthenticatedAtom = atomWithStorage('isAuthenticated', false);
