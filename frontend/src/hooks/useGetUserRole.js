import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { roleAtom } from '../atoms';
import axios from 'axios';
const useGetUserRole = () => {
  const [role, setRole] = useAtom(roleAtom);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userRole = await axios.get('/api/users/role');

        setRole(userRole.data.role);
      } catch (error) {
        console.log({ error });
      }
    };

    getUserRole();
  }, [setRole]);

  return { role };
};

export default useGetUserRole;
