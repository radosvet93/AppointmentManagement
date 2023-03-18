import { useEffect, useState } from 'react';

const useGetUserRole = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userRole = await fetch('/api/users/role', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await userRole.json();

        if (result) {
          setRole(result.role);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    getUserRole();
  }, []);

  return { role };
};

export default useGetUserRole;
