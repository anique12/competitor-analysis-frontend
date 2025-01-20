'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks/store';
import { selectRequest } from '@/store/slices/project';
import { Product } from '@/store/slices/types/project.type';

const ProductTable = () => {
  const { data } = useAppSelector(selectRequest('getCompetitiveAnalysis'));
  const keys = Object.keys(data[0]);
  if (!data && !Array.isArray(data)) return;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {keys.map((value, index) => (
            <TableHead key={index} className="min-w-[150px]">
              {value}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          Array.isArray(data) &&
          data.map((product, productIndex) => (
            <TableRow key={productIndex}>
              {keys.map((key, keyIndex) => (
                <TableCell key={keyIndex}>
                  {product[key as keyof Product] || 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
