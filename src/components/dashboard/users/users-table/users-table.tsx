import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import React from 'react';
import { LoadMoreUsers } from './load-more-table';

export const UsersTable = async () => {
  return (
    <Table>
      <TableCaption>A list of your  users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Password</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <LoadMoreUsers />
      </TableBody>
    </Table>
  );
};
