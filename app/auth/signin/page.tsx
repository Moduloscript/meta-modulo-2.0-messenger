import {getProviders} from 'next-auth/react'
import Image from 'next/image';
import SignIncomponent from './SignIncomponent';

async function SignInPage() {
  const providers = await getProviders()
  return <div>
    <div className='grid justify-center'>
      <Image
        className='object-cover mx-2 rounded-full'
        width={700}
        height={700}
        src="https://links.papareact.com/161"
        alt='profile picture'
      />
    </div>
    <SignIncomponent providers={ providers} />
  </div>;
}

export default SignInPage;
