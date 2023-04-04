import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage);

export const userAtom = atom(null);
export const appointmentsAtom = atom([]);
export const appointmentAtom = atom();
export const roleAtom = atom();
export const adminAtom = atom((get) => get(roleAtom) === 'admin');
export const errorAtom = atom();
export const isAuthenticatedAtom = atomWithStorage('isAuthenticated', false, storage);
export const appointmentsIdsAtom = atom((get) => {
  const appointments = get(appointmentsAtom);

  return [...new Set(appointments?.map((appointment) => appointment.owner))];
});
