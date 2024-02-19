import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import SignInForm from './sign-in-form';


export const SignInButton = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Sign In</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Sign in to your account to continue shopping.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <SignInForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
