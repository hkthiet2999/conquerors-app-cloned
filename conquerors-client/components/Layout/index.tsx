import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/auth';

export function Layout({ children, headerTitle }) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!authContext.isUserAuthenticated())
      router.push('/sign-in');
    else setIsLoaded(true);
  }, [authContext, router]);

  return (
    isLoaded ? (
      <>
        <div className='min-h-screen bg-gray-100'>
          <Header headerTitle={headerTitle} />
          <main className='-mt-32'>
            <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
              <div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6'>
                <div className='h-auto'>
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    ) : null
  );
}
